import express from "express";

export const dashboardRouter = express.Router();

dashboardRouter.get('/home',(req,res)=>{
    res.render('home');
})