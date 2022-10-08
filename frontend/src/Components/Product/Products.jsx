import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getProduct, clearErros } from "../../action/productAction"
import Loader from '../layouts/Loader'
import { useAlert } from 'react-alert';
import ProductCart from '../Home/ProductCart';
import { useParams } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';
import CancelIcon from '@mui/icons-material/Cancel';
import MetaData from '../layouts/MetaData';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function Products() {
  const { keyword } = useParams();
  const dispatch = useDispatch()
  const alert=useAlert();
  const { loading, error, products, productsCount, resultPerPage } = useSelector(state => state.products)
  // console.log(products);
  const [currentpage, SetCurentpage] = useState(1)
  const [price, setPrice] = useState([0, 25000])
  const[category, setCategory]=useState("")
  const[ratings, setRatings]=useState(0)

  const SetCurentpageNo = (e, value) => {
    SetCurentpage(value)
  }
  const priceHandel = (e, newprice) => {
    setPrice(newprice);
  }
  const ratingHandel=(e, newRating)=>{
    setRatings(newRating)
  }

  useEffect(() => {
    if(error)
    {
       alert.error(error)
       dispatch(clearErros)
    }
    dispatch(getProduct(keyword, currentpage, price,category, ratings))
  }, [dispatch, keyword, currentpage, price, category, ratings, alert, error]);

  const categorise=[
    "laptop",
    "Phone",
    "Tab",
    "Shirt",
    "Shoes",
    "Headphone"
  ]

  // Daigonal

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("rgba(0,0,0)"),
    backgroundColor:"#FF577F",
    '&:hover': {
      backgroundColor: "#E5707E",
    },
  }));


  return (

    <>
      {
        loading ? <Loader /> : (<>
         
         <MetaData title={"Products - ShoopedIn"}/>
          <div className="Products-section">
            <h1 className='Title-headding'>Products</h1>

            <div className="container">
              <div className="prodcuts">
                {
                  products && products.map((product) =>
                    <ProductCart
                      key={product._id}
                      product={product}
                    />
                  )
                }
              </div>
               

             <div className='catergory'>
              <ColorButton  variant="contained" onClick={handleClickOpen}>
              Choose Cetagory
              </ColorButton>
              <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
              >
             <DialogTitle>{"Choose Category"}</DialogTitle>
             <DialogContent>
             <div className="fliterBox">
                <Typography>Price</Typography>
                <Slider
                  value={price}
                  onChange={priceHandel}
                  min={0}
                  max={25000}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-silder" />

                  <Typography>Category</Typography>
                    <ul className='categoryBox'>
                      {
                        categorise.map((category,i)=>(
                          <li 
                          className='categoryLink'
                          onClick={()=>setCategory(category.toLowerCase())}
                          key={i}>{category}</li>
                        ))
                      }
                    </ul>
                    <Typography>Ratings</Typography>
                    <Slider
                     value={ratings}
                     onChange={ratingHandel}
                     min={0}
                     max={5}
                     valueLabelDisplay="auto"
                     aria-labelledby="pretto slider" />
              </div>
             </DialogContent>
             <DialogActions>
            <Button onClick={handleClose} size="small"  
            sx={{marginBottom:"2rem"}}
            variant="contained" color="error"> Cancel <CancelIcon fontSize='small'/></Button>
            </DialogActions>
            </Dialog>
             </div>
             

              

              {
                resultPerPage < productsCount && (
                  <div className="pagination">
                    <Stack spacing={2}>
                      <Pagination
                        page={currentpage}
                        onChange={SetCurentpageNo}
                        count={productsCount} color="primary" />
                    </Stack>
                  </div>
                )
              }


            </div>

          </div>

        </>)
      }
    </>
  )
}

export default Products