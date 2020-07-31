const subscriptionModel = require('../models/subscriptions.model');
const userSubscription = require('../models/user.subscriptions.model');
const { setDate, formatDate } = require('../helpers/utils');
require("../helpers/utils");
var moment = require('moment'); 

exports.getAllSubscriptions = async(req, res) => {
    let subscriptions = await subscriptionModel.find({});
    let response = subscriptions.map(async (sub, i) => {
        await sub.populate('details').execPopulate();
        let feature = sub.details.map(async(detail) => {
            await detail.populate('feature').execPopulate();
            return detail
        })
        await Promise.all(feature)
        return sub
    })

    let data = await Promise.all(response)
    res.send(data)
}

exports.getSubscriptionById = async(req, res) => {
    let subscription = await subscriptionModel.findById({_id:req.params.id});
    await subscription.populate('details').execPopulate();
    let response = subscription.details.map(async (sub, i) => {
        await sub.populate('feature').execPopulate();
        return sub
    })
    await Promise.all(response)
    res.send(subscription)
}

exports.getUserSubscription = async(req,res) => {
    let sub = await userSubscription.findOne({user:req.userId});
    let subscription = await subscriptionModel.findOne({_id:sub.subscription});
    await subscription.populate('details').execPopulate();
    let response = subscription.details.map(async (sub, i) => {
        await sub.populate('feature').execPopulate();
        return sub
    })
    await Promise.all(response)
    let obj = {
        id: sub._id,
        subscription_id: sub.subscription,
        startDate: sub.startDate,
        endDate: sub.endDate,
        status: sub.status,
        subscription
    }
    res.send(obj)
}


exports.subscribe = async(req , res) => {
    let user = req.userId;
    let subscription = req.params.id;

    let end_date_diff;

    let response = await userSubscription.find({user:user});
    if(response.length){
        let lastIndex = response.length - 1;
        let currentSubscription = response[lastIndex];
        if(response[lastIndex].subscription == subscription && response[lastIndex].status){ //if the user is subscribing to the same plan and the status is active
            res.status(200).send('You are currently subscribed to this plan');
            return
        }
        else if(currentSubscription.subscription != subscription){ //if the user is switching plans
            let currentExpiry = moment(currentSubscription.endDate)
            let diff = currentExpiry.diff(moment(), 'days') //difference between expiry date and current date
            if(diff > 0){
                end_date_diff = diff;
            }
            await userSubscription.findOneAndUpdate({subscription:currentSubscription, user:user, status: 1},{status:0})
        }
    }

    


    let subscribe = new userSubscription()
    subscribe['subscription'] = subscription;
    subscribe['user'] = user;
    subscribe['endDate'] = end_date_diff ? (moment().add(1, 'months').add(end_date_diff, 'days')) : moment().add(1, 'months');
    subscribe.save()
    .then(doc => {
        res.send(doc)
    })
}