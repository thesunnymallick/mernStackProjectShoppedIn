import React from 'react'

import CartItem from './CartItem'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux"
import{addToItemsCart, removeToItemsCart}from '../../action/cartAction'
import EmptyCart from './EmptyCart'
import MetaData from '../layouts/MetaData'
import {useNavigate} from"react-router-dom"


function Cart() {
   
    const dispatch=useDispatch();
    const navigate=useNavigate()
   const {cartItems}=useSelector((state)=>state.cart) 
   

   const priceItem= cartItems.reduce((acc, item) => acc + item.quantity * item.price+50.5,0)

    const inCrement=(id, quantity, stock)=>{
        const newQty=quantity+1;
        if(stock<=quantity)
        {
            return;
        }
      dispatch(addToItemsCart(id, newQty))
    }



    const deCrement=(id, quantity)=>{
    const newQty=quantity-1;
      if(1>=quantity)
      {
        return;
      }
      dispatch(addToItemsCart(id, newQty))

    }

    const deleteItem=(id)=>{
      dispatch(removeToItemsCart(id))
    }
    const checkOutHandeler=()=>{
     navigate('/login?redirect=/shipping')
    }

  return (
    <>

    {
        cartItems.length===0 ?<EmptyCart/> :(<>
          <MetaData title={`Cart- ShoppedIn`}/>
          <section className='cart'>
         <div className="container">
            <div className="cart-section">

        {
            cartItems && cartItems.map((item)=>(
                <CartItem
                key={item.product}
                value={item.quantity}
                title={item.name}
                img={item.image}
                price={item.price}
                id={item.product}
                stock={item.stock}
                inCrement={inCrement}
                deCrement={deCrement}
                deleteItem={deleteItem}
                />
            ))
        }
           
            <article>
                <div>
                    <h4>Sub Total</h4>
                    <p>{`₹ ${cartItems.reduce((acc, item) => acc + item.quantity * item.price,0)}`}</p>
                </div>


                

                <div style={{borderTop:"2px solid #FF577F"}}>
                    <h4>Total</h4>
                    <p style={{color:"#FF577F", fontSize:"1.30vmax"}}>{`₹ ${cartItems.reduce((acc, item) => acc + item.quantity * item.price,0)}`}</p>
                </div>
                <button onClick={checkOutHandeler}>checkout</button>
            </article>
            </div>
        </div>
        
     </section>

        </>)
    }
    </>
 


  )
}

export default Cart