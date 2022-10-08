import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import{useDispatch, useSelector}from "react-redux"
import { useNavigate } from "react-router-dom";
import Loader from '../layouts/Loader';
import {clearErros, resetPassword} from '../../action/userAction'
import {useAlert} from "react-alert"
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MetaData from '../layouts/MetaData'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useParams } from "react-router-dom";

function ResetPassword() {
 
    const dispatch=useDispatch()
    const alert=useAlert();
    const navigate=useNavigate();
    const {id, token}=useParams()
   const{loading, error, success}=useSelector((state)=>state.forgotPassword)

  const[password , setPassword]=useState("")
  const[confirmPassword , setConfirmPassword]=useState("")


   const ResetPasswordSubmit=(e)=>{

      e.preventDefault()
      const myFrom=new FormData();
        myFrom.set("password",password)
        myFrom.set("confirmPassword", confirmPassword) 
      dispatch(resetPassword(id, token, myFrom));
    }
   useEffect(()=>{
    if (error) {
       alert.error(error);
       dispatch(clearErros());
     }

   if(success)
   {
       alert.success("Password Update Successfully")
         navigate('/login')
   }
   },[dispatch, error, alert, success, navigate])

  
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("rgba(0,0,0)"),
    backgroundColor:"#FF577F",
    '&:hover': {
      backgroundColor: "#E5707E",
    },
   width:"100%"
  }));
  return (
    <>
    {
        loading? <Loader/> :(<>
        <MetaData title={`ChangePassword-ShoppedIn`}/>
         <section className='ResetPasswordSection'>
          <div className="container">

          <div className="ResetPassword">
   
          <form action="" className='ResetPasswordform' onSubmit={ResetPasswordSubmit}>
      
             <div className='ResetPasswordContent'>
               <h2>ResetPassword</h2>
        
                <div>
                 <LockOutlinedIcon/>  <input type="password" required  value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder=' New Password' />
                </div>
                <div>
                <LockOpenIcon/> <input type="password" required  value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}  placeholder='Confirm Password' />
                </div>
               <div> <ColorButton sx={{marginTop:"1rem"}} type="submit"  variant="contained" >Change Password</ColorButton></div>
               
             </div>
             
          </form>
      </div>
    </div>
   </section>
        </>)
    }
   
 </>
  )

}

export default ResetPassword