const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


require('../db/conn');


const User = require('../model/userSchema');


router.get('/',(req, res)=>{
    return res.json({"message":"Hello world from the server router js"});
});

//left email is of original database email and the right one email is of new user email

 
// signup route
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
        else if(password != cpassword)
        {
            return res.json({message : "Password doesn't match"});
        }
        else
        {
            const new_User = new User({name, email, phone, work, password, cpassword});
            // first the hashing function will execute before save() ---> the hasing function is it in userSchema
            const saved = await new_User.save();
            if(saved)
            {
                return res.status(200).json({message:"User Registered Successfully"});
            }
            else
            {
                return res.status(404).json({message: "Try Again"});
            }
        }
        


        
        
        
    }
    catch(err){
        console.log(err);
    }
});



//login route

router.post('/signin', async(req, res)=>{
    const {email, password} = req.body;

    try{
        if(!email || !password)
        {
            return res.status(400).json({error:"Fill the details first"});
        }
        const user_exist = await User.findOne({email:email});
        // the user.findOne will return the whole object and assign to user_exist
        
        if(user_exist)
        {
            // first password is req.body.password, and right one is from the database
            const isMatch = await bcrypt.compare(password, user_exist.password);
            if(isMatch)
            {
                res.json({message:"User Signin Successfully"});
            }
            else
            {
                res.json({message:"Invalid Details"});
            }
        }
        else
        {
            return res.json({error : "Email doesn't exist"});
        }
    }
    catch(err)
    {
        console.log(err);
    }
      

});

 






module.exports = router;




