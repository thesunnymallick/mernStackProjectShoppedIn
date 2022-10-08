import React, { useEffect } from 'react'
import{ useDispatch, useSelector} from "react-redux"
import { DataGrid } from '@mui/x-data-grid'
import { useAlert } from "react-alert"
import {Link, useNavigate} from "react-router-dom"
import MetaData from "../layouts/MetaData"
import {allUsers, clearErros, deleteUser} from "../../action/userAction"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import SideBar from './SideBar' 
import { DELETE_PRODUCT_REST } from '../../constants/productConstants'
import { USER_DELETE_REST } from '../../constants/userConstants'
function UsersList() {
   const dispatch=useDispatch();
   const alert = useAlert();
   const navigate=useNavigate()
 
    const {users, error } = useSelector((state) => state.allUsers)

    const { error:DeleteError, isDeleted} = useSelector((state) => state.profile)



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
      alert.success("User Delete Successfully")
      navigate('/admin/dashborad')
      dispatch({type:USER_DELETE_REST})
     }
     dispatch(allUsers())

   },[error, alert, dispatch, DeleteError, isDeleted, navigate])


    const DeleteUserHandel=(id)=>{

       dispatch(deleteUser(id))
    }


   const columns = [
    { field: "id", headerName: "User ID", minWidth: 300, flex: 1 },
    {
        field: "name", headerName: "Name", minWidth: 250, flex: 0.3,
    
    },
    { field: "email", headerName: "Email", minWidth: 270, flex: 0.3 },
    { field: "role", headerName: "  Role", type: "number", minWidth: 160, flex: 0.5,
     cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin" ? "greenColor" : "redColor"
    },
    },
    {
        field: "action",
        headerName: "Action",
        minWidth: 150,
        type: "number",
        sortTable: false,
        renderCell: (params) => {
            return (
               <>
                <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                 <EditIcon/>
                </Link>
                <Button onClick={()=>DeleteUserHandel(params.getValue(params.id, "id"))}>
                  <DeleteIcon/>
                </Button>
               </>
            )
        }


    }
]


const rows = []

users && users.forEach((item, index) => {
    rows.push({
      id: item._id,
      name: item.name,
      role: item.role,
      email: item.email,
    })
});




  return (
    <>
      <MetaData title={`ViewUsers - Admin`} />

      <div className="dashborad">
        <SideBar/>
        <div className="dashboradContainer">
        <h2>All Users</h2>
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

export default UsersList