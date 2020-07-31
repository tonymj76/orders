
const servicesTypesPricesModel = require('../models/services.types.prices.model');

exports.getServicePrices = async(req, res) => {
    let service = req.params.service
    let type = req.params.type
    let prices = await servicesTypesPricesModel.findOne({service:service, servicetype:type})
    res.send(prices)
}