const mongoose = require('mongoose');
const nodemailer = require('nodemailer');


require("dotenv").config;
const fileSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    imageUrl:{
        type:String
    },
    tags:{
        type:String
    },
    email:{
        type:String
    }
});



// post middleware
fileSchema.post("save", async function(doc){
    try{
        console.log("DOC", doc);

        //transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        });


        //sending mail
        let info = await transporter.sendMail({
            from: `File Storing App`,
            to: doc.email,
            subject: "New File uploaded on cloudinary",
            html: `<h2>Congratulations, File Uploaded to Cloud</h2> <p>View: <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`
        })
        console.log("INFO", info)
        console.log("Mail Send Successfully!")
    }
    catch(err)
    {
        console.error(err);
    }
})

const File = mongoose.model('File', fileSchema);
module.exports = File;