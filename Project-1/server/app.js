

const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const app = express();



//importing dotenv into app.js
dotenv.config({path: './config.env'});


//Database , importing conn.js file into app.js 
require('./db/conn');
// const User = require('./model/userSchema')

//the app.js will no understand the data which will come in app.js will we in the form of json
app.use(express.json())


// importing PORT from dotenv
const PORT = process.env.PORT;


//importing routes in app.js 
app.use(require('./router/auth'))


// Middleware
const middleware = (req, res, next)=>{
    console.log("I am Middle ware");
    next();
};




// Routes
app.get("/", (req, res)=>{
    res.send("Hello World");
});

app.get("/login", (req, res)=>{
    res.send(`hello world1`);
});

app.get("/signup", (req, res)=>{
    res.send(`welcome to signup page`);
});

app.get("/about", middleware, (req, res)=>{
    console.log("Hello I am About ");
    res.send(`Welcome to about page`);
});

app.get("/contact", (req, res)=>{
    res.send(`welcome to contact us page`);
})






// listening of giver port
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`);
})