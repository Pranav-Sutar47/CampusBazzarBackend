const joi = require('joi');

const addPostValidation = (req,res,next) => {
    try{
        const schema = joi.object({
            title:joi.string().min(3).max(50).required(),
            price:joi.number().required(),
            description:joi.string().min(5).max(400).required(),
            category:joi.string().required()
        });

        const {error} = schema.validate(req.body);

        if(error)
            return res.status(403).send({message:'Validation error at Addpost',status:false});
        
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "At least one image is required!" });
        }

        next();
    }catch(err){
        return res.status(500).send({message:'Error at Addpost Validation',status:false,error:err});
    }
}

module.exports = {
    addPostValidation
}