import React, {useEffect, useRef}from 'react'
import{useDispatch, useSelector} from "react-redux"
import{useAlert} from "react-alert"
import MetaData from "../layouts/MetaData"
import CheckStep from './CheckStep'
import CreditCardIcon from '@mui/icons-material/CreditCard';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import EventIcon from '@mui/icons-material/Event';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom"
import {createOrder, clearErros} from "../../action/orderAction"

import{
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js"

import  axios from "axios"

function Payment() {

  const orderInfo=JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch=useDispatch();
  const alert=useAlert();
  const stripe=useStripe();
  const elements=useElements();
  const navigate=useNavigate();

  const {shippingInfo, cartItems}=useSelector((state)=>state.cart)
  const {user}=useSelector((state)=>state.user)
  const {error}=useSelector((state)=>state.newOrder)
  const payBtn=useRef(null)

  const paymentData={
    amount:Math.round(orderInfo.totalPrice*100),
  };
 
  const order={
    shippingInfo,
    orderItems:cartItems,
    itemsPrice:orderInfo.subtotal,
    taxPrice :orderInfo.tax,
    shippingPrice:orderInfo.shippingCharges,
    totalPrice:orderInfo.totalPrice,
  }
   



    
  
  const PaymentSubmitHandel=async(e)=>{
    e.preventDefault()
    payBtn.current.disabled=true;

    try {
   const config={
     headers:{"Content-Type":"application/json",},
   };
  
   const {data}=await axios.post("/api/v1/payment/process",paymentData,config)
  
   console.log("data",data)
     const client_secret=data.client_secret

    if(!stripe || !elements)
    {

      return;
    }

    const result=await stripe.confirmCardPayment(client_secret, {
      payment_method:{
       card:elements.getElement(CardNumberElement),
      billing_details:{
       name:user.name,
       email:user.eamil,
       address:{
        line1:shippingInfo.address,
        city:shippingInfo.city,
        state:shippingInfo.state,
        postal_code:shippingInfo.pinCode,
        country:shippingInfo.country
       }
      },
    },
    });
 
    if(result.error)
    {
      payBtn.current.disabled=false;
      alert.error(result.error.message)
    }
    else{
      if(result.paymentIntent.status==="succeeded")
      {

         order.paymentInfo={
          id:result.paymentIntent.id,
          status:result.paymentIntent.status
         }
           
         dispatch(createOrder(order))
         
        alert.success("Order Confirm Successfully ! Thank You")
         navigate('/success')
      }
      else{
        alert.error("There is some isuuu while processing payment")
      }
    }
      
    } catch (error) {
      payBtn.current.disabled=false;
      alert.error(error.response.data.message)

  }
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
      <MetaData title="Payment -ShoppedIn"/>
      <CheckStep activeStep={2}/>

      <div className="paymentContainer">
        <form className='paymentForm' onSubmit={(e)=>PaymentSubmitHandel(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon/>
            <CardNumberElement className='paymentInput'/>
          </div>
          <div>
             <EventIcon/>
            <CardExpiryElement className='paymentInput'/>
          </div>
          <div>
            <VpnKeyIcon/>
            <CardCvcElement className='paymentInput'/>
          </div>
          <input type="submit"
          value={`Pay - ${orderInfo && orderInfo.totalPrice}`} 
          ref={payBtn}
          className="paymentFormBtn"
          />
        
        </form>
      </div>
    </>
  )
}

export default Payment;