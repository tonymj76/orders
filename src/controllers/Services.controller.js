const servicesModel = require('../models/services.model');

exports.getServices = async(req, res) => {
    try {
        let services = await servicesModel.find({});
        res.status(200).send(services)
    }
    catch(x){
        console.log(x)
    }
}