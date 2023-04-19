const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


require('../db/conn');


const User = require('../model/userSchema');


router.get('/',(req, res)=>{
    return res.json({"message":"Hello world from the server router js"});
});


// router.post("/register", async(req, res)=>{
//     // return res.status(422).json({error: "please fill the required details properly"});
//     const {name, email, phone, work, password, cpassword} = req.body;
    
//     if(!(name) || !(email) || !(phone) || !(work) || !(password) || !(cpassword))
//     {
//         return res.status(422).json({error : "please fill the form correctly"})
//     }
//     // return res.json(req.body);



//     User.findOne({email: email})
//     .then((userExist)=>{
//     if(userExist)
//     {
//         return res.json({message: "Email already registred"})
//     }
    
//     const new_user = new User({name, email, phone, work, password, cpassword});
    
//     new_user.save()
//     .then(()=>{
//         res.status(201).json({message: "User registered successfully"});
//     })
//     .catch((err)=>{
//         res.status(500).json({message: "Failed to registered"});
//     });

// })
// .catch((err)=>{
//     console.log(err);
// })
// });

//left email is of original database email and the right one email is of new user email

 

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









module.exports = router;




