const sendEmailToUsers = require('../config/emailService');
const PostModel = require('../Models/PostModel');
const UserModel = require('../Models/UserModel');

const addPost = async(req,res)=>{
    try{
        const imageUrls = req.files.map(file => file.path);

        const newPost = new PostModel({
            userId : req.user._id,
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            images: imageUrls 
        });

        const result = await newPost.save();

        const users = await UserModel.find({}, "email");

        if(result){
            await sendEmailToUsers(users, result);
            res.status(201).send({
                message: "Post added successfully! & Emails Sent!",
                post: newPost,
                status:true
            });
        }else 
            return res.status(408).send({message:'Error while storing posts',status:false});
    }catch(err){
        return res.status(500).send({message:'Error at addPost',status:false,error: err.message || JSON.stringify(err, null, 2)});
    }
}

const getUserPost = async(req,res)=>{
    try{
        
        const id = req.user._id;
        
        const posts = await PostModel.find({userId:id});

        if (!posts.length) {
            return res.status(200).send({ message: "No posts found", status: false });
        }

        return res.status(200).send({ posts, status: true });
    }catch(err){
        return res.status(500).send({message:'Error at getUserPost',status:false,error:err});    
    }
}

const getPost = async(req,res)=>{
    try{
        const posts = await PostModel.find()
            .populate('userId', 'name email mobileNo address college prn profileImage') 
            .lean()
            .exec();

        
        if (!posts.length) {
            return res.status(404).send({ message: "No posts found", status: false });
        }

        return res.status(200).send({ posts, status: true });

    }catch(err){
        return res.status(500).send({message:'Error at getPost',status:false,error:err});
    }
}

const deletePost = async(req,res)=>{
    try{
        const id = req.params.id;
        const result = await PostModel.findOneAndDelete({_id:id});

        if(result)
            return res.status(200).send({message:'Post Deleted Successfully',status:true});
        else    
            return res.status(403).send({message:'Error while deleting post',status:false});
    }catch(err){
        return res.status(500).send({message:'Error at deletePost',status:false,error:err});   
    }
}

const addLike = async(req,res)=>{
    try{
        const id = req.params.id;
        const updatedPost = await PostModel.findByIdAndUpdate(
            id, 
            { $inc: { likeCount: 1 } }, 
            { new: true }
        );
        if(updatedPost)
            return res.status(201).send({message:'Like added',status:true});
        else 
            return res.status(408).send({message:'Like Count Error',status:false});
    }catch(err){
        return res.status(500).send({message:'Error at Post Like',status:false,error:err});    
    }
}

module.exports = {
    addPost,
    getPost,
    deletePost,
    addLike,
    getUserPost
}