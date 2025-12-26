import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

export const signup =  async(req ,res )=>{
    try{
        const {name , email ,password , role} = req.body;
        const userExist = await User.findOne({email}) 
        if(userExist){
            return res.json({
                message: "You are already signup. You need to login!!"
            })
        }
        const hash_password = await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email,
            password : hash_password,
            role
        });
        console.log(user);
        res.status(201).json({message: "You signedup successfuly!"})
    }
    catch(err){
        console.log(err);
        res.status(500).json({err : err.message}) ;
    }
}

export const login = async(req , res)=>{
    try{
        const {email , password} = req.body;
        const userExist = await User.findOne({email})
        if(!userExist){
            return res.status(400).json({
                message: "Invalid credentials "
            })
        }
        const isMatch = await bcrypt.compare(password,userExist.password);
        if(!isMatch){
            return res.status(400).json({
                message: "Invalid credentials "
            })
        }
        const token = jwt.sign({id: userExist._id},process.env.JWT_SECRET_KEY,{expiresIn : "1hr"});
        console.log(userExist);
        res.json({token:token, message: "You logged in successfully"})
    }
    catch(err){
        res.status(500).json({err: err.message}) ;
    }
}

export const profile = async(req , res)=>{
    try{
        const findUser = await User.findOne({_id:req.user.id});
        if(!findUser){
            return  res.status(401).json({message : "error from fetching profile"});
        }
        res.status(200).json({data : findUser});
    }
    catch(err){
        return res.status(500).json({err: "Internal server error"})
    }
}

export const addUser = async(req , res)=>{
    try{
        let results = []
        for(let i = 0 ; i<req.body.length ; i++){
            const {name , email , password , role} = req.body[i];
            const userExist  = await User.findOne({email})
            if(userExist){
                results.push({email,staus: `User${i+1} already exist`});
                continue;
            }
            else{
                const hash_password = await bcrypt.hash(password,10);
                const user = await User.create({
                    name,
                    email,
                    password : hash_password,
                    role
                });
                console.log(user);
                results.push({email,stauts: 'User created'})
            }
        }
        res.status(201).json({message: "User processed successfuly!"}, results);
    }
    catch(err){
        return res.status(500).json({err: "Internal server error", message : err.message})
    }
}


export const forgotPassword = async(req ,res)=>{
    try{
        const Email = req.params.email;
        const userExist = await User.findOne({email:Email})
        if(userExist){
            const token = jwt.sign({id : userExist._id}, process.env.JWT_SECRET_KEY,{expiresIn : "2min"});
            return res.status(201).json({
                token : token,
                message : "OK! don't panick, now copy this token , go to resetPassword and paste this token for authorization"
            })
        }
        
    }
    catch(err){
        return res.status(500).json({
            type : "Internal server error",
            message : err.message 
        })
    }
}

export const resetPassword = async(req, res)=>{
    try{
        const hashPassword = await bcrypt.hash(req.body.password,10);
        const changedUser = await User.findByIdAndUpdate(req.user.id,{$set : {password : hashPassword}}, {new : true});
        console.log(changedUser);
        res.status(200).json({
            message : "You successfully reset your password!",
            changedProfile : changedUser
        })
    }
    catch(err){
        return res.status(500).json({
            type : "Internal server error",
            message : err.message 
        })
    }
}