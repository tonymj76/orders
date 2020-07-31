const servicesTypesModel = require('../models/services.types.model');

exports.getServiceTypes = async(req, res) => {
    let id = req.params.id
    try {
        let serviceTypes = await servicesTypesModel.find({service:id});
        res.status(200).send(serviceTypes)
    }
    catch(x){
        console.log(x)
    }
}