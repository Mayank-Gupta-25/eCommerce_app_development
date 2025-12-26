import User from "../models/userModel.js"


export const getAllUser = async(req , res)=>{
    try{
        const users = await User.find();
        
        if(users.length === 0){
            return res.status(404).json({message : "User not found"})
        }
        res.status(200).json(users)
    }
    catch(err){
        res.status(500).json({err:"Internal server error"})
    }
}

export const createUser = async(req , res)=>{
    try{
        const userData = new User(req.body)
        const {email} = userData
        const userExist = await User.findOne({email})
        console.log(userExist)
        if(userExist){
            return res.status(400).json({message: "User already exist! "})
        }
        const savedUser = await userData.save();
        res.status(200).json(savedUser)
    }
    catch(err){
        res.status(500).json({err:"Internal server error"})
    }
}
export const updateUser = async(req , res)=>{
    try{
        const  id = req.params.id;
        const userExist = await User.findOne({_id:id})
        console.log(userExist)
        if(!userExist){
            return req.status(404).json({message:"User not found"})
        }
        const updatedUser = await User.findByIdAndUpdate(id,req.body,{new:true});
        res.status(201).json(updatedUser)
    }
    catch(err){
        res.status(500).json({err: "Internal server error"})
    }
}

export const deleteUser = async(req , res)=>{
    try{
        const id = req.params.id;
        const userExist = await User.findById({_id:id})
        if(!userExist){
            return req.status(404).json({message:"User not found"})
        }
        await User.findByIdAndDelete(id)
        res.status(200).json({message: "User deleted successfully!"})
    }
    catch(err){
        res.status(500).json({err:"Internal server error"})
    }
}