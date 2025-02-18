const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength: [5, "username must be 5 character Long"],
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength: [11, "Email must be 11 character Long"],
    },
    password:{
        type:String,
        required:true,
        trim:true,
        // unique:true,
        minlength: [7, "Password must be 7 character Long"],
    }
})
const user = mongoose.model('user', userSchema)
module.exports=user;