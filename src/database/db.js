const mongoose = require("mongoose")

mongoose.connect(`mongodb+srv://chidi:unhack5683@test-cdkkc.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify:false }).then(res => console.log('database started successfully')).catch(error => {
    console.log(error)
})

