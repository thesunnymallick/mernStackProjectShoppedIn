import React, { useEffect } from 'react'
import{ useDispatch, useSelector} from "react-redux"
import { DataGrid } from '@mui/x-data-grid'
import { useAlert } from "react-alert"
import {Link, useNavigate} from "react-router-dom"
import MetaData from "../layouts/MetaData"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import SideBar from './SideBar' 

import { allOrders, deleteOrder, clearErros } from '../../action/orderAction'
import { DELETE_ORDER_REST } from '../../constants/orderConstants'

function OrderList() {
   const dispatch=useDispatch();
   const alert = useAlert();
   const navigate=useNavigate()

     const { error:DeleteError, isDeleted } = useSelector((state) => state.order)

       const {orders, error}=useSelector((state)=>state.allOrders)
    


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
      alert.success("order Delete Successfully")
      navigate('/admin/dashborad')
      dispatch({type:DELETE_ORDER_REST})
     }
 
     dispatch(allOrders())

   },[error, alert, dispatch, isDeleted, DeleteError, navigate])


    const DeleteOrderHandel=(id)=>{

      dispatch(deleteOrder(id))
    }


   const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
        field: "status", headerName: "Status", minWidth: 150, flex: 0.3,
        cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor"
        },
    },
    { field: "itemsQty", headerName: "Iteams Qty", type: "number", minWidth: 150, flex: 0.5 },
    { field: "amount", headerName: "Amount", type: "number", minWidth: 270, flex: 0.5 },
    {
        field: "action",
        headerName: "Action",
        minWidth: 150,
        type: "number",
        sortTable: false,
        renderCell: (params) => {
            return (
               <>
                <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                 <EditIcon/>
                </Link>
                <Button onClick={()=>DeleteOrderHandel(params.getValue(params.id, "id"))}>
                  <DeleteIcon/>
                </Button>
               </>
            )
        }


    }
]


const rows = []

orders && Array.from(orders).forEach((item, index) => {
    rows.push({
      id: item._id,
      itemsQty: item.orderItems.length,
      status: item.orderStatus,
      amount: item.totalPrice
    })
});




  return (
    <>
      <MetaData title={`All Orders - Admin`} />

      <div className="dashborad">
        <SideBar/>
        <div className="dashboradContainer">
        <h2>All Orders</h2>
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

export default OrderList