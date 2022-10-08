import React, {useEffect, useRef,}from 'react'
import{useDispatch, useSelector} from "react-redux"
import{useAlert} from "react-alert"
import MetaData from "../layouts/MetaData"
import CheckStep from './CheckStep'
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom"
import {createOrder, clearErros} from "../../action/orderAction"
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import EmailIcon from '@mui/icons-material/Email';




function CashOnDelivery() {

  const orderInfo=JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch=useDispatch();
  const alert=useAlert();
  const navigate=useNavigate();

  const {shippingInfo, cartItems}=useSelector((state)=>state.cart)
  const {user}=useSelector((state)=>state.user)
  const {error}=useSelector((state)=>state.newOrder)
  const payBtn=useRef(null)

   

 
 
  const order={
    shippingInfo,
    orderItems:cartItems,
    itemsPrice:orderInfo.subtotal,
    taxPrice :orderInfo.tax,
    shippingPrice:orderInfo.shippingCharges,
    totalPrice:orderInfo.totalPrice,
  } 

  order.paymentInfo={
    id:"COD",
    status: "Succced"
  }
  
  const PaymentSubmitHandel=async(e)=>{
    e.preventDefault()

    payBtn.current.disabled=true;
   
   


         dispatch(createOrder(order))
         
        alert.success("Order Confirm Successfully ! Thank You")
         navigate('/success')

}



  useEffect(()=>{
    if(error)
    {
      alert.error(error);
      dispatch(clearErros());
    }
  },[error, dispatch, alert])

  return (
    <>
      <MetaData title="Cash On delivery"/>
      <CheckStep activeStep={2}/>

      <div className="paymentContainer">
        <form className='paymentForm' onSubmit={(e)=>PaymentSubmitHandel(e)}>
          <Typography>Case On delivery</Typography>
          <div>
          <PermIdentityIcon/>
            <input type="text" style={{backgroundColor:"white"}} value={user.name} readOnly className='paymentInput'/>
          </div>
          <div>
             <EmailIcon/>
            <input value={user.email}   style={{backgroundColor:"white"}}  readOnly className='paymentInput'/>
          </div>
         
          <input type="submit"
          value={`Case On delivery - ${orderInfo && orderInfo.totalPrice}`} 
          ref={payBtn}
          className="paymentFormBtn"
          />
        
        </form>
      </div>
    </>
  )
}

export default CashOnDelivery;