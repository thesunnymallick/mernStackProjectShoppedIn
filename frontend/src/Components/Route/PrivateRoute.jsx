import React from 'react'
import{Navigate, Outlet} from "react-router-dom"
import {useSelector} from "react-redux"

function PrivateRoute() {
  const{loading, isAuthticated}=useSelector((state)=>state.user)
  return(loading===false && (isAuthticated===false? <Navigate to="/login"/>: <Outlet/>)) 
   
}

export default PrivateRoute