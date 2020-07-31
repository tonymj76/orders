const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/Services.controller');
//const verifyToken = require('./verifyToken');


//fetch Services
router.get('/services', servicesController.getServices) 

module.exports = router