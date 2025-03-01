const axios = require("axios");
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

const searchCollege = async(req,res)=>{
    try{
        const {query} = req.query;
        if (!query) {
            return res.status(400).send({ message: "Query parameter is required" ,status:false});
        }

        const response = await axios.get(`https://nominatim.openstreetmap.org/search`,{
            params:{
                q:query,
                format:"json",
                addressdetails: 1,
                limit:5
            }
        });

        if(response && response.data)
            return res.status(200).send({status:true,data:response.data});
        else 
            return res.status(200).send({message:'Location Not Found',status:false});
    }catch(err){
        return res.status(500).send({message:'Error at Search College',status:false});
    }
}

module.exports = {
    searchCategories,
    searchCollege
}