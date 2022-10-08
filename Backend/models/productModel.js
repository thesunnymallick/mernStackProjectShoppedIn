const mongoose=require('mongoose');


const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Enter The product Name"]
    },
    description:{ 
        type:String,
        required:[true, "Enter The Product Name"]
    },
    price:{
      type: Number,
      maxLength: 8,
      required: [true, "Enter The price Schema"]
    },
    ratings:{
        type:Number,
        default : 0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }

        }
    ],
    category:{
        type:String,
        require:[true, "Enter The Categorey"]
    },
    stock:{
        type:Number,
        maxLength:4,
        required:[true, "Enter The Stcok Number"],
        default:1
    },
    numOfReviews:{
      type:Number,
      default: 0
    },
    reviews:[
        {
            user:{
             type: mongoose.Schema.ObjectId,
             ref:"User",
             required:true,
            },

            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required: true,
            },
            comment:{
               type:String,
               required:true
            }

        }
    ],
    
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },

    createAt:{
      type:Date,
      default:Date.now,
    }
     

   
})
const Product= new mongoose.model("Product", productSchema);
module.exports=Product;