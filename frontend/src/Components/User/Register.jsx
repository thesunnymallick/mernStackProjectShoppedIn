import React, { useEffect, useState } from 'react'
import MailIcon from '@mui/icons-material/Mail';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import {register, clearErros} from "../../action/userAction"
import{useDispatch, useSelector}from "react-redux"
import { useNavigate } from "react-router-dom";
import Loader from '../layouts/Loader';


import {useAlert} from "react-alert"
import MetaData from '../layouts/MetaData';

function Register() {
 
    const dispatch=useDispatch()
    const navigate=useNavigate();
    const alert=useAlert()
    const {error, loading, isAuthticated}=useSelector(state=>state.user)
  const[user, setUser]=useState({name:"" , email:"", password: ""})
  const{name, email, password}=user;
  const[avatar, setAvatar]=useState()
  const[avatarPreview, setAvatarPreview]=useState('/profile.png')

const registerSubmit=(e)=>{

    e.preventDefault();

   const myForm=new FormData();
   myForm.set("name",name)
   myForm.set("email",email)
   myForm.set("password",password)
   myForm.set("avatar",avatar)
   dispatch(register(myForm))
   

  }
   const registerDataChange=(e)=>{
    if(e.target.name==="avatar")
    {
     const render=new FileReader();
      render.onload=()=>{
        if(render.readyState===2)
        {
          setAvatarPreview(render.result)
          setAvatar(render.result);
        }
      }
      render.readAsDataURL(e.target.files[0])
    }
    else{
      setUser({...user, [e.target.name]:e.target.value})
    }

   }

   useEffect(()=>{
    if(error)
    {
      alert.error(error)
      dispatch(clearErros())
    }

    if(isAuthticated)
     {
      navigate('/account')
     }
  
   },[dispatch, error, alert, navigate, isAuthticated ])

    



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
       loading ? <Loader/> : (<>
    <MetaData title={`Register -Shopped In`}/>
    <section className='RegisterSection'>
      <div className="container">
 
        <div className="Register">
     
            <form action="" className='Registerform' onSubmit={registerSubmit}>
        
               <div className='RegisterContent'>
                 <h2>Register</h2>
                  <div>
                  <SentimentSatisfiedAltIcon/><input type="text" required name='name' value={name} onChange={registerDataChange} placeholder='Name' />
                  </div>
                 <div>
                  <MailIcon/> <input type="email"  required name='email' value={email} onChange={registerDataChange}   placeholder='Email' />
                  </div>
                 <div>
                  <LockOpenIcon/> <input type="password" required name='password' value={password} onChange={registerDataChange}  placeholder='Password' />
                  </div>
                  <div>
                  <p>Image should be less then 300 kb</p>
                  </div>
                 <div id='registerImages'>
              
                  <img src={avatarPreview} alt="avatar" />
                
                  <input type="file"name="avatar"  onChange={registerDataChange} accept="image/*"/>
                 </div>
                 <div> <ColorButton sx={{marginTop:"1rem"}} type="submit"  variant="contained" >Register</ColorButton></div>
                 
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

export default Register