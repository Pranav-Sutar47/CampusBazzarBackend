const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/UserModel');

const signUp = async(req,res)=>{
    try{
        const {name,email,password,mobileNo,address,college,prn} = req.body;
        const user = await UserModel.findOne({email});

        if(user)
            return res.status(403).send({message:'User already Login !',status:false});

        const userModel = new UserModel({name,email,password,mobileNo,address,college,prn});

        userModel.password = await bcrypt.hash(password,10);

        const result = await userModel.save();

        if(result)
            return res.status(201).send({message:'Signup Successful!',status:true});

        return res.status(403).send({message:'Error while saving data',status:false});
    }catch(err){
        return res.status(500).send({message:'Error at singup controller',status:false,error:err})
    }
}

const login = async(req,res) => {
    try{
        const {email,password} = req.body;

        const user = await UserModel.findOne({email});

        if(user){
            const isPassEqual = await bcrypt.compare(password,user.password);

            if(!isPassEqual)
                return res.status(403).send({message:'Password is Incorrect',status:false});
            
            const token = jwt.sign(
                {email:user.email,_id:user._id},
                process.env.JWTSECRET,
                {expiresIn:'1d'}
            );

            return res.status(201).send({message:'Login Successful !',status:true,token});
        }else 
            return res.status(200).send({message:'User not Found !',status:true});
    }catch(err){
        return res.status(500).send({message:'Error at login controller',status:false,error:err})
    }
}

module.exports = {
    signUp,
    login
};