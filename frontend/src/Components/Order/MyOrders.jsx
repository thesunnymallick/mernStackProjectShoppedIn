import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert"
import { myOrders, clearErros } from "../../action/orderAction"
import { Link} from "react-router-dom"
import Typography from '@mui/material/Typography';
import MetaData from "../layouts/MetaData"

import Container from '@mui/material/Container';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Loader from "../layouts/Loader"

function MyOrders() {

    const alert = useAlert();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user)
    const { error, loading, orders } = useSelector((state) => state.myOrders)




    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
        {
            field: "status", headerName: "Status", minWidth: 150, flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor"
            },
        },
        { field: "itemsQty", headerName: "Iteams Qty", type: "number", minWidth: 150, flex: 0.3 },
        { field: "amount", headerName: "Amount", type: "number", minWidth: 270, flex: 0.5 },
        {
            field: "action",
            headerName: "Action",
            minWidth: 150,
            type: "number",
            sortTable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <VisibilityIcon />
                    </Link>
                )
            }


        }
    ]
    const rows = []

    orders && orders.forEach((item, index) => {
        rows.push({
            itemsQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice
        })
    });

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErros());
        }
        dispatch(myOrders())
    }, [error, alert, dispatch])


    return (
        <>
            <MetaData title={`${user.name} Orders - Shopped In`} />
            {
                loading ? <Loader /> : (
                    <>
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
                                <Typography id="headingMyOrders"> {user.name}'s orders </Typography>
                            </div>
                        </Container>
                    </>
                )
            }




        </>
    )
}

export default MyOrders