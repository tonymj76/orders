const express = require('express');
const router = express.Router();
const servicesTypesController = require('../controllers/Services.types.controller');
//const verifyToken = require('./verifyToken');


//fetch Services Types
router.get('/services/types/:id', servicesTypesController.getServiceTypes) 

module.exports = router