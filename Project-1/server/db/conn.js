
//Database connection

const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB)
.then(()=>{
    console.log("Successfully Connected with mongoDB");
}).catch((err)=>{
    console.log(err);
    console.log(`No Connection`);
});