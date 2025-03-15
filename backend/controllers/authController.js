const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// ✅ Login User
exports.login = async (req, res) => {
  try {
    console.log("🔍 Login request received:", req.body);
    
    const { email, password } = req.body;
    console.log("📧 Email:", email);
    console.log("🔑 Password:", password);

    const user = await User.findOne({ email });
    console.log("👥 Found User:", user);

    if (!user) {
      console.log("❌ User not found!");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔐 Password Match:", isMatch);

    if (!isMatch) {
      console.log("❌ Password is incorrect!");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Store user session
    req.session.user = { id: user._id, name: user.name, email: user.email, role: user.role };
    console.log("✅ Login successful:", req.session.user);

    res.json({ message: "Login successful", user: req.session.user });
  } catch (error) {
    console.error("❌ Error in login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Register User
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists, please login" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();
    console.log("✅ Registration successful:", newUser);

    res.status(201).json({ message: "Registration successful, please login." });
  } catch (error) {
    console.error("❌ Error in registration:", error);

    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists, please login" });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Logout User
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", error: err });
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out successfully" });
  });
};

// ✅ Check Active Session
const checkSession = (req, res) => {
  if (req.session.user) {
    return res.json({ isAuthenticated: true, user: req.session.user });
  } else {
    return res.status(200).json({ isAuthenticated: false, message: "User not logged in" });
  }
};

module.exports = {
  checkSession
};

// ✅ Check Database Connection & Collections
async function checkDatabase() {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log("⏳ Waiting for database connection...");
      await new Promise((resolve) => mongoose.connection.once("open", resolve));
    }

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("📂 Available collections:", collections.map((c) => c.name));
  } catch (error) {
    console.error("❌ Error fetching collections:", error);
  }
}

// Call the function after Mongoose is connected
mongoose.connection.once("open", checkDatabase);
