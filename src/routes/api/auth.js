const express = require("express");
const router = express.Router();
const multer = require('../../middleware/multer');

// Load auth controllers
const registerController = require('../../controllers/auth/registerController');
const loginController = require('../../controllers/auth/loginController');

// @route POST api/auth/register
// @desc Register user
router.post('/register', multer.single('photo'), registerController.register);

// @route POST api/auth/login
// @desc Login user and return JWT token
router.post("/login", loginController.login);

module.exports = router;