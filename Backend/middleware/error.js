const ErrorHandeler= require('../utils/errorHandeler');

module.exports= (err, req, res, next)=>{
    err.statusCode=err.statusCode || 500
    err.message=err.message || "internal Server Error"
  // MongoDb Error
    if(err.name=="CastError")
    {
        const message=`Rccource Not Found, Invalid: ${err.pathe}`;
        err=new ErrorHandeler(message, 400)
    }
  // mngoose duplicate error
   if(err.code===11000)
   {
    const message=`Duplicate ${Object.keys(err.keyValue)} Enterd `;
    err= new ErrorHandeler(message, 400)
   }
   // worng jwt error

   if(err.name=="jsonWebTokenError")
   {
    const message="Json Web Token is Invalid try again"
    err=new ErrorHandeler(message , 400);
   }
   
   if (err.code === 'ETIMEDOUT') {
    console.log('My dish error: ', util.inspect(err, { showHidden: true, depth: 2 }));
}
    
   
   if(err.name=="jsonWebTokenError")
   {
    const message="Json Web Token is  Expaire  try again"
    err=new ErrorHandeler(message , 400);
   }
    res.status(err.statusCode).send({
        success:false,
         message:err.message
    });

}