import express from "express"
import { register,login } from "../Controller/userController.js";
export const authRouter = express.Router();

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.get('/register',(req,res)=>{
    res.render('register');
})
authRouter.get('/login',(req,res)=>{
    res.render('login')
})