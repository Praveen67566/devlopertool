import { User } from "../Models/userModel.js";
import jwt from "jsonwebtoken";

const settoken = (user)=>{
    const payload = {
        id:user._id,
        email:user.email
    }

    return jwt.sign(payload,process.env.JWT_SECURE)
}

export const register = async (req,res)=>{
    try {
        const {email,password} = req.body;

        if(!email ||!password){
            res.status(400).json({message:"Email and Password are required"})
        }

        const existinguser = await User.findOne({email});

        if(existinguser){
            res.status(400).json({message:"User Already exist"});
        }

        const user = await User.create({
            email,
            password
        });

        if(!user){
            res.status(500).json({message:"Internal Server Error"});
        }

        res.redirect('/home')
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal Server Error"});
    }
}


export const login = async (req,res)=>{
    try {
        const {email,password} = req.body;

        if(!email || !password){
            res.status(200).json({message:"Email and Password is required"});
        }

        const user = await User.findOne({email});

        if(!user){
           res.status(500).json({message:"Internal Server Error"})
        }

        const ispasswordMatched = await user.comparePassword(password);

        if(!ispasswordMatched){
            res.status(400).json({message:"Password is incorrect"});
        }

        const token = settoken(user);

       res.cookie('token', token);
       return res.redirect('/home',{
        user
       });

    } catch (error) {
        console.log(error)
       res.status(500).json({message:"Internal Server Error"}) 
    }
}