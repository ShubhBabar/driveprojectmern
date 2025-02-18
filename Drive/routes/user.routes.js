const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/register", (req, res) => {
  res.send("register");
});

router.post(
  "/register",
  body("username").trim().isLength({ min: 5 }),
  body("email").trim().isEmail().isLength({ min: 11 }),
  body("password").trim().isLength({ min: 7 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data",
      });
    }
    const { username, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      username,
      email,
      password: hashPassword,
    });
    res.redirect("/home");
  }
);

router.get("/login", (req, res) => {
  res.send("login");
});

router.post(
  "/login",
  body("username").trim().isLength(5),
  body("password").trim().isLength(7),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty) {
      return res.status(400).json({
        error: errors.array(),
        message: "Invalid Data",
      });
    }

    const { username, password } = req.body;
    const user = await userModel.findOne({
      username: username,
    });

    if (!user) {
      return res.status(400).json({
        message: "username and password is incorrect",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "username and password is incorrect",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }); // Secure true in production with HTTPS
    res.status(200).json({
      message: "Login successful",
      token,
      username: user.username,
    });
  }
);

router.get("/logout", (req, res) => {
  try {
    // Clear the authentication token cookie
    res.clearCookie("token", { httpOnly: true, sameSite: "None", secure: true });

    // Send a JSON response confirming logout
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ message: "Logout failed" });
  }
});


module.exports = router;
