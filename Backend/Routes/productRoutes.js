const express= require('express');
const { GetAllProduct, CreateProduct , AdminAllProduct, UpdataProduct, DeleteProduct, GetProductDetails, CreateProductReviws, getAllReviews, deleteReview} = require('../Controllers/ProductControllers');
const {isAuthticatedUser, authorizeRole}= require('../middleware/auth')
const router=express.Router();


router.route('/products').get(GetAllProduct)
router.route('/product/:id').get(GetProductDetails)

// reviews product

router.route('/review').put(isAuthticatedUser,CreateProductReviws)


router.route("/reviews").get(getAllReviews)
router.route("/reviews").delete(deleteReview)

// Admin---Routes
// Create Product
router.route('/product/new').post(isAuthticatedUser,authorizeRole("admin"), CreateProduct);
// updated Product
router.route("/product/:id").patch(isAuthticatedUser,authorizeRole("admin"), UpdataProduct);
// Delete Product
router.route("/product/:id").delete(isAuthticatedUser,authorizeRole("admin"), DeleteProduct);
// get all Products
router.route('/admin/produts').get(isAuthticatedUser,authorizeRole("admin"),AdminAllProduct);




module.exports=router;