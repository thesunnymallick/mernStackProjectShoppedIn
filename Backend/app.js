const express=require('express');
const app=express();
const errormiddleware=require('./middleware/error')
const cookieParser = require("cookie-parser");
const bodyParser=require('body-parser')
const fileUpload=require("express-fileupload")

const path =require("path")



if(process.env.NODE_ENV !== "PRODUCTION")
{
  require('dotenv').config({path:`${__dirname}/config/config.env`})
}
app.use(express.json());
app.use(cookieParser());

 app.use(bodyParser.urlencoded({extended:true}))


app.use(fileUpload());

// app.use(cors({
//     credentials:true,
//     origin:process.env.FRONTEND_URL,
//     methods:["GET", "POST", "PUT", "DELETE"]
// }))
 
 // import Routes
const produts= require('./Routes/productRoutes');
const user= require('./Routes/userRoutes')
const order=require('./Routes/orderRoutes')
const payment=require('./Routes/paymentRoutes')
 // middleware for routs
 app.use('/api/v1',produts)
 app.use("/api/v1",user);
 app.use("/api/v1", order)
 app.use("/api/v1", payment)


 app.use(express.static(path.join(__dirname, "../frontend/build")))
 app.get("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
 })

 // middleware For error 
 app.use(errormiddleware)

module.exports=app;