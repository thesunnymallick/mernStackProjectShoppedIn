import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import{useDispatch, useSelector}from "react-redux"
import Loader from '../layouts/Loader';
import {clearErros, forgotPassword} from '../../action/userAction'
import {useAlert} from "react-alert"
import MetaData from '../layouts/MetaData'
import MailIcon from '@mui/icons-material/Mail';


function ForgotPassword() {
     
    const dispatch=useDispatch()
     const alert=useAlert();

    
    const{loading, error, message}=useSelector((state)=>state.forgotPassword)

    const[email, setEmail]=useState("")

    const ForgotPasswordSubmit=(e)=>{
        e.preventDefault(); 
        const myFrom=new FormData();
        myFrom.set("email",email);
        dispatch(forgotPassword(myFrom))
      }

     useEffect(()=>{
        if(error)
        {
            alert.error(error)
            dispatch(clearErros())
        }
        if(message)
        {
            alert.success(message);
        }

     },[alert,dispatch,error, message])



    
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
        <MetaData title={`ForgotPassword-ShoppedIn`}/>
         <section className='ForgotPasswordSection'>
          <div className="container">
          <div className="ForgotPassword">
   
          <form action="" className='ForgotPasswordform' onSubmit={ForgotPasswordSubmit}>
      
             <div className='ForgotPasswordContent'>
               <h2>ForgotPassword</h2>
        
                  <div>
                  <MailIcon/> <input type="email"  required name='email' value={email} onChange={(e)=>setEmail(e.target.value)}   placeholder='Email' />
                  </div>

               <div> <ColorButton sx={{marginTop:"1rem"}} type="submit"  variant="contained" >Send</ColorButton></div>
               
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

export default ForgotPassword