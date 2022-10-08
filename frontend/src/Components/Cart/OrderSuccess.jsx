import React from 'react'
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MetaData from '../layouts/MetaData';
function OrderSuccess() {
  return (
   <>
   <MetaData title={`Order Success- ShoppedIn`}/>
     <div className="orderSuccess">
     <CheckCircleIcon/>
    <Typography>Your order has been placced successfully !</Typography>
    <Link to='/orders/me'>View Orders</Link>
    </div>
   </>
  )
}

export default OrderSuccess