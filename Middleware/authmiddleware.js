import jwt from "jsonwebtoken";
import { User } from "../Models/userModel.js";

export async function islogedin(req,res,next){
 const token = req.cookies;
 
 if(!token){
    res.status(403).json({message:"Unauthorize"});
 }
 const payload = jwt.verify(token.token,process.env.JWT_SECURE);
 console.log(payload);
 const user = await User.findOne({_id:payload.id})
 req.user = user;
 next();
}