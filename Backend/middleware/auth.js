const ErrorHandeler= require("../utils/errorHandeler");
const jwt=require('jsonwebtoken');
const User=require('../models/userModel');

// if user login then access 
 exports.isAuthticatedUser= async(req, res, next)=>{
 
    const {token}=req.cookies;
    if(!token)
    {
      return next(new ErrorHandeler("please login access this resource"))
    }

    const decodeData=jwt.verify(token, process.env.JWT_SECRET);
    req.user= await User.findById(decodeData.id)
    next();
}
// AuthoRize Role admin or user
   exports.authorizeRole=(...roles)=>{
 
  return(req,res,next)=>{
   
    if(!roles.includes(req.user.role))
    {
        return next(new ErrorHandeler(`${req.user.role} not allowe access this Recoureces`),403)
    }
    next();
  }
 }
  
