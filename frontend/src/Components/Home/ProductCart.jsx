import React from 'react'
import {Link}  from 'react-router-dom';
import Rating from '@mui/material/Rating';

function ProductCart({product}) {

    const options = {
 
      size:"small",
      value: product.ratings,
      readOnly:true,
      name:"half-rating",
      color:"yellow",
      precision:0.5
     
    }
    
  return (
       <div className="productCartSection">
         <Link className='productCart' to={`/product/${product._id}`}>
          <img src={product.images[0].url} alt={product.name} />
          <p>{product.name}</p>
          <div>
           <Rating {...options}/> <span>({product.numOfReviews} reviews)</span>
          </div>
          <span> ₹ {product.price}</span>
         </Link>
       </div>
  )
}

export default ProductCart