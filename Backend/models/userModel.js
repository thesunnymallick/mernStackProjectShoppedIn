const mongoose=require('mongoose');
const validator= require('validator');
const bcrypt= require("bcryptjs");
const jwt=require('jsonwebtoken');
const crypto=require("crypto");

const userSchema=new mongoose.Schema({
    name:{
      type:String,
      required:[true, "Enter Your Name"],
      minLength:[3, "Name should  be more then 3 Chracter"],
      maxLength:[30, "Name can not exxcude 30 chracter"]
    },
    email:{
        type:String,
        required:[true, "Please Enter Your Name"],
        unique:[true, "Email allready Present"],
        validate:[validator.isEmail ,"Please Enter the valid email"]

    },
     password:{
       type:String,
       required:[true, "Please Enter password"],
       minLength:[8,"password shuld be more then 8 chracter"],
       maxLength:[20, "password shuld not be 20 more then chracter"],
       select:false,
     },
    avatar:{
       public_id:{
        type:String,
        required:true
       },
       url:{
        type:String,
        required:true
       }
    },
    role:{
        type:String,
        default:"user"
    },
    verifytoken:{
      type:String,
    },
    createdAt:{
      type:Date,
      default:Date.now
    },
    
    resetPasswordToken:String,
    resetPasswordExpaire:Date
})

// bcrypt Scheme 
 userSchema.pre("save", async function(){
   
     if(!this.isModified("password"))
     {
       next()
     }
     this.password=await bcrypt.hash(this.password, 10);
 })

 // Jwt Token
   userSchema.methods.getJwtToken=function(){
    console.log("sunny--jwt")
    console.log(process.env.JWT_EXPIRE)
     return jwt.sign({id:this._id},process.env.JWT_SECRET,{
     expiresIn:process.env.JWT_EXPIRE
     });
   }

   // commpare the password
   userSchema.methods.commaprePassword=async function(enteredPassword){
   
    return await bcrypt.compare(enteredPassword, this.password);
     
   }


   // Genearing password  Restart Token
   userSchema.methods.getRestartPasswordToken=function()
   {
      const restartToken=crypto.randomBytes(20).toString("hex");
      // hasing add restar password token 
      this.resetPasswordToken=crypto.createHash("sha256").update(restartToken).digest("hex")
     
      this.resetPasswordExpaire=Date.now()+15*60*1000
      return restartToken;
   }
 

const User= new mongoose.model("User", userSchema);
module.exports=User;