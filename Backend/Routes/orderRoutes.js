const express= require('express');
const { createNewOrder, loginUserOrder, myOrders, getAllUsersOrders, updatedOrderStatus, DeleteOrder } = require('../Controllers/OrderController');
const {isAuthticatedUser, authorizeRole}= require('../middleware/auth')

const router=express.Router();

router.route('/order/new').post(isAuthticatedUser,createNewOrder)
router.route('/order/:id').get(isAuthticatedUser,loginUserOrder )
router.route('/orders/me').get(isAuthticatedUser,myOrders)
// admin
router.route('/admin/orders').get(isAuthticatedUser, authorizeRole("admin"),getAllUsersOrders);
router.route('/admin/order/:id').put(isAuthticatedUser, authorizeRole("admin"), updatedOrderStatus)
router.route('/admin/order/:id').delete(isAuthticatedUser,authorizeRole("admin"), DeleteOrder )



module.exports=router;