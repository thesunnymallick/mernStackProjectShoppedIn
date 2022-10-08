const express= require('express');

const { CreateUser, loginUser, logOut, forgotPassword,resetPassword,getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateRole, deleteUser} = require('../Controllers/UserController');
const {isAuthticatedUser, authorizeRole}=require('../middleware/auth')
const router=express.Router();

router.route('/register').post(CreateUser)
router.route("/login").post(loginUser)

 router.route("/password/forgot").post(forgotPassword)

router.route("/password/reset/:id/:token").put(resetPassword)
router.route('/logout').get(logOut)
router.route("/me").get(isAuthticatedUser,getUserDetails);
router.route("/password/update").put(isAuthticatedUser,updatePassword);
router.route("/me/update").put(isAuthticatedUser,updateProfile);


// admin routes
// admin  show all user
router.route("/admin/users").get(isAuthticatedUser,authorizeRole("admin"), getAllUser);
router.route("/admin/user/:id").get(isAuthticatedUser,authorizeRole("admin"), getSingleUser);
router.route("/admin/user/:id").put(isAuthticatedUser,authorizeRole("admin"),updateRole)
router.route("/admin/user/:id").delete(isAuthticatedUser,authorizeRole("admin"),deleteUser)




module.exports=router;