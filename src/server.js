const express = require('express')
const app = express();
let cors = require('cors')
const path = require('path');
let userRoute = require('./routes/user')
let servicesRoute = require('./routes/services')
let serviceTypes = require('./routes/services.types')
let servicePrices = require('./routes/services.types.prices')
let ordersRoute = require('./routes/orders')
let subscriptionsRoute = require('./routes/subscriptions');
var moment = require('moment'); 

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

let end = moment('2020-07-30T10:53:19.034Z')
let x = moment()


let diff = end.diff(x, 'days')
let newEnd = (moment().add(1, 'months').add(diff, 'days'))

//console.log(newEnd)

app.listen(5000, (err) => {
    if(err){
        console.log('there was an error now')
    }
    else {
        console.log('apps running on port 5000')
    }
}) 