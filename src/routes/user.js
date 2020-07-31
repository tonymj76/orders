const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User.contoller');
const verifyToken = require('../helpers/verifyToken');

//register user
router.post('/register', UserController.register);

//Login
router.post('/login', UserController.login);

//me
router.get('/me', verifyToken, UserController.getMe);


module.exports = router