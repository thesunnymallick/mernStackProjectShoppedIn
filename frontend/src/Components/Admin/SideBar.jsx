import React from 'react'
import logo from "../../assets/logo.png"
import { Link } from "react-router-dom"
import { TreeItem, TreeView } from '@mui/lab'
import PostAddIcon from '@mui/icons-material/PostAdd';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import RateReviewIcon from '@mui/icons-material/RateReview';
import GroupIcon from '@mui/icons-material/Group';


//"react-chartjs-2": "^3.0.4",
//"chart.js": "^ ",

function SideBar() {
  return (
    <div className="sidebar">

      <Link to='/'>
        <p>
          <img src={logo} alt="ShoppedIn" /> Shopped In
        </p>
      </Link>

    <Link to="/admin/dashborad">
    <p>
      <DashboardIcon/> Dashborad
    </p>
    </Link>

      <TreeView
        aria-label="multi-select"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        multiSelect
       
      >
            <TreeItem nodeId="1" label="Products">
            <Link to='/admin/products'>
            <TreeItem nodeId="2" label="All" icon={<PostAddIcon/>} />
            </Link>

            <Link to='/admin/product'>
            <TreeItem nodeId="2" label="Create" icon={<CreateNewFolderIcon/>} />
            </Link>
        
     

            </TreeItem>

      </TreeView>

    <Link to="/admin/users">
    <p>
     <GroupIcon/> users
    </p>
    </Link>

    <Link to="/admin/orders">
    <p>
    <ListAltIcon/> Orders
    </p>
    </Link>
    <Link to="/admin/reviews">
    <p>
     <RateReviewIcon/> Reviews
    </p>
    </Link>


    </div>
  )
}

export default SideBar