import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { authRouter } from "./Routers/authRouter.js";
import ejs from "ejs";
import path from "path"
import { dashboardRouter } from "./Routers/dashboardRouter.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

//some configurations
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//ejs configuration for ssr-->(server side rendering)

app.set("view engine","ejs");
app.set("views",path.resolve('./views'))

//for routers
app.use('/',authRouter);
app.use('/',dashboardRouter);

async function connecting(){
 try {
    await mongoose.connect(process.env.MONGO_URL ||'mongodb+srv://Praveen:001786Pd@cluster0.e1nbkjk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    app.listen(process.env.PORT ||8080,()=>{
        console.log("Server is listening....");
        console.log("Database Connected");
    })
})
} catch (error) {
   console.log(error)
}
}
connecting();