const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


require('../db/conn');


const User = require('../model/userSchema');


router.get('/',(req, res)=>{
    return res.json({"message":"Hello world from the server router js"});
});


router.post("/register", (req, res)=>{
    // return res.status(422).json({error: "please fill the required details properly"});
    const {name, email, phone, work, password, cpassword} = req.body;
    
    if(!(name) || !(email) || !(phone) || !(work) || !(password) || !(cpassword))
    {
        return res.status(422).json({error : "please fill the form correctly"})
    }
    // return res.json(req.body);



    User.findOne({email: email})
    .then((userExist)=>{
    if(userExist)
    {
        return res.json({message: "Email already registred"})
    }
    
    const new_user = new User({name, email, phone, work, password, cpassword});
    
    new_user.save()
    .then(()=>{
        res.status(201).json({message: "User registered successfully"});
    })
    .catch((err)=>{
        res.status(500).json({message: "Failed to registered"});
    });

})
.catch((err)=>{
    console.log(err);
})
});

//left email is of original database email and the right one email is of new user email

 


module.exports = router;




