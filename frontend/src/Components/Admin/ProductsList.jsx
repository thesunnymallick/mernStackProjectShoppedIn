import React, { useEffect } from 'react'
import{ useDispatch, useSelector} from "react-redux"
import { DataGrid } from '@mui/x-data-grid'
import { useAlert } from "react-alert"
import {Link, useNavigate} from "react-router-dom"
import MetaData from "../layouts/MetaData"
import {getAdminProducts, clearErros, deleteProduct} from "../../action/productAction"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import SideBar from './SideBar' 
import { DELETE_PRODUCT_REST } from '../../constants/productConstants'
function ProductsList() {
   const dispatch=useDispatch();
   const alert = useAlert();
   const navigate=useNavigate()
    const { error, products } = useSelector((state) => state.products)
    const { error:DeleteError, isDeleted } = useSelector((state) => state.product)



   useEffect(()=>{

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
      alert.success("Product Delete Successfully")
      navigate('/admin/dashborad')
      dispatch({type:DELETE_PRODUCT_REST})
     }
     dispatch(getAdminProducts())

   },[error, alert, dispatch, isDeleted, navigate])


    const DeleteProductHandel=(id)=>{

      dispatch(deleteProduct(id))
    }


   const columns = [
    { field: "id", headerName: "Product ID", minWidth: 300, flex: 1 },
    {
        field: "name", headerName: "Name", minWidth: 150, flex: 0.3,
    
    },
    { field: "stock", headerName: "Stock", type: "number", minWidth: 150, flex: 0.3 },
    { field: "price", headerName: "Price", type: "number", minWidth: 270, flex: 0.5 },
    {
        field: "action",
        headerName: "Action",
        minWidth: 150,
        type: "number",
        sortTable: false,
        renderCell: (params) => {
            return (
               <>
                <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                 <EditIcon/>
                </Link>
                <Button onClick={()=>DeleteProductHandel(params.getValue(params.id, "id"))}>
                  <DeleteIcon/>
                </Button>
               </>
            )
        }


    }
]


const rows = []

products && products.forEach((item, index) => {
    rows.push({
      id: item._id,
      stock: item.stock,
      price: item.price,
      name: item.name,
    })
});




  return (
    <>
      <MetaData title={`ViewProducts - Admin`} />

      <div className="dashborad">
        <SideBar/>
        <div className="dashboradContainer">
        <h2>All Products</h2>
        <Container>
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
       </Container>

        </div>
      </div>

    </>
  )
}

export default ProductsList