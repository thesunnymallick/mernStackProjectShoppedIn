import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert"
import { Link, useParams } from "react-router-dom"
import { getOrderDetails, clearErros } from '../../action/orderAction'
import MetaData from "../layouts/MetaData"
import Loader from "../layouts/Loader"
import Container from '@mui/material/Container';
function OrderDetails() {

    const { loading, error, order } = useSelector((state) => state.orderDetails)

    const alert = useAlert();
    const dispatch = useDispatch();
    const { id } = useParams();


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErros());

        }
        dispatch(getOrderDetails(id))

    }, [alert, error, id, dispatch])



    return (
        <>
           
            { 
                loading ? <Loader /> : (
                    <>
                     <MetaData title={`Order Details-Shopped In`}/>
                        <Container>
                            <div className="orderDetails">
                                <div className='orderDetails-main'>

                                    <div className='OrdershippingInfo'>
                                        <h1>order#{order&&order._id}</h1>
                                        <h2>Shipping Info</h2>
                                        <div>
                                            <p>Name</p>
                                            <span>{order.user && order.user.name}</span>
                                        </div>
                                        <div>
                                            <p>Email</p>
                                            <span>{order.user && order.user.email}</span>
                                        </div>

                                        <div>
                                            <p>PhoneNo</p>
                                            <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                                        </div>
                                        <div>
                                            <p>Address</p>
                                            <span>
                                                {order.shippingInfo &&
                                                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                            </span>
                                        </div>
                                    </div>

                                     <div className="paymentInfo">
                                        <h2>Payment Info</h2>
                                         <div>
                                         <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                                        </div>

                                     </div>
                                     <div className="AmountInfo">
                                        <h2>Amount</h2>
                                      <div>
                                      <span>{order.totalPrice && order.totalPrice}</span>
                                      </div>
                                     </div>

                                     <div className="OrderStatus">
                                        <h2>Order Status</h2>
                                      <div>
                                      <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                                      </div>
                                     </div>

                                    <div className='OrderCardItem'>
                                        <h2> Your All Product</h2>

                                        {
                                            order.orderItems && order.orderItems.map((item) => (
                                                
                                                    <div className='OrderCardItem-1' key={item.product}>
                                                        <div>
                                                            <img src={item.image} alt={item.name} />
                                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        </div>

                                                        <div>
                                                            <span>{item.quantity}</span> X <span>{item.price}</span> <span> = </span> <b>{` ₹  ${item.price * item.quantity}`}</b>
                                                        </div>
                                                    </div>
                                                

                                            ))
                                        }





                                    </div>
                                </div>
                            </div>
                        </Container>
                    </>
                )
            }

        </>
    )
}


// 




export default OrderDetails