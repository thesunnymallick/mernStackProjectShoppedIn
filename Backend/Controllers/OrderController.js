const Order=require('../models/orderModel');
const Product=require('../models/orderModel');
const ErrorHandeler=require('../utils/errorHandeler')
const ObjectId = require('mongoose').Types.ObjectId;


// Create New Order 

exports.createNewOrder=async(req, res, next)=>{
    try {

     const{shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice}=req.body


    const order =await Order.create({
        shippingInfo, 
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice, 
        shippingPrice, 
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    })
    
    res.status(201).send({
        success:true,
        message:"Order Successfully done!",
        order
    })
        
    } catch (error) {
        
        res.status(400).send({
            success:true,
            message:"Order not Success!",
        
        })
    }
}


// Get Login User Order Details

exports.loginUserOrder =async(req, res, next)=>{


    try {
        const order = await Order.findById(req.params.id).populate("user", "name email")
        if(!order)
        {
            return next(new ErrorHandeler(`Order Not Found with This id: ${req.params.id}`,404));

        }
        res.status(200).send({
            success:true,
            order
        })

    } catch (error) {
        res.status(400).send({
            success:true,
            message:"order Not Found",
            error
        
        })
    }
}


// user Single Orders Details
exports.myOrders=async(req,res, next)=>{
    try {
        const orders = await Order.find({user:req.user._id})
   

        res.status(200).send({
            success:true,
            orders
        })
    } catch (error) {
        res.status(400).send({
            success:true,
            message:"order Not Found",
            error
        
        })
    }
}


// All Users Order Details:----Admin

exports.getAllUsersOrders=async(req, res, next)=>{
    try {
 
        const orders = await Order.find()
        
          let TotalAmmount=0;
          orders.forEach((order)=>{
            TotalAmmount+=order.totalPrice;
          })

        res.status(200).send({
            success:true,
            TotalAmmount,
            orders,
            
        })
    } catch (error) {
        res.status(400).send({
            success:true,
            message:"order Not Found",
            error
        
        })
    }
}

// Updated Order Status---Admin
exports.updatedOrderStatus=async(req, res, next)=>{
    try {
        
        const order = await Order.findById(req.params.id);

        if (!order) {
          return next(new ErrorHandeler("Order not found with this Id", 404));
        }
      
        if (order.orderStatus === "Delivered") {
          return next(new ErrorHandeler("You have already delivered this order", 400));
        }
      
        if (req.body.status === "Shipped") {

        //   order.orderItems.forEach(async (o) => {
        //         await updateStock(o.product, o.quantity);       
            
           
        //   });

        order.orderStatus = req.body.status;
        }
        
      
        if (req.body.status === "Delivered") {
         
            order.orderStatus = req.body.status;
          order.deliveryAt = Date.now();
        }
        await order.save({ validateBeforeSave: false });
          
        res.status(200).json({
            success: true,
          });



    } catch (error) {
        res.status(400).send({
            success:false,
            message:"order Not Found",
            error
        
        })
    }
}

// async function updateStock(id, quantity) {
//     console.log( "1==",id, quantity)
//     id = id.toString().replace(/ObjectId\("(.*)"\)/, "$1")
//      console.log(id)
  
  
//     const product = await Product.findById(id);
//     console.log(product);
//     product.stock -= quantity;
  
//     await product.save({ validateBeforeSave: false });
//   }

  

  // Delete Orders :_Admin
  exports.DeleteOrder=async(req, res, next)=>{
    try {
 
        const order = await Order.findById(req.params.id)
        
        if(!order)
        {
            return next(new ErrorHandeler(`Order Not Found with This id: ${req.params.id}`,404));

        }
         await order.delete()
        

        res.status(200).send({
            success:true,
            message:"Delete Order SuccessFully"
        })
    } catch (error) {
        res.status(400).send({
            success:true,
            message:"Delete Order Failed ",
            error
        
        })
    }
}

