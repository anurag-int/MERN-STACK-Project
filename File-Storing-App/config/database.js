const mongoose = require('mongoose');
require("dotenv").config();

const URL = process.env.MongoUrl;

const connect = mongoose.connect(URL, {
    useNewUrlParser : true,
    useUnifiedTopology : true,

}).then(console.log("Successfully Connected with DB"))
.catch((err)=>{
    console.log("Connection issue!")
    console.log(err);
})

module.exports = connect;