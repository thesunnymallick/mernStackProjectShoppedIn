import React from 'react'
import{Link} from "react-router-dom"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
function CartItem(props) {
 const {id, stock, value, img, title, price, inCrement, deCrement, deleteItem}=props
  return (
    <div className='cartItem'>
       <div>
       
        <img src={img} alt="" />
        <h4>{title}</h4>
        <button onClick={()=>deCrement(id,value)}>-</button>
        <p>{value}</p>
        <button onClick={()=>inCrement(id,value,stock)} >+</button>
       </div>

       <div className='lastChild'>
         <h5> {`₹ ${value*price}`}</h5>
         <p onClick={()=>deleteItem(id)}><DeleteForeverIcon color='error'/></p>
  
       </div>
    </div>
  )
}

export default CartItem