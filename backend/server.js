const express = require("express");
const path = require("path");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Health check route
app.get("/api/health", (req, res) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL || "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.json({ 
    status: "OK",
    timestamp: new Date().toISOString(),
    dbConnected: mongoose.connection.readyState === 1
  });
});

// ✅ Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/smart_city_db";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit if DB connection fails
  });

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS Configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["set-cookie"]
}));

app.options('*', cors());

// ✅ Session Configuration
const sessionStore = MongoStore.create({
  mongoUrl: MONGO_URI,
  collectionName: "sessions",
  ttl: 24 * 60 * 60 // 1 day
});

sessionStore.on('error', (error) => {
  console.error('❌ Session store error:', error);
});

sessionStore.on('connected', () => {
  console.log('✅ Session store connected');
});

app.use(session({
  name: "smartcity.sid",
  secret: process.env.SESSION_SECRET || "your_secret_key",
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    httpOnly: true,
    secure: false, // Development में false
    sameSite: "lax", // Development के लिए
    maxAge: 24 * 60 * 60 * 1000, // 1 दिन
    domain: "localhost"
  },
}));



app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/complaints", require("./routes/complaintRoutes"));

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
