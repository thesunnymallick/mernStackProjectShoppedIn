import React, { useState } from 'react'

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useNavigate} from "react-router-dom"
import {useAlert} from "react-alert"
import{useDispatch, useSelector} from "react-redux"
import{logout} from "../../action/userAction"
import Backdrop from '@mui/material/Backdrop';
import Badge from '@mui/material/Badge';


function UserOption({user}) {
  const navigate=useNavigate()
  const alert=useAlert();
  const dispatch=useDispatch()
  const[open ,setOpen]=useState(false)
  const {cartItems}=useSelector((state)=>state.cart) 

  const options=[
    {icon:<PersonIcon/>, name:"Profile", func:Profile},
    {icon:<ListAltIcon/>, name:"MyOrders", func:Orders},
    {icon:  <Badge badgeContent={cartItems.length} color="success"><ShoppingCartIcon/></Badge>, 
      name:`Cart`, func:cart},
    {icon:<LogoutIcon/>, name:"Logout", func:Logout},
   
  ]
 if(user.role==="admin")
 {
  options.unshift( {icon:<DashboardIcon/>, name:"Dashborad", func:Dashboard})
 }

  function Dashboard(){
  navigate('/admin/dashborad')
  }
  function Profile()
  {
    navigate('/account')
  }
  function Orders()
  {
    navigate('/orders/me')
  }
  function cart()
  {
    navigate('/cart')
  }
  function Logout()
  {
     dispatch(logout());
    alert.success("Logout Successfully")
  }
 

  return (
  <>
  <Backdrop open={open}/>
  <SpeedDial 
  className='speedDail'
  onClose={()=>setOpen(false)}
  onOpen={()=>setOpen(true)}
  open={open}
  direction="down"
  icon={
  <img
   className='speedDailIcon'
   src={user.avatar.url ? user.avatar.url :  "/profile.png"}
   alt="profile.png"
  />}
  ariaLabel="SpeedDial playground example">
   
   {
    options.map((item)=>(
      <SpeedDialAction 
      key={item.name}
      icon={item.icon}
       tooltipTitle={item.name} 
        tooltipOpen={window.innerWidth<=600?true:false}
       onClick={item.func}/> 
    ))
   }
 
  
  </SpeedDial>
  </>
  )
}

export default UserOption