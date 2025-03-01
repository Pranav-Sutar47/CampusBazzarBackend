const mongoose = require('mongoose');
const {UserDB} = require('./Config');

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    mobileNo:{
        type:String,
        required:true,
        minlength:10,
        maxlength:12,
        trim:true,
        unique:true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    college:{
        type:String,
        required:true,
        trim:true
    },
    prn : {
        type:String,
        required:true,
        trim:true
    },
    profileImage : {
        type:String,
        default:""
    }
},{ timestamps: true });

const UserModel = UserDB.model('users',UserSchema);

module.exports = UserModel;