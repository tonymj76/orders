const userModel = require('../models/users.model');
const jwt = require('jsonwebtoken');
const config = require('../../config');

//register User
exports.register = async(req, res) => {
    if(!req.body){
        res.status(400).send('All values are required!')
    }
    let { name, email, password, phone} = req.body
    Object.keys(req.body).map(field => {
        if(!req.body[field]){
            return res.status(422).send(`${field} field  is required`)
        }
    })
    
    email = email.toLowerCase()

    let Email = await userModel.find({email})
    if(Email.length) return res.status(404).send("Email already exists")

    let model = new userModel()
    model.name = name
    model.email = email
    model.phone = phone
    model.password = model.generateHash(password)
    model.save()
    .then(doc => {
        if(!doc || doc.length === 0){
            res.status(500).send('internal server error')
        }
        let userObject = {};
        userObject['id'] = doc._id;
        userObject['name'] = doc.name;
        userObject['email'] = doc.email
        userObject['createdAt'] = doc.createdAt
        userObject['phone'] = doc.phone
        res.status(200).send(userObject)
    })
    .catch(error => {
        if(error){
            console.log(error)
        }
    })
}

//login User
exports.login = (req, res) => { 
    if(!req.body){
        res.status(400).send('All values are required!')
    }
    let { email, password} = req.body
    Object.keys(req.body).map(field => {
        if(!req.body[field]){
            return res.status(422).send(`${field} field  is required`)
        }
    })
    
    userModel.findOne({email:email})
    .then(response =>{
        if(!response){
            res.status(404).send('This email does not exist')
        }
        else {
            let model = new userModel
            let validPassword = model.validPassword(password, response.password)
            if(!validPassword){  return res.status(400).send('The password is incorrect')}
            var Token = jwt.sign({ id: response._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            let userObject = {}
            userObject['id']= response._id
            userObject['name'] = response.name
            userObject['email'] = response.email
            userObject['phone'] = response.phone
            userObject['createdAt'] = response.createdAt
            res.status(200).send({user: userObject, authorization: {token:Token}})
        }
    })
    .catch(error => {
        if(error){
            console.log(error)
        }
    })
}

exports.getMe = async(req,res) => {
    let user = await userModel.findById({_id:req.userId});
    await user.populate('subscription').execPopulate();
    const {createdAt, _id, name, email, phone, subscription } = user
    let obj = {
        createdAt, _id, name, email, phone, subscription, authorization: {token: req.headers.authorization}
    }
    res.send(obj)
}