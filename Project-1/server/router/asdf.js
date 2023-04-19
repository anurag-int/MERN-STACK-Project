const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

require('../db/conn');
const User = require('../model/userSchema');



router.get('/', async(req, res)=>{
    return res.status(200).json({message : "hello I am Home route"});
})


router.post('/signup', async(req, res)=>{
    const {name, email, phone, work, password, cpassword} = req.body;

    if(!name || !email, !phone, !work, !password, !cpassword)
    {
        return res.status(402).json({error : "Please fill the form correctly"});
    }

    try{
        const userExists = await User.findOne({email:email})
        if(userExists)
        {
            return res.json({message: "Email Already Exists"});
        }

        const new_User = new User({name, email, phone, work, password, cpassword});

        const saved = await new_User.save();
        if(saved)
        {
            return res.status(200).json({message:"User Registered"});
        }
        else
        {
            return res.status(404).json({message: "Try Again"});
        }
        
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router