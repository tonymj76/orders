const jwt = require('jsonwebtoken')
const config = require('../../config')
const userModel = require('../models/users.model');


module.exports = function (req, res, next){
    
    const token = req.headers.authorization.split(' ')[1];

    if(!token) return res.status(401).send('Access Denied!')

    try {
        jwt.verify(token, config.secret, function (err, decoded){
            if(err){
                return res.status(401).send('unauthorized access')
            }

            req.userId = decoded.id;
            
            userModel.findOne({_id:decoded.id})
            .then((user) => {
                req.user = user
            })
            .then((y) => next())
            
        })
    }
    catch {
        return res.status(401).send('Invalid token')
    }
}
