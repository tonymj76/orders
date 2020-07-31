const express = require('express');
const router = express.Router();
const servicesTypesPricesController = require('../controllers/Services.types.prices.controller');
//const verifyToken = require('./verifyToken');


//fetch Services Types Prices
router.get('/services/types/:service/:type', servicesTypesPricesController.getServicePrices) 

module.exports = router