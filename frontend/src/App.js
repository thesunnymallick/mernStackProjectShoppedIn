import { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Elements} from "@stripe/react-stripe-js"
import{loadStripe} from "@stripe/stripe-js"

// components import
import Header from './Components/layouts/Header'
import Footer from './Components/layouts/Footer'
import UserOption from './Components/layouts/UserOption'

import Home from './Components/Home/Home'
import ProductDetails from './Components/Product/ProductDetails'
import Products from './Components/Product/Products'
import Login from './Components/User/Login'
import About from './Components/About/About'
import Contact from './Components/Contact/Contact'

import PrivateRoute from './Components/Route/PrivateRoute'

// Scss import
import'./Style/App.scss'
import './Style/Header.scss'
import './Style/Footer.scss'
import './Style/Home.scss'
import './Style/loading.scss'
import './Style/ProductDetails.scss'
import './Style/Products.scss'
import './Style/Login.scss'
import './Style/Register.scss'
import './Style/Profile.scss'
import './Style/UpdateProfile.scss'
import './Style/UpdatePassword.scss'
import './Style/ForgotPassword.scss'
import './Style/ResetPassword.scss'
import './Style/Cart.scss'
import './Style/ShippingInfo.scss'
import './Style/CheckStep.scss'
import './Style/OrderConfirm.scss'
import './Style/Payment.scss'
import './Style/OrderSuccess.scss'
import './Style/MyOrders.scss'
import './Style/OrderDetails.scss'
import './Style/SideBar.scss'
import './Style/DashBorad.scss'
import './Style/AdminCreateProduct.scss'
import './Style/AdminOrderList.scss'
import './Style/About.scss'
import './Style/Contact.scss'
import Register from './Components/User/Register'
import store from "./store"
import{loadUser}from './action/userAction'
import {useSelector} from "react-redux"
import Profile from './Components/User/Profile'
import UpdateProfile from './Components/User/UpdateProfile'
import UpdatePassword from './Components/User/UpdatePassword'
import ForgotPassword from './Components/User/ForgotPassword'
import ResetPassword from './Components/User/ResetPassword'
import EmptyCart from './Components/Cart/EmptyCart'
import Cart from './Components/Cart/Cart'
import ShippingInfo from './Components/Cart/ShippingInfo'
import OrderConfirm from './Components/Cart/OrderConfirm'
import axios from 'axios'
import Payment from './Components/Cart/Payment'
import OrderSuccess from './Components/Cart/OrderSuccess'
import CashOnDelivery from './Components/Cart/CashOndelivery'
import MyOrders from './Components/Order/MyOrders'
import OrderDetails from './Components/Order/OrderDetails'
import Dashborad from './Components/Admin/Dashborad'
import OrderList from './Components/Admin/OrderList'
import ProductsList from './Components/Admin/ProductsList'
import ProductCreate from './Components/Admin/ProductCreate'
import UpdateProduct from './Components/Admin/UpdateProduct'
import OrderStatusUpdated from './Components/Admin/OrderStatusUpdated'
import UsersList from './Components/Admin/UsersList'
import UpdateUser from './Components/Admin/UpdateUser'
import ProductsReviews from './Components/Admin/ProductsReviews'
import AdminRoute from './Components/Route/AdminRoute'





function App() {
  
  const{isAuthticated, user}=useSelector((state)=>state.user)
   const[stripeapikey, setStripeapikey]=useState("")

   console.log(stripeapikey);
    async function getStripeApiKey(){
      const{data}=await axios.get('/api/v1/stripeapikey')
      setStripeapikey(data.stripeApiKey)
    }
   
 //--legacy-peer-deps 

  useEffect(()=>{
    store.dispatch(loadUser());
    getStripeApiKey();
  },[])

   window.addEventListener("contextmenu", (e)=>e.preventDefault())

  return (
    <div className="App">
    <BrowserRouter>
    {
    isAuthticated && <UserOption user={user}/>
    }
    <Header/>
   
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/product/:id" element={<ProductDetails/>} exact/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/products/:keyword" element={<Products/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path='/register'element={<Register/>}/>
      <Route element={<PrivateRoute/>}>
      <Route path='/account' element={<Profile/>}/>
      <Route path='/upadte/me' element={<UpdateProfile/>}/>
      <Route path='/update/password'element={<UpdatePassword/>}/>
      <Route path='/shipping' element={<ShippingInfo/>}/>
      <Route path='/order/orderconfirm' element={<OrderConfirm/>}/>      
      {
        stripeapikey && <Route exact path='/process/payment' element={[<Elements stripe={loadStripe(stripeapikey)}> <Payment /></Elements>]}/>
      }
      <Route exact path="/success" element={<OrderSuccess/>}/>
      <Route exact path='/cashondelivery' element={<CashOnDelivery/>}/>
     <Route exact path='/orders/me' element={<MyOrders/>}/>
     <Route exact path='/order/:id' element={<OrderDetails/>}/>
      </Route>



      {/* ADMIN Routes */}
      <Route element={<AdminRoute isAdmin={true}/>}>  
      <Route exact path='/admin/dashborad' element={<Dashborad/>} />
      <Route exact path='/admin/products' element={<ProductsList/>}/>
      <Route exact path='/admin/product' element={<ProductCreate/>}/>
      <Route exact path='/admin/product/:id'element={<UpdateProduct/>} />
      <Route exact path='/admin/orders' element={<OrderList/>}/>
       <Route exact path='/admin/order/:id' element={<OrderStatusUpdated/>}/>
       <Route exact path='/admin/users' element={<UsersList/>}/>
       <Route exact path='/admin/user/:id' element={<UpdateUser/>}/>
       <Route exact path='/admin/Reviews' element={<ProductsReviews/>}/>
      </Route>
     

     <Route path='/password/forgot' element={<ForgotPassword/>}/>
     <Route path='/password/reset/:id/:token'element={<ResetPassword/>} />
    
     <Route path='/cart' element={<Cart/>}/>
     <Route path='/emptycart' element={<EmptyCart/>}/>
     <Route path='/about' element={<About/>}/>
     <Route path='/contact' element={<Contact/>} />
   
    </Routes>

  
    <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;
