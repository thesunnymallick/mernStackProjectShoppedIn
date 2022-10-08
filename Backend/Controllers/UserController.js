
const User = require('../models/userModel');
const ErrorHandeler=require('../utils/errorHandeler');
const sendToken=require('../utils/jwtToken')
const sendEmail=require('../utils/sendEmail')
const crypto=require('crypto')
const jwt=require("jsonwebtoken");
const bcrypt= require("bcryptjs");
const cloudinary=require('cloudinary')

// Register User

exports.CreateUser = async (req, res, next) => {

    try {
        const { name, email, password } = req.body
         
        const myCloud= await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"avatars",
            width:150,
            crop:"scale",
       
        })
        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        });
       sendToken(user ,201, res)
  
      
    } catch (err) {
        res.status(404).send(err)
    }

}

// Login user

exports.loginUser=async(req, res, next)=>{
    try {
        
        const{email, password}=req.body
        // console.log(email, password);

      //checking given user email or password same or not  in database

        if(!email || !password)
        {
           return next(new ErrorHandeler("please Enter Email or password"),400);

        }
        const user=  await User.findOne({email}).select("+password")
        // console.log(user);
        if(!user)
        {
            return next(new ErrorHandeler ("Invalid Email or password"),401)
        }
       const isPasswordMatch=  await user.commaprePassword(password)
       console.log(isPasswordMatch);

       if(!isPasswordMatch){
        return next(new ErrorHandeler ("Invalid Email or password"),401)
       }

    // If password or email match then send the token

     sendToken(user, 200, res)
  

    } catch (error) {
        res.status(404).send(error);
    }
}


// Logout User
 exports.logOut= async(req, res, next)=>
 {
    res.cookie("token",null, {
        expires: new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).send({
     success:true,
     message:"Succesfully log out"
    })

 }

 // Forget Password

  exports.forgotPassword= async(req, res)=>{
   
       const{email}=req.body;
       
       if(!email)
       {
        return next(new ErrorHandeler ("Please Enter your mail"),401)
       }
       // email exit or not our database
       try {
          const findUser= await User.findOne({email:email});
          
        //  console.log(findUser);
          // Token Genarate For reset Password
          const token=jwt.sign({_id:findUser._id},process.env.JWT_SECRET,{
            expiresIn: Date.now()+15*60*1000
            
          })
         // store token in database
         const setUserToken= await User.findByIdAndUpdate({_id:findUser._id},{verifytoken:token},{new:true})
        // console.log(setUserToken);

         if(setUserToken)
         {
            const restartPasswordUrl=`${req.protocol}://${req.get("host")}/password/reset/${findUser.id}/${setUserToken.verifytoken}`
            const message=`A password reset event has been triggered. The password reset window is limited to two hours.\n\nIf you do not reset your password within 15 minutes, you will need to submit a new request.\n\nTo complete the password reset process, visit the following link:\n\n \n ${restartPasswordUrl} \n\n if you have not request this mail then igonre this message`
           try {
            await sendEmail({
               email: findUser.email,
               subject:"Shooped In Recovery Password",
               message

            })
            res.status(200).send({
            success:true,
             message:`Email sent To ${findUser.email} successfuly`
             })
           } catch (error) {
              //console.log("error",error);
              res.status(401).send({
                success:false,
                message:"email not send"

              })

           }
         }

       } catch (error) {
         
         res.status(401).send({
             success:false,
            message:"Invalid email"

          })
        
       }
     
  }

  // Reset Password 

  exports.resetPassword=async(req, res, next)=>{
    
    const{id, token}=req.params;
    const{password ,confirmPassword}=req.body

     try {
          // check valid user Or not
        const validUser=await User.findOne({_id:id, verifytoken:token});
      // console.log(validUser);

        const verifyToken=jwt.verify(token, process.env.JWT_SECRET);

        if(!validUser || !verifyToken._id)
        {
            return next(new ErrorHandeler ("User Not found"),404)
        }
        // password match or not
        if(password!=confirmPassword)
        {
            return next(new ErrorHandeler ("password Not match"),404)
        }

        const newpassword= await bcrypt.hash(password,10);
         await User.findByIdAndUpdate({_id:id},{password:newpassword})

          validUser.verifytoken=undefined;
          sendToken(validUser, 201, res);
    
        // res.status(201).send({
        //     success:true,
        //     message:"Password Change SucessFully",
        
        // })


     } catch (error) {
        res.status(401).send({
            success:false,
            message: "user Not exit",
            error
        })
     }

  }


  // User Details 

  exports.getUserDetails=async(req, res, next)=>{
    
    try {
        const user=await User.findById(req.user.id)

       res.status(200).send({
        success:true,
        message:"your details succesfully show",
        user
    })
        
    } catch (error) {
        res.status(404).send({
            message:"Invalid User Details Not Showing",
            error
        })
    }

  }

  // updated password

  exports.updatePassword=async(req, res, next)=>{
   
   try {
    const{oldPassword, newPassword, confirmPassword}=req.body;
   
    const user=await User.findById(req.user.id).select("+password");

     // old password match or not
    const isPasswordMatch=await user.commaprePassword(oldPassword);

    
    if(!isPasswordMatch)
    {
        return next(new ErrorHandeler("old password is inccorect",400))
    }

    if(newPassword !=confirmPassword)
    {
        return next(new ErrorHandeler("password does not mtch",400))
    }
   

    user.password=newPassword;
    await user.save();
    console.log("password match");
    sendToken(user,200, res);
    
   } catch (error) {
      
    res.status(400).send({
        success:false,
        message:"updated password Failed!",
        error

    })
   }
 
  }


  // updated User Profile :

  exports.updateProfile=async(req, res, next)=>{
    
     try {
        const newUserData={
            name:req.body.name,
            email:req.body.email
        }

        // we will add cloudinary later

       if(req.body.avatar!=="")
       {
        const user= await User.findById(req.user.id);
        const imageId=user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

       

       const myCloud= await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale",
  
    })
      newUserData.avatar={
        public_id: myCloud.public_id,
        url:myCloud.secure_url,
      }

      }

     

        const user=await User.findByIdAndUpdate(req.user.id, newUserData,{
            new:true,
            runValidators:true,
            userFindModify:false
        })
    
        res.status(200).send({
            success:true,
            message:"successfuly Updated your profile"
        })
        
     } catch (error) {
        res.status(400).send({
            success:false,
            message:"updated Profile Failed !",
            error
    
     })

  }

}


