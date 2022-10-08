const mongoose=require("mongoose");

// database Connection
const conectDataBase=()=>{

    mongoose.connect(process.env.DB_URI,{
        
    }).then((data)=>{
        console.log(`connect the database with server${data.connection.host}`)
    }).catch((err)=>{
        console.log(`Connection faild ${err}`);
    })

 


}
module.exports=conectDataBase;