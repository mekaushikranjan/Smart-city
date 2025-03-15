const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middleware/authMiddleware");

router.put("/update", authMiddleware, async (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.session.userId; // Assuming session stores userId

  try {
    let updatedData = { name, email };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

    res.json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
});

module.exports = router;
