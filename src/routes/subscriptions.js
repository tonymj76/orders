const express = require('express');
const router = express.Router();
const SubscriptionController = require('../controllers/Subscription.controller');
const verify = require('../helpers/verifyToken');

//get all plans
router.get('/subscriptions', SubscriptionController.getAllSubscriptions);
//get a plans
router.get('/subscription/:id', SubscriptionController.getSubscriptionById);
//subscribe to a plan
router.post('/subscription/create/:id', verify, SubscriptionController.subscribe);
//get logged in users plan
router.get('/user/subscription', verify, SubscriptionController.getUserSubscription);


module.exports = router