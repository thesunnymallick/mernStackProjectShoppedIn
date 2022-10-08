import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import {Link} from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';
import {useSelector} from "react-redux"
import LogoutIcon from '@mui/icons-material/Logout';


function Header() {
  const navigate = useNavigate();
  const[keyword ,setKeyword]=useState("")
  const {cartItems}=useSelector((state)=>state.cart) 
  const{ isAuthticated}=useSelector((state)=>state.user)
    function searchSubmitHandel(e){
   e.preventDefault()
   
   if(keyword.trim())
   {
    navigate(`/products/${keyword}`)
   }
   else{
    navigate('/products')
   }

  }
  
  return (
      <>
      <div className="navbar">
        <div>
          <img src={logo} alt="" />
          <span>Shopped In</span>
        </div>

         <div>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/products">Product</Link>
          <Link to="/contact">Contact</Link>
        </div>
         <div className='search-bar'>
          <form action="" onSubmit={searchSubmitHandel}>
          <input 
           type="text" 
           placeholder='search the product'
           onChange={(e)=>setKeyword(e.target.value)}

            />
          <button type='submit'><SearchIcon/></button>
          </form>

        </div>
        <div>
        <Link to="/cart">
         <Badge badgeContent={cartItems.length} color="success">
         <ShoppingBagOutlinedIcon/>
         </Badge>
          </Link>
        <Link to="/login"> {isAuthticated ? <AccountCircleOutlinedIcon/> :<LogoutIcon/> } </Link>
       
        </div>
       
      </div>
      </>
  )
}

export default Header