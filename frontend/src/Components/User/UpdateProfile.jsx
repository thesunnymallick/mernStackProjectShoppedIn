
import React, { useEffect, useState } from 'react'
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import{useDispatch, useSelector}from "react-redux"
import { useNavigate } from "react-router-dom";
import Loader from '../layouts/Loader';
import {clearErros, loadUser, updateProfile} from '../../action/userAction'
import {UPDATE_PROFILE_REST} from '../../constants/userConstants'
import {useAlert} from "react-alert"
import MetaData from '../layouts/MetaData';


function UpdateProfile() {

     const dispatch=useDispatch()
     const alert=useAlert();
     const navigate=useNavigate();

    const{user}=useSelector((state)=>state.user)
    const{loading, error, isUpdated}=useSelector((state)=>state.profile)


     const[name ,setName]=useState("");
     const[email, setEmail]=useState("")
     const[avatar, setAvatar]=useState()
     const[avatarPreview, setAvatarPreview]=useState('/profile.png')


    const updateProfileSubmit=(e)=>{

       e.preventDefault()

       const myFrom=new FormData();
        myFrom.set("name", name);
        myFrom.set("email",email);
        myFrom.set("avatar",avatar)
        dispatch(updateProfile(myFrom))

     }

     const updateProfileAvatar=(e)=>{
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


    useEffect(()=>{
     if(user)
     {
        setName(user.name)
        setEmail(user.email)
        setAvatarPreview(user.avatar.url) 
     }

     if (error) {
        alert.error(error);
        dispatch(clearErros());
      }

    if(isUpdated)
    {
        alert.success("My Profile Update Successfully")
         dispatch(loadUser())
         navigate('/account')
    }

    dispatch({
        type:UPDATE_PROFILE_REST,
      });

    },[dispatch, user,error, alert, isUpdated, navigate])

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
        <MetaData title={`UpdateProfile-ShoppedIn`}/>
          <section className='UpdateProfileSection'>
      <div className="container">
 
        <div className="UpdateProfile">
     
            <form onSubmit={updateProfileSubmit} className='UpdateProfileform'>
        
               <div className='UpdateProfileContent'>
                 <h2>Update Profile</h2>
                  <div>
                  <SentimentSatisfiedAltIcon/><input type="text" required name='name' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Name' />
                  </div>
                 <div>
                  <MailIcon/> <input type="email"  required name='email' value={email} onChange={(e)=>setEmail(e.target.value)}   placeholder='Email' />
                  </div>
                 <div>
                
                  </div>
                 <div id='UpdateProfileImages'>
                  <img src={avatarPreview} alt="avatar" />
                  <input type="file"name="avatar" onChange={updateProfileAvatar}  accept="image/*"/>
                 </div>
                 <div> <ColorButton sx={{marginTop:"1rem"}} type="submit"  variant="contained" >Update</ColorButton></div>
                 
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

export default UpdateProfile