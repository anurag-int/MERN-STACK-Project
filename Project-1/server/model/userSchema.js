const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token:{
                type:String,
                requrired:true
            }
        }
    ]
})


// we are hashing the password
// this function will automatically run before any save() function is called;

userSchema.pre('save', async function(next){
    if(this.isModified('password')){ // If the pw has been modified, then encrypt it again
        this.password = await bcrypt.hash(this.password,12);
        this.cpassword = await bcrypt.hash(this.cpassword,12);
    }
    next();
})

// we are generating token
userSchema.methods.generateAuthToken = async function () {
    try{
        let token_ = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token_});
        await this.save();
        return token_;
    }
    catch(err) {
        console.log(err);
    }   
}



// collection collection
const User = mongoose.model('USER', userSchema);

module.exports = User;