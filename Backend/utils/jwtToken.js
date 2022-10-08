
const sendToken=async(user, statusCode, res)=>{
   
    console.log("--->", process.env.COOKIE_EXPIRE )
    const token =  await user.getJwtToken()


    // option for cookies
    const options={
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 *60 * 60 * 1000
        ),
        httpOnly:true,
    };

   // send token

   res.status(statusCode).cookie("token",token,options).send({
    success:true,
    user,
    token
   })
}
module.exports=sendToken
