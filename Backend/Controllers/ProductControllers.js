
const Product= require('../models/productModel');
const ApiFeatures=require('../utils/apifeatures')
const ErrorHandeler=require('../utils/errorHandeler')
const cloudinary = require("cloudinary");



 //Create product -- Admin
 exports.CreateProduct=async(req, res)=>{
  try {
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
     
    for (let i = 0; i < images.length; i++) {

      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });

    }
    req.body.images = imagesLinks;
    req.body.user = req.user.id;
    const ProductCreate= new Product(req.body)
    const product= await ProductCreate.save();
    res.status(201).send({
      success:true,
       product
    });
    
  } catch (error) {
    res.status(404).send(error)
  }
 }







 // Get All Produts
 exports.GetAllProduct= async(req, res, next)=>{
  try {
 
     const resultPerPage=8
     const productsCount= await Product.countDocuments();
     const ApiFeature=new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage)
     const products=await ApiFeature.query
    res.status(200).send({
      success:true,
      messsage: "SuccessFully Found All product",
      productsCount,
      products,
      resultPerPage
    });
  } catch (error) {
    res.status(404).send(error)
  }
}


// Get ALL produts Admin

exports.AdminAllProduct= async(req, res, next)=>{
  try {
 
    
     const products= await Product.find();
 
    res.status(200).send({
      success:true,
      products,

    });
  } catch (error) {
    res.status(404).send(error)
  }
}

// get single produts details

exports.GetProductDetails=async(req, res,next)=>{
  try {
  
    let product=await Product.findById(req.params.id);
    if(!product)
    {return next(new ErrorHandeler("Product Not Found",404))}
    res.status(201).send({
       success :true,
       product,
       messsage :"Found The products suessfull",
    
    })
  } catch (error) {
     res.status(404).send(error)
  }
    
}





// Update Produts ---Admin
exports.UpdataProduct=async(req, res)=>{

    try {
        let id=req.params.id;
        let product=await Product.findById({_id:id});

        if(!product){return next(new ErrorHandeler("Product Not Found",404))}

        // Update Images

        let images = [];

        if (typeof req.body.images === "string") {
          images.push(req.body.images);
        } else {
          images = req.body.images;
        }
        
        //Delete Old Images
        if(images!=undefined)
        {
             //Deleting image cloudinary
          for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
          }

         // Upload Images
         const imagesLinks = [];
     
         for (let i = 0; i < images.length; i++) {
     
           const result = await cloudinary.v2.uploader.upload(images[i], {
             folder: "products",
           });
     
           imagesLinks.push({
             public_id: result.public_id,
             url: result.secure_url,
           });
     
         }
         req.body.images = imagesLinks;

        }


             
        const productUpdate=await Product.findByIdAndUpdate({_id:id}, req.body);
        res.status(201).send({
           success:true,
           messsage: "Upadte SuccessFull",
   
        })

    } catch (error) {
        res.status(404).send(error)
    }
}


 // deleteProducts
 exports.DeleteProduct=async(req, res)=>{
   try {
    // let id=req.params.id;
     
    let product=await Product.findById(req.params.id);

    if(!product){return next(new ErrorHandeler("Product Not Found",404))}
  

    

      //Deleting image cloudinary
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }
     
  

     await product.remove();
     res.status(201).send({
        success :true,
        messsage :"Delete Sucessful the product",
     })
    
   } catch (error) {
      res.status(404).send(error)
   }
 } 



 // Create New Riviews or Updted The Review


 exports.CreateProductReviws=async(req, res, next)=>{
    

  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
  
 }


 // Get All Reviews :
 exports.getAllReviews=async(req, res, next)=>{

   // productId== this is product id
   const product =await Product.findById(req.query.productId);
   if(!product)
   {
    return next(new ErrorHandeler("product Not found"),404);
   }

   res.status(200).send({
    success:true,
    reviews:product.reviews


 })

 }

 // delete Reviews:
 exports.deleteReview=async(req, res, next)=>{

    try {

      const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandeler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
      
    } catch (error) {
      
      res.status(401).json({
        success: false,
      });
    }
 

 }