// get all user details (admin)

exports.getAllUser=async(req, res, next)=>{
    try {
        const users=await User.find();
        res.status(200).send({
            success:true,
            message:"All user details",
            users
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:"user Details Failed !",
            error
     })
        
    }
}

// get all single details (admin)
exports.getSingleUser=async(req, res, next)=>{
    try {
        const user=await User.findById(req.params.id); 
        if(!user)
        {
            return next(new ErrorHandeler(`User Does not Exit with ${req.params.id}`),404)
        }   

        res.status(200).send({
            success:true,
            user
        })
    
    } catch (error) {
        res.status(400).send({
            success:false,
            message:"Single user Details Failed !",
            error
     })
        
    }
}

// Upadte User Role(admin)
exports.updateRole=async(req, res, next)=>{
    
    try {
       const newUserData={
           name:req.body.name,
           email:req.body.email,
           role:req.body.role
       }

       // we will add cloudinary later
       const user=await User.findByIdAndUpdate(req.params.id, newUserData,{
           new:true,
           runValidators:true,
           userFindModify:false
       })
   
       res.status(200).send({
           success:true,
           message:"successfuly Updated  role "
       })
       
    } catch (error) {
       res.status(400).send({
           success:false,
           message:" Role updated Failed !",
           error
   
    })

 }

}

// Delete User (Admin)
exports.deleteUser=async(req, res, next)=>{
    
    try {
     
        const user=await User.findById(req.params.id)
        if(!user)
        {
         return next(new ErrorHandeler(`User Does not Exit with ${req.params.id}`),404)
        }
       
        const imageId=user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);


       await user.delete()

       res.status(200).send({
           success:true,
           message:"successfuly Delete user "
       })
       
    } catch (error) {
       res.status(400).send({
           success:false,
           message:" Delete User Failed !",
           error
   
    })

 }

}

