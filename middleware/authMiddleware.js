import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

export const protect = async(req , res , next)=>{
    let token ;
    
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }
    if(!token){
        return res.status(401).json({message: "Not authorized"})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log(decoded);
        req.user = decoded;
        next();
    }
    catch(err){
        res.status(401).json({message: "Token invalid"});
    }
}
export const roleRestriction = async(req, res , next)=>{
    try{
        if(req.user){
            const findUser = await User.findOne({_id:req.user.id});
            console.log("Loggedin User Role: ",findUser);
            if(findUser.role === 'admin'){
                console.log("➡️ ,Entered admin")
                next();
                console.log("➡️ ,Exit admin")
            }
            else return res.status(401).json({message: "Sorry 😊 Only admins can use this functionality!!"});
        }
        else{res.status(401).json({message : "OOps !! You are not logged in"})
        }
    }
    catch(err){
        return res.status(500).json({
            err : "Internal server error",
            message: err.message
        })
    }
}