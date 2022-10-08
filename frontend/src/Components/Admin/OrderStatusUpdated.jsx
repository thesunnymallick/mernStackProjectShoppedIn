import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert"
import { Link,useParams } from "react-router-dom"
import MetaData from '../layouts/MetaData'
import SideBar from './SideBar'
import { clearErros, getOrderDetails, updateOrder } from "../../action/orderAction"

import CategoryIcon from '@mui/icons-material/Category';
import { UPDATE_ORDER_REST } from '../../constants/orderConstants'

function OrderStatusUpdated() {



 
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams()
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);


  const [status, setStatus] = useState("");




  const updateOrderStatus = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder(id, myForm))
  }


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErros());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErros());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_REST });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError]);




  return (
    <>
      <MetaData title={"Update Order Status -Shooped In"} />


      <div className="dashborad">
        <SideBar />
        <div className="dashboradContainer">
          {
            loading ? <loader /> : (
              <>
                <section>
                  <div className="container">
                    <div className="orderConfirm">
                       <div   className='orderConfirm-left'>
                        <div className='shippingInfo'>
                          <h2   style={{width:"100%"}}>Shipping Info</h2>
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
                                `${order.shippingInfo.address},
                                   ${order.shippingInfo.city},
                                   ${order.shippingInfo.state}, 
                                    ${order.shippingInfo.pinCode},
                                     ${order.shippingInfo.country}`}
                            </span>
                          </div>
                        </div>

                        <div className="paymentInfo">
                          <h2 style={{width:"100%"}}>Payment Info</h2>
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
                        <div  className="AmountInfo">
                          <h2 style={{width:"100%"}} >Amount</h2>
                          <div>
                            <span>{order.totalPrice && order.totalPrice}</span>
                          </div>
                        </div>

                        <div className="OrderStatus">
                          <h2   style={{width:"100%"}}>Order Status</h2>
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



                        <div className='CardItem'>

                          <h2   style={{width:"100%"}}> Your Card Item Product</h2>


                          {order.orderItems &&
                            order.orderItems.map((item) => (
                              <div className='CardItem-1' key={item.product}>
                                <div>
                                  <img src={item.image} alt="Product" />
                                  <Link to={`/product/${item.product}`}>
                                    {item.name}
                                  </Link>
                                </div>

                                <div>
                                  <span>
                                    {item.quantity} X ₹{item.price} ={" "}
                                    <b>₹{item.price * item.quantity}</b>
                                  </span>
                                </div>
                              </div>
                            ))}




                        </div>
                       </div>


                     <div style={{height:"100%", marginTop:"1rem"}}>
                     <form className='CreateProductForm' onSubmit={updateOrderStatus}>
                        <h2>Update Status</h2>



                        <div>
                          <CategoryIcon />
                          <select onChange={(e) => setStatus(e.target.value)}>
                            <option value="">Choose Category</option>
                            {order.orderStatus === "Processing" && (
                              <option value="Shipped">Shipped</option>
                            )}

                            {order.orderStatus === "Shipped" && (
                              <option value="Delivered">Delivered</option>
                            )}
                          </select>
                        </div>
                        <button
                          //disabled ={loading ? true :false}
                          type="submit">update</button>
                      </form>
                     </div>


                    </div>
                  </div>
                </section>
              </>
            )
          }

        </div>
      </div>




    </>
  )
}

export default OrderStatusUpdated