import express from "express";
import { islogedin } from "../Middleware/authmiddleware.js";

export const dashboardRouter = express.Router();

dashboardRouter.get('/home',islogedin,(req,res)=>{
    res.render('home');
})