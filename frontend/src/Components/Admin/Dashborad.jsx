import React from 'react'
import { Link } from 'react-router-dom'
import SideBar from './SideBar'
import { Doughnut, Line} from 'react-chartjs-2'
import{ useDispatch, useSelector} from "react-redux"
import {getAdminProducts} from "../../action/productAction"
import { useEffect } from 'react'
import { allOrders } from '../../action/orderAction'
import { allUsers } from '../../action/userAction'
import MetaData from '../layouts/MetaData'
function Dashborad() {

  const dispatch=useDispatch()

  const {products } = useSelector((state) => state.products)
  const {orders}=useSelector((state)=>state.allOrders)

  const {users}=useSelector((state)=>state.allUsers)

  let TotalAmmount=0;
 orders&& Array.from(orders).forEach((order)=>{
    TotalAmmount+=order.totalPrice;
  })



   let outOfStock=0;
   products &&  Array.from(products).map((item)=>{
    if(item.stock===0)
    {
        outOfStock=outOfStock+1
    }
   })
   
    
    useEffect(()=>{
      
      dispatch(getAdminProducts())
      dispatch(allOrders())
      dispatch(allUsers())
    }, [dispatch])


    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, TotalAmmount],
          },
        ],
      };

      
    const doughnutState = {
        labels: ["OutOfStock", "InStock"],
        datasets: [
          {
            backgroundColor: ["#FF577F", "#4caf50"],
            hoverBackgroundColor: ["#E5707E","#205b22"],
            data: [outOfStock, products.length-outOfStock],
          },
        ],
      };




  return (
    <>
    <MetaData title={`Dashborad -ShoppedIn`}/>
     <div className="dashborad">
        <SideBar/>
        <div className="dashboradContainer">
          
          <h2>Dashborad</h2>

          <div className="totalAmount">
            <p>Total Ammount</p>
             <p>₹ {TotalAmmount}</p>
          </div>
          <div className='dashboradBox'>
            <Link to="/admin/products">
              <p>Products</p>
               <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
               <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
               <p>{users && users.length}</p>
            </Link>
          </div>

           <div className='graph-chart'>
           <div className="lineChart">
          <Line data={lineState}/>
          </div>
          <div className="doughnutChart">
         <Doughnut data={doughnutState}/>
          </div>
           </div>
        </div>


     </div>
    
    </>
    
    
  )
}

export default Dashborad