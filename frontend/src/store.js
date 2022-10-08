
import { configureStore, combineReducers } from '@reduxjs/toolkit'


import { 
  allreviewsReducer,
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productsReducer,
  reviewReducer} from './reducer/productReducer'
import {allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer} from './reducer/userReducer'
import{cartReducer} from './reducer/cartReducer'
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducer/orderReducer"

const reducer=combineReducers({
  products:productsReducer, //This IS---> products
  productDetails:productDetailsReducer,
  user:userReducer,
  profile:profileReducer,
  forgotPassword:forgotPasswordReducer,
  cart:cartReducer,
  newOrder:newOrderReducer,
  myOrders:myOrdersReducer,
  orderDetails:orderDetailsReducer,
  newReview:newReviewReducer,
  newProduct:newProductReducer,
  product:productReducer, //This IS---> product (Admin)
  allOrders:allOrdersReducer,
  order:orderReducer,
  allUsers:allUsersReducer,
  userDetails:userDetailsReducer,
  allReviews:allreviewsReducer,
  review:reviewReducer,
});

let initialState={
  cart:{
    cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
    
    shippingInfo:localStorage.getItem("shippingInfo")?JSON.parse(localStorage.getItem("shippingInfo")):{}

   }
};


const store=configureStore(
  {reducer, preloadedState: initialState,} );

export default store;