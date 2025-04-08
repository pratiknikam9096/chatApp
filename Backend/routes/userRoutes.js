const express=require("express");
const {registerUser}=require("../controller/userController")
const userRoute=express.Router();

userRoute.post("/",registerUser);
//userRoute.post("/login",authUser);

module.exports=userRoute;