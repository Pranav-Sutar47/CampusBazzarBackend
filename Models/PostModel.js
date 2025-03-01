const mongoose = require('mongoose');
const {MainDB} = require('./Config');


const PostSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true,
        minlength:5,
        maxlength:400
    },
    likeCount:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        required:true
    },
    images:{
        type:[String],
        required:true
    }
},{ timestamps: true });

const PostModel = MainDB.model('posts',PostSchema);

module.exports = PostModel;