
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import{useDispatch, useSelector}from "react-redux"
import { useNavigate } from "react-router-dom";
import Loader from '../layouts/Loader';
import {clearErros, updatePassword} from '../../action/userAction'
import {UPDATE_PASSWORD_REST} from '../../constants/userConstants'
import {useAlert} from "react-alert"
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import MetaData from '../layouts/MetaData'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
function UpdatePassword() {

    const dispatch=useDispatch()
    const alert=useAlert();
    const navigate=useNavigate();
   const{loading, error, isUpdated}=useSelector((state)=>state.profile)

  const[oldPassword , setOldPassword]=useState("")
  const[newPassword , setNewPassword]=useState("")
  const[confirmPassword , setConfirmPassword]=useState("")


   const UpdatePasswordSubmit=(e)=>{

      e.preventDefault()

      const myFrom=new FormData();
      myFrom.set("oldPassword",oldPassword)
      myFrom.set("newPassword", newPassword);
      myFrom.set("confirmPassword", confirmPassword) 
      dispatch(updatePassword(myFrom));
    
    }
   useEffect(()=>{
    if (error) {
       alert.error(error);
       dispatch(clearErros());
     }

   if(isUpdated)
   {
       alert.success("My Profile Update Successfully")
         navigate('/account')

         dispatch({
            type:UPDATE_PASSWORD_REST,
          });
   }

   

   },[dispatch, error, alert, isUpdated, navigate])

  
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
        <MetaData title={`UpdatePassword-ShoppedIn`}/>
         <section className='UpdatePasswordSection'>
          <div className="container">

          <div className="UpdatePassword">
   
          <form action="" className='UpdatePasswordform' onSubmit={UpdatePasswordSubmit}>
      
             <div className='UpdatePasswordContent'>
               <h2>UpdatePassword</h2>
        
                <div>
                <VpnKeyIcon/> <input type="password" required  value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}  placeholder='Old Password' />
                </div>
                <div>
                 <LockOutlinedIcon/>  <input type="password" required  value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}  placeholder=' New Password' />
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

export default UpdatePassword