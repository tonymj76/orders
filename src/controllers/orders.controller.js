const ordersModel = require('../models/orders.model');
const ordersServices = require('../models/orders.services.model');
const servicesTypesModel = require('../models/services.types.model');

// create new order
exports.createOrder = async(req, res) => {
    let user = req.userId
    let { services, scheduleDate , address, area } = req.body;
    let subTotal = services.reduce((acc, total) => {
        return acc + total.price * total.quantity
    },0)


    let total = ((7.5/ 100) * subTotal) + subTotal + 500

    let orders = new ordersModel();
    

    orders.user = user;
    orders.subTotal = subTotal;
    orders.grandTotal = total;
    orders.scheduleDate = scheduleDate
    orders.address = address + ' ' +  area

    let doc = await orders.save()
    
    if(doc){
        services.forEach((service) => {
            let ordersService = new ordersServices();
            ordersService.order =  doc._id,
            ordersService.servicetype =  service.servicetype,
            ordersService.service = service.service
            ordersService.price = service.price,
            ordersService.quantity = service.quantity
            ordersService.save();
        })
    }

    res.status(200).send({
        success: true,
        message:'Your order has been completed'
    })
}

// get single order by id
exports.getOrderById = async(req,res) => {
    let id = req.params.id;

    let order = await ordersModel.findById(id);
    await order.populate('orderServices').execPopulate();

    let response = order.orderServices.map(async(item) => {
        await item.populate('servicetype').execPopulate()
        await item.populate('service').execPopulate()
        return item
    })

    let data = await Promise.all(response)

    order.ordersServices = data;
    res.send({
        success:true,
        data:order
    });

}


exports.getOrders = async(req, res) => {
    let user = req.user._id

    let orders = await ordersModel.find({user:user});
    let completed = await ordersModel.find({user:user ,status:'completed'});
    let pending = await ordersModel.find({user:user , status:'pending'});
    let inProgress = await ordersModel.find({user:user , status:'progress'});



    res.status(200).send({
        success:true,
        data:orders,
        count: {
            completed: completed.length,
            pending: pending.length,
            inProgress: inProgress.length
        }
    })
}

