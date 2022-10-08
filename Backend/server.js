 const app=require('./app');

const cloudinary=require('cloudinary')
 const connectDatabase=require('./DB/database');

  // Handling Uncacught exeption
  process.on('uncaughtException',(err)=>{
   
   console.log(`Error Message : ${err.message}`);
   console.log("Shutting Down The server due to UnCaught Execption");
   process.exit(1);

  })


// Config
  if(process.env.NODE_ENV !== "PRODUCTION")
  {
    require('dotenv').config({path:`${__dirname}/config/config.env`})
  }

 
 // connect Database 
 connectDatabase();
 cloudinary.config({
   cloud_name:process.env.CLOUDINARY_NAME,
   api_key:process.env.CLOUDINARY_API_KEY,
   api_secret:process.env.CLOUDINARY_API_SECRET
 })

 const server= app.listen(process.env.PORT ,()=>{
    console.log(`Server Runing http://localhost:${process.env.PORT}`);
 })

 process.on("unhandledRejection", (err)=>{
  console.log(`error ${err.message}`);
  console.log(`sutdown The server dut to unhandel server Recjection`);
  server.close(()=>{
   process.exit(1);
  })
 })