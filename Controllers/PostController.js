const PostModel = require('../Models/PostModel');

const addPost = async(req,res)=>{
    try{
        const imageUrls = req.files.map(file => file.path);
        //console.log('images',imageUrls);
        const newPost = new PostModel({
            userId : req.user._id,
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            images: imageUrls 
        });
        // console.log('hi');
        const result = await newPost.save();

        if(result)
            res.status(201).send({
                message: "Post added successfully!",
                post: newPost,
                status:true
            });
        else 
            return res.status(408).send({message:'Error while storing posts',status:false});
    }catch(err){
        return res.status(500).send({message:'Error at addPost',status:false,error: err.message || JSON.stringify(err, null, 2)});
    }
}

const getPost = async(req,res)=>{
    try{

        const posts = await PostModel.find();
        // const posts = await PostModel.find()
        //     .populate('userId', 'name email mobileNo address college prn profileImage') // Fetch user details
        //     .lean()
        //     .exec();

        
        if (!posts.length) {
            return res.status(404).send({ message: "No posts found", status: false });
        }

        return res.status(200).send({ posts, status: true });

    }catch(err){
        return res.status(500).send({message:'Error at getPost',status:false,error:err});
    }
}

module.exports = {
    addPost,
    getPost
}