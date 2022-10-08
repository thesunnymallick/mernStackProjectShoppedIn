import React, { useEffect } from 'react'
import MetaData from '../layouts/MetaData';
import ProductCart from './ProductCart';
import SliderItem from './SliderItem';

import {getProduct} from "../../action/productAction"
import {useSelector, useDispatch} from "react-redux"
import Loader from '../layouts/Loader'
import { useAlert } from 'react-alert';
 

function Home() {
  const alert=useAlert()
  const  dispatch=useDispatch()
  const {loading, error, products, produtsCount}= useSelector(state=>state.products)
     console.log("produxt",products, loading, produtsCount);
  useEffect(()=>{
    if(error)
    {
      return alert.error(error)
    }
     dispatch(getProduct());

  },[dispatch, error, alert])


  return (
  
       <>
       {
        loading ? <Loader/> :<>
          <MetaData title="Shopped In"/>
        <SliderItem/>
        <div className='product'>
        <h1 className='Title-headding'>Featured Product</h1>
        <div className="container">
         <div className="prdouctItem">
   
      
          {
           products && products.map((product)=>(
             <ProductCart 
             key={product._id}
             product={product}/>
           ))
          }
         </div>
        </div>
        </div>
       </>
      
       }
       </>
   
  )
}

export default Home;