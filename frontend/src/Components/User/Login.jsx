import React, { useEffect, useState } from 'react'
import MailIcon from '@mui/icons-material/Mail';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import{login, clearErros} from '../../action/userAction'
import{useDispatch, useSelector}from "react-redux"
import {useAlert} from "react-alert"
import  Loader from '../layouts/Loader'
import { useNavigate, useLocation } from "react-router-dom";
import MetaData from '../layouts/MetaData';

function Login() {
    const dispatch=useDispatch()
    const alert=useAlert();
    const navigate=useNavigate();
    const location=useLocation();

    const {error, loading, isAuthticated}=useSelector(state=>state.user)
    // login State
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // login Handeler
    const loginSubmit=(e)=>{
      e.preventDefault()
      dispatch(login(loginEmail, loginPassword))
    }
   
    const redirect=location.search?location.search.split("=")[1]:'/account'



    useEffect(()=>{
      if(error)
      {
       alert.error(error)
       dispatch(clearErros())
      }
      if(isAuthticated)
      {
       navigate(redirect)
      }
    },[dispatch, alert, error,navigate, redirect, isAuthticated])
     
   

      //  custom Button Color
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

      loading ? <Loader/> :(<> 
      <MetaData title={`login-ShoppedIn`}/>
      <section className='loginsection'>
      <div className="container">
        <div className="login">
            <form onSubmit={loginSubmit} className='loginform'>
        
               <div className='loginContent'>
                 <h2>login</h2>
                 <div><MailIcon/> <input type="email"    required  value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)}  placeholder='email' /></div>
                 <div><LockOpenIcon/> <input type="password" required  value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)} placeholder='password' /></div>
                <div> <ColorButton sx={{marginTop:"1rem"}}  variant="contained" type='submit' >LogIn </ColorButton></div>
                  <div className='registerPassword'>
                 
                    <Link to='/register' className='register-link' >Register</Link>
                    <Link to='/password/forgot' className='password-link'>forget password ?</Link>
                
                  </div>
               </div>
               
            </form>
        </div>
      </div>
     </section>

      </> )
    }
  </>
  )
}

export default Login