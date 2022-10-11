import React, { useEffect } from 'react'
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"
import MetaData from '../layouts/MetaData'
import {useNavigate} from 'react-router-dom'
import Loader from "../layouts/Loader"

function Profile() {
    const{user, loading, isAuthticated}=useSelector((state)=>state.user)
    console.log();
    const navigate=useNavigate()
    useEffect(()=>{
      if(isAuthticated===false)
      {
       navigate("/logout")
      }
    },[isAuthticated, user, navigate])
  return (
    <>
     {
        loading ? <Loader/> : (<>
         <MetaData title={`${user.name}-Profile`}/>
         <section className='ProfileSection'>
          <div className="container">
            <div className="Profile">
            <h1>My Profile</h1>
              <div className="ProfileContent">
                
                <div className='profileContentDiv'>
                    <img src={user.avatar.url} alt={user.name} />
                     <Link to="/upadte/me">Edit Profile</Link>
                </div>
                <div>
                    <h4>Name</h4>
                    <h6>{user.name}</h6>
                    <h4>Email</h4>
                    <h6>{user.email}</h6>
                    <h4>Joined On</h4>
                    <h6>{String(user.createdAt).substring(0,10)}</h6>
                    <div>
                    <Link to='/orders/me'>My Orders</Link>
                    <Link to='/update/password'>Change password</Link>
                    </div>
                </div>
              </div>

            </div>
           </div>
          </section>
        </>)
     }
    </>
  )
}

export default Profile