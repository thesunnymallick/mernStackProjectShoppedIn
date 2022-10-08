import React from 'react'
import {useSelector } from "react-redux"

import { Link, useNavigate } from "react-router-dom"
import MetaData from '../layouts/MetaData'
import CheckStep from './CheckStep'

function OrderConfirm() {
    

    const {cartItems, shippingInfo} =useSelector((state)=>state.cart)
    const{user}=useSelector((state)=>state.user)
    const navigate=useNavigate();
 
   

  const address=`${shippingInfo.address} ${shippingInfo.city} ${shippingInfo.state} ${shippingInfo.country} ${shippingInfo.pinCode}`


  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const processToPayment=()=>{
    const data={
        subtotal,
        shippingCharges,
        tax,
        totalPrice,
    }
    sessionStorage.setItem("orderInfo", JSON.stringify(data))

    navigate('/process/payment')

  }


  const CaseOndelivery=()=>{
    const data={
        subtotal,
        shippingCharges,
        tax,
        totalPrice,
    }
    sessionStorage.setItem("orderInfo", JSON.stringify(data))
  
         navigate('/cashondelivery')
  }




    return (
        <>
            <MetaData title={"Confirm Order -Shopped In"} />
            <CheckStep activeStep={1} />

            <section>
                <div className="container">
                    <div className="orderConfirm">
                        <div className='orderConfirm-left'>
                            <div className='shippingInfo'>
                              <h2>Shipping Info</h2>
                                <div>
                                    <p>Name</p>
                                    <span>{user.name}</span>
                                </div>
                                <div>
                                    <p>Email</p>
                                    <span>{user.email}</span>
                                </div>
                                
                                <div>
                                    <p>PhoneNo</p>
                                    <span>{shippingInfo.phoneNo}</span>
                                </div>
                                <div>
                                    <p>Address</p>
                                    <span>{address}</span>
                                </div>
                            </div>
                            <div className='CardItem'>
                                <h2> Your Card Item Product</h2>
                               
                                {
                                    cartItems && cartItems.map((item)=>(
                                    
                                        <div className='CardItem-1' key={item.product}>
                                        <div>
                                        <img src={item.image} alt={item.name} />
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                       </div>
                                         
                                       <div>
                                       <span>{item.quantity}</span> X <span>{item.price}</span> <span> = </span> <b>{` ₹  ${item.price*item.quantity}`}</b>
                                       </div>
                                       </div>
                                   
                                        
                                       

                                    ))
                                }

                             
                               


                            </div>
                        </div>
                        <div className='orderConfirm-right'>
                            <h2>Order Confiram</h2>
                            <div className="OrderPrice">
                                <div>
                                    <p>Sub Total</p>
                                    <span>₹ {subtotal}</span>
                                </div>
                                <div>
                                    <p>Tax</p>
                                    <span>₹ {tax}</span>
                                </div>
                                
                                <div>
                                    <p>Shipping Charge</p>
                                    <span>₹ {shippingCharges}</span>
                                </div>

                                <div>
                                    <p>Total</p>
                                    <span>₹ {totalPrice}</span>
                                </div>
                                <button onClick={processToPayment}>Proceed To Payment</button>
                                <button onClick={CaseOndelivery}>Case On delivery</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default OrderConfirm