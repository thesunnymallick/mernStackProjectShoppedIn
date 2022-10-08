import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from "react-redux"
import{useAlert} from "react-alert"
import{clearErros, getProductDetails, updateProduct} from "../../action/productAction"
import {useNavigate} from "react-router-dom"
import SideBar from './SideBar'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DescriptionIcon from '@mui/icons-material/Description';

import CategoryIcon from '@mui/icons-material/Category';
import StorageIcon from '@mui/icons-material/Storage';
import {UPDATE_PRODUCT_REST } from '../../constants/productConstants'
import {useParams} from "react-router-dom"

function UpdateProduct() {


     const alert=useAlert();
     const dispatch=useDispatch()
     const navigate=useNavigate();
     const{id}=useParams();
     const ProductId=id;

    


     const {error,product} =useSelector((state)=>state.productDetails)


     const { loading, error:UpdatedError, isUpdated}=useSelector((state)=>state.product)


       const[name, setName]=useState("");
       const[price, setPrice]=useState();
       const[description, setDescription]=useState("")
       const[category, setCategory]=useState("");
       const[stock, setStock]=useState();
       const [images, setImages] = useState([]);
       const[oldImages, setOldImages]=useState([]);
       const [imagesPreview, setImagesPreview] = useState([]);
      



     useEffect(()=>{
    
        if(product && product._id !==ProductId)
        {
            dispatch(getProductDetails(ProductId))
        }
        else{
            setName(product.name)
            setPrice(product.price)
            setDescription(product.description)
            setCategory(product.category)
            setStock(product.stock)
            setOldImages(product.images);
        }




      if(error)
      {
        alert.error(error);
        dispatch(clearErros())
      }
      if(UpdatedError)
      {
        alert.error(UpdatedError);
        dispatch(clearErros())
      }

      if(isUpdated)
      {
        alert.success("Product updated Successfuly");
        navigate('/admin/products')
        dispatch({type:UPDATE_PRODUCT_REST})
        
      }

     },[error, alert, isUpdated, UpdatedError, ProductId, product, dispatch])



       const updateProductHandel=(e)=>{
        e.preventDefault();

        const myForm=new FormData();
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);

        images.forEach((image) => {
          myForm.append("images", image);
        });
    
        dispatch(updateProduct(ProductId, myForm))

       }
      

       const createProductImagesChange=(e)=>{
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);
    
        files.forEach((file) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagesPreview((old) => [...old, reader.result]);
              setImages((old) => [...old, reader.result]);
            }
          };
    
          reader.readAsDataURL(file);
        });
       }

    const categorise=[
        "laptop",
        "Phone",
        "Tab",
        "Shirt",
        "Shoes",
        "Headphone"
      ]

  return (
    <>
      <div className="dashborad">
        <SideBar/>
        <div className="dashboradContainer">
          <div className="createProducts">
    
            <form  className='CreateProductForm' onSubmit={updateProductHandel}>
                <h2>Update Product</h2>
                <div>
                   <DriveFileRenameOutlineIcon/>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value) }  placeholder='Product Name' />

                </div>
                <div>
                  <CurrencyRupeeIcon/>
                    <input type="number" value={price} onChange={(e)=>setPrice(e.target.value) }   placeholder='Product Price'  />

                </div>
                <div>
                  <StorageIcon/>
                    <input type="number" value={stock} onChange={(e)=>setStock(e.target.value) }   placeholder='Product Stock'  />

                </div>
                <div>
                 <DescriptionIcon/>
                   <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Product Description'/>

                </div>
                <div>
                  <CategoryIcon/>
                   <select  value={category} onChange={(e)=>setCategory(e.target.value)}>
                   <option value={category}>{category}</option>
                    {
                        categorise && categorise.map((cate)=>(
                       <option key={cate} value={cate}>
                        {cate}
                       </option>
                        ))
                    }
                   </select>
                </div>
                <div id="createProductFormFile">
                 <input
                 type="file"
                 name="avatar"
                 accept="image/*"
                 onChange={createProductImagesChange}
                 multiple="multiple"
              />
                </div>
                <div id="createProductFormImage">
                   {oldImages && oldImages.map((image, index) => (
                    <img key={index} src={image.url} alt=" old Product Preview" />
                     ))}
               </div>

                <div id="createProductFormImage">
                   {imagesPreview.map((image, index) => (
                    <img key={index} src={image} alt="Product Preview" />
                     ))}
               </div>


                <button 
                disabled ={loading ? true :false}
                type="submit">update</button>
            </form>


          </div>
         




       </div>
     </div>


    </>
  )
}

export default UpdateProduct;