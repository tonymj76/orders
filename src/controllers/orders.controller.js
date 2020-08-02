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
    res.send(order);

    // let orderServicesBuild = order.orderServices.map(async(service) => {
    //     let servicetypes = await servicesTypesModel.findById(service.servicetype)
    //     await servicetypes.populate('service').execPopulate()
    //     await servicetypes.populate('price').execPopulate()
    //     return servicetypes
    // })

    // let response = await Promise.all(orderServicesBuild);
    // console.log(response)
    // response.forEach((service) => {
    //     let found = data.find(element => element.name === service.service.name )
    //     if(found){
    //        found.serviceTypes.push({
    //            quantity: service.quantity,
    //            id: service._id,
    //            name: service.name,
    //            price: service.price[0].price,
    //        }) 
    //        return
    //     }
    //     data.push({
    //         id: service.service._id,
    //         name: service.service.name,
    //         createdAt: service.service.createdAt,
    //         serviceTypes: [
    //             {
    //                 quantity: service.quantity,
    //                 id: service._id,
    //                 name: service.name,
    //                 price: service.price[0].price,
    //             }
    //         ]
    //     })
    // })

    // let orderObject = {
    //     id: order._id,
    //     subTotal: order.subTotal,
    //     grandTotal: order.grandTotal,
    //     status: order.status,
    //     date: order.createdAt,
    //     services: data
    // }

    // res.send(orderObject)
}


exports.getOrders = async(req, res) => {
    let user = req.user._id

    let orders = await ordersModel.find({user:user})
    res.send(orders)
}

