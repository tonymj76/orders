const servicesTypesModel = require('../models/services.types.model');

exports.getServiceTypes = async(req, res) => {
    let id = req.params.id
    try {
        let serviceTypes = await servicesTypesModel.findOne({service:id});
        await serviceTypes.populate('price').execPopulate()
        await serviceTypes.populate('service').execPopulate()
        res.status(200).send({
            success:true,
            data:serviceTypes
        })
    }
    catch(x){
        console.log(x)
    }
}