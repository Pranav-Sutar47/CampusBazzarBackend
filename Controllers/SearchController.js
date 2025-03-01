const PostModel = require("../Models/PostModel");

const searchCategories = async(req,res)=>{
    try{
        const category = req.params.category;
        
        console.log(category);

        const posts = await PostModel.find({category:category})
        .populate('userId', 'name email mobileNo address college prn profileImage') 
        .lean()
        .exec();

        if (!posts.length) {
            return res.status(404).send({ message: "No posts found", status: false });
        }

        return res.status(200).send({ posts, status: true });

    }catch(err){
        return res.status(500).send({message:'Error at Search Categories',status:false});
    }
}

module.exports = {
    searchCategories
}