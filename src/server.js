const express = require('express')
const app = express();
let cors = require('cors')
const path = require('path');
const router = express.Router();
let userRoute = require('./routes/user')
let servicesRoute = require('./routes/services')
let serviceTypes = require('./routes/services.types')
let servicePrices = require('./routes/services.types.prices')
let ordersRoute = require('./routes/orders')
let subscriptionsRoute = require('./routes/subscriptions');
const moment = require('moment')


const port = process.env.PORT || 5000


router.get('/', (req,res) => {
    res.send('Welcome to Only Errand')
})

app.use(cors())
app.use(express.json())
app.use(userRoute)
app.use(subscriptionsRoute)
app.use(servicesRoute)
app.use(serviceTypes)
app.use(servicePrices)
app.use(ordersRoute)




app.use((req, res, next) => {
    res.status(404).send('Page not found')
})

app.use((err, req, res, next) => {
    res.status(500).sendFile(path.join(__dirname, '../public/error.html'))
})




app.listen(port, (err) => {
    if(err){
        console.log('there was an error now', err)
    }
    else {
        console.log('apps running on port 5000')
    }
}) 


let x = '2020-07-14T17:00:00.000Z'

let date = x.split('T')[0]
let time = x.split('T')[1].slice(0,5)

console.log(time)