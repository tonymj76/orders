const OrdersController = require('../controllers/orders.controller.js');
const express = require('express')
const router = express.Router()
const verify = require('../helpers/verifyToken');


router.post('/orders/create', verify, OrdersController.createOrder);
router.get('/orders/:id', verify, OrdersController.getOrderById);
router.get('/orders', verify, OrdersController.getOrders);


module.exports = router