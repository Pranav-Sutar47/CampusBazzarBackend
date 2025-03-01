const joi = require('joi');
const jwt = require('jsonwebtoken');


const loginValidation =(req,res,next)=>{
    try{
        const schema = joi.object({
            email:joi.string().email().required(),
            password:joi.string().min(4).max(8).required()
        });

        const {error} = schema.validate(req.body);

        if(error)
            return res.status(408).send({error:error,message:'Login Validation Error',status:false});
        next();
    }catch(err){
        return res.status(500).send({error:err,status:false,message:'Error at loginValidation'});
    }
}

const signUpValidation = (req,res,next) => {
    try{
        const schema = joi.object({
            name:joi.string().min(3).max(50).required(),
            email:joi.string().email().required(),
            password:joi.string().min(4).max(8).required(),
            mobileNo : joi.string().length(10).required(),
            address: joi.string().required(),
            college : joi.string().required(),
            prn : joi.string().required()
        });

        const {error} = schema.validate(req.body);

        if(error)
            return res.status(408).send({error:error,message:'SignUp Validation Error',status:false});

        next();
    }catch(err){

    }
}

const tokenValidation = (req,res,next)=>{
    try{
        const token = req.headers['authorization']?.split(' ')[1];
        if(!token)
            return res.status(403).send({message:'Token Required'});
        jwt.verify(token,process.env.JWTSECRET,(err,decoded)=>{
            if(err)
                return res.status(401).send({message:'Invalid token',err});
            req.user = decoded;
            next();
        });
    }catch(err){
        return res.status(500).json({message:'Owner Validation Error',err,success:false});
    }
}

module.exports = {
    loginValidation,
    signUpValidation,
    tokenValidation
}