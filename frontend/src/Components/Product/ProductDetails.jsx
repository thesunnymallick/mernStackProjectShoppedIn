import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { clearErros, getProductDetails ,newReview } from "../../action/productAction"
import Carousel from 'react-material-ui-carousel';
import { useParams } from "react-router-dom";
import Loader from '../layouts/Loader'
import ReviewCard from './ReviewCard';
import {useAlert} from "react-alert"
import MetaData from '../layouts/MetaData';
import {addToItemsCart} from '../../action/cartAction'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import { NEW_REVIEW_REST } from '../../constants/productConstants';


function ProductDetails() {
  const { id } = useParams();
  const alert=useAlert();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(state => state.productDetails)
  const{success, error:reviewError}=useSelector((state)=>state.newReview)

  const[quantity, setQuantity]=useState(1);
  const[rating, setRating]=useState(0);
  const[comment, setComment]=useState("");
  const[open, setOpen]=useState(false)



  const decQuantity=()=>{
  
    if(quantity<=1)
    {
      return;
    }
  
     const qty=quantity-1;
     setQuantity(qty);
  }

 const incQuantity=()=>{

     if(product.stock<=quantity)
     {
      return;
     }
     const qty=quantity+1;
     setQuantity(qty);
 }

  const addToCartHandel=()=>{
    dispatch(addToItemsCart(id,quantity))
    alert.success("Item Added To Cart")
  }

  const SubmitReviewHandel=()=>{
    open? setOpen(false) :setOpen(true)
  }

  const SubmitReview=()=>{
  
     const myFrom=new FormData();
     //rating, comment, productId
      myFrom.set("rating", rating)
      myFrom.set("comment",comment)
      myFrom.set("productId",id)
      dispatch(newReview(myFrom))
      setOpen(false)

  }
 
  useEffect(() => {
    if(error)
    {
       alert.error(error)
       dispatch(clearErros)
    }

    if(reviewError)
    {
      alert.error(reviewError);
      dispatch(clearErros)
    }
    if(success)
    {
      alert.success("Review Submit Successfully")
      dispatch({type:NEW_REVIEW_REST})
    }
    dispatch(getProductDetails(id))
  }, [dispatch, id, alert, error, success, reviewError])


  const options = {
 
    size:"large",
    value: product.ratings,
    readOnly:true,
    name:"half-rating",
    precision:0.5
   
  }
  return (
    <>
    {
      loading ? <Loader/> : (
        <>
        <MetaData title={`${product.name} - ShoppedIn`}/>
        <div className="ProductDetails">
           <div>
             <Carousel>
               <div className='carouseldiv'>
               {product.images &&
                 product.images.map((item, i) => (
                   <img
                     className="CarouselImage"
                     key={i}
                     src={item.url}
                     alt={`${i} Slide`}
                   />
                 ))}
                 </div>
             </Carousel>
           </div>
           <div className='rightdiv'>
             <div className="detailsBlock-1">
               <h2>{product.name}</h2>
               <p>Product # {product._id}</p>
             </div>
               <div className="detailsBlock-2">
               <Rating {...options} />
               <span className="detailsBlock-2-span">
                 {" "}
                 ({product.numOfReviews} Reviews)
               </span>
             </div>
                
             <div className="detailsBlock-3">
               <h1>{`₹${product.price}`}</h1>
               <div className="detailsBlock-3-1">
                 <div className="detailsBlock-3-1-1">
                   <button onClick={decQuantity} >-</button>
                  <input type="number" readOnly value={quantity} />
                   <button onClick={incQuantity} >+</button>
                 </div>
                 <button
                   onClick={addToCartHandel}
                   disabled={product.stock < 1 ? true : false}
                   
                 >
                   Add to Cart
                 </button>
               </div>
               <p>
                 Status:
                 <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                   {product.stock < 1 ? "OutOfStock" : "InStock"}
                 </b>
               </p>
                
          </div>

          <div className="detailsBlock-4">
               Description : <p>{product.description}</p>
             </div>

             <button onClick={SubmitReviewHandel} className="submitReview">
               Submit Review
             </button>

          </div>
      </div>

      <div className='ReviewSections'>
      <h3 className="reviewsHeading">REVIEWS</h3>

      <Dialog
        open={open}
        onClose={SubmitReviewHandel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Submit Review</DialogTitle>
        <DialogContent className='submitDialog '>

        <Rating 
         value={rating}
         onChange={(e)=>setRating(e.target.value)}
         name="half-rating"
         precision={0.5} 
         />


          <textarea 
          value={comment}
          onChange={(e)=>setComment(e.target.value)}
          className='submitDialogTextArea'
          name="" id="" cols="30" rows="5">
          </textarea>

        </DialogContent>
        <DialogActions>
          <Button color='success' onClick={SubmitReview} >Submit</Button>
          <Button onClick={SubmitReviewHandel} color="error">Cancel</Button>
        </DialogActions>
      </Dialog>







    
      {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}

         </div>
         
   </>
      )
    }
    </>
  )
}

export default ProductDetails