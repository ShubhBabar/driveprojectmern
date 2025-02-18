const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authMiddleware = require("../middlewares/authe");
  
router.get("/home", authMiddleware, (req, res) => {
  res.json("home", { user: req.user }); // Render the home page with user data
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Rename file with timestamp
  }
});


const upload = multer({ storage });

// Upload endpoint
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({ 
    message: 'File uploaded successfully', 
    filePath: `/uploads/${req.file.filename}` 
  });
});


module.exports = router;
