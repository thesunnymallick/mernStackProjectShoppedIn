import React, { useEffect, useState } from 'react'
import{ useDispatch, useSelector} from "react-redux"
import { DataGrid } from '@mui/x-data-grid'
import { useAlert } from "react-alert"
import {useNavigate} from "react-router-dom"
import MetaData from "../layouts/MetaData"
import {clearErros, allReviews, deleteReviews} from "../../action/productAction"
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import SideBar from './SideBar' 
import ReviewsIcon from '@mui/icons-material/Reviews';
import {DELETE_REVIEW_REST } from '../../constants/productConstants'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
function ProductsReviews() {
   const dispatch=useDispatch();
   const alert = useAlert();
   const navigate=useNavigate()
    const { error, reviews, loading } = useSelector((state) => state.allReviews)
    const { error:DeleteError, isDeleted } = useSelector((state) => state.review)
 
    const [productId, setProductId] = useState("");


   useEffect(()=>{

    if(productId.length===24)
    {
        dispatch(allReviews(productId))
    }

     if(error)
     {
      alert.error(error)
      dispatch(clearErros())
     }
     
     if(DeleteError)
     {
      alert.error(DeleteError)
      dispatch(clearErros())
     }
     if(isDeleted)
     {
      alert.success("Review  Delete Successfully")
      navigate('/admin/reviews')
      dispatch({type:DELETE_REVIEW_REST})
     }


   },[error, alert, dispatch, productId, DeleteError, isDeleted, navigate])


    const DeleteReviewHandel=(reviewId)=>{
        
       dispatch(deleteReviews(reviewId, productId))
     
    }


    const UpdateReviewHandel=(e)=>{
        e.preventDefault();
        dispatch(allReviews(productId))
    }


   const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 1 },
    {
        field: "user", headerName: "User Name", minWidth: 200, flex: 0.3,
    
    },
    { field: "rating", headerName: "Rating", type: "number", minWidth: 150, flex: 0.3,
     cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },
    { field: "comment", headerName: "Comment", type: "number", minWidth: 370, flex: 0.5 },
    {
        field: "action",
        headerName: "Action",
        minWidth: 150,
        type: "number",
        sortTable: false,
        renderCell: (params) => {
            return (
               <>
              
                <Button onClick={()=>DeleteReviewHandel(params.getValue(params.id, "id"))}>
                  <DeleteIcon/>
                </Button>
               </>
            )
        }


    }
]


const rows = []

reviews && reviews.forEach((item, index) => {
    rows.push({
      id: item._id,
      rating: item.rating,
      comment: item.comment,
      user: item.name,
    })
});




  return (
    <>
      <MetaData title={`all Reviews - Admin`} />
      <div className="dashborad">
        <SideBar/>
        <div className="dashboradContainer">

        <Container>

           <form  className='CreateProductForm' onSubmit={UpdateReviewHandel}>
                <h2>All Reviews</h2>
                <div>
                    <ReviewsIcon/>
                    <input type="text" value={productId} 
                    placeholder="Enter ProductId"
                     onChange={(e)=>setProductId(e.target.value) }   />

                </div>
    
                <button 
                type="submit"   
                 disabled={
                     loading ? true : false || productId === "" ? true : false
                  }>
                    Search</button>
               </form>



             {
                reviews && reviews.length > 0 ? (
                    <div className='TablePage' >

                    <DataGrid
                     rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    autoHeight
                   className='TableGrid'
                  />
                     </div>
                ) :  ( <h1 className="productReviewsFormHeading">No Reviews Found <SentimentVeryDissatisfiedIcon/> </h1>)
             }
       </Container>

        </div>
      </div>

    </>
  )
}

export default ProductsReviews