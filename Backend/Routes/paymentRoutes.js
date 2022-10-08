const express= require('express');
const {proccssToPayment ,stripeApiKey}=require('../Controllers/PaymentController');
const{isAuthticatedUser} =require('../middleware/auth')

const router=express.Router();
// import {proccssToPayment} from "../Controllers/PaymentController";

router.route('/payment/process').post(isAuthticatedUser, proccssToPayment)
router.route('/stripeapikey').get(isAuthticatedUser, stripeApiKey)

module.exports=router;