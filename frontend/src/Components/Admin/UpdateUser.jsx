import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from "react-redux"
import{useAlert} from "react-alert"

import {useParams, useNavigate} from "react-router-dom"
import SideBar from './SideBar'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';



import { USER_UPDATED_REST} from '../../constants/userConstants'
import { updateUser, userDetails, clearErros} from '../../action/userAction'
import Loader from "../layouts/Loader"

function UpdateUser() {


     const alert=useAlert();
     const dispatch=useDispatch()
     const navigate=useNavigate();
     const{id}=useParams()
    
     const userId=id;

     const {user, loading, error}= useSelector((state)=>state.userDetails)
     const {isUpdated, error:UpdateError,   loading: updateLoading}= useSelector((state)=>state.profile)



       const[name, setName]=useState("");
       const[email, setEmail]=useState("");
       const[role, setRole]=useState("")
      
      



     useEffect(()=>{


        if (user && user._id !== userId) {
            dispatch(userDetails(userId));
          }
          else{
            setName(user.name)
            setEmail(user.email)
            setRole(user.role)
          }

      if(error)
      {
        alert.error(error);
        dispatch(clearErros())
      }

      if(UpdateError)
      {
        alert.error(UpdateError);
        dispatch(clearErros())
      }

      if(isUpdated)
      {
        alert.success("User Update Successfuly");
        navigate('/admin/dashborad')
        dispatch({type:USER_UPDATED_REST})
        
      }

     },[error, alert, userId, user, isUpdated, UpdateError, dispatch])



       const UpdateUserHandel=(e)=>{
        e.preventDefault();

        const myForm=new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);

    
        dispatch(updateUser(id, myForm))

       }
      

      


  return (
    <>
      <div className="dashborad">
        <SideBar/>
        <div className="dashboradContainer">
          <div className="createProducts">
    
            {
                loading ? <Loader/> : (<>
                  <form  className='CreateProductForm' onSubmit={UpdateUserHandel}>
                <h2>Update Role</h2>
                <div>
                    <BadgeIcon/>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value) }   />

                </div>
                <div>
                  <EmailIcon/>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value) }     />

                </div>
             
              
                <div>
                  <VerifiedUserIcon/>
                   <select value={role} onChange={(e)=>setRole(e.target.value)}>
                   <option value="">Choses Role</option>
                   <option value="admin">Admin</option>
                   <option value="user">User</option>
                   </select>
                </div>
            
            
                <button 
                type="submit"   
                 disabled={
                    updateLoading ? true : false || role === "" ? true : false
                  }>
                    Updated</button>
               </form>
                </>)
            }


          </div>
         




       </div>
     </div>


    </>
  )
}

export default UpdateUser