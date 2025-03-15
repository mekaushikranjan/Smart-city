const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const authController = require("../controllers/authController"); // ✅ Import the authController
const router = express.Router();

// ✅ Check session route
router.get("/checkSession", (req, res) => {
  // Disable caching for session check responses
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  if (req.session.user) {
    return res.json({ isAuthenticated: true, user: req.session.user });
  } else {
    return res.json({ isAuthenticated: false });
  }
});


// ✅ Register route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();
    res.json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// ✅ Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // ✅ Save user info in session
  req.session.user = { id: user._id, email: user.email, role: user.role };

  res.json({ message: "Login successful", user: req.session.user });
});


// ✅ Logout route
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid"); // Clear session cookie
    res.json({ message: "Logged out successfully" });
  });
});

// ✅ Check session route
router.get("/checkSession", (req, res) => {
  if (req.session.user) {
      res.json({ isAuthenticated: true, user: req.session.user });
  } else {
      res.json({ isAuthenticated: false });
  }
});



module.exports = router;
