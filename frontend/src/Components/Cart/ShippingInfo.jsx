import React, { useState } from 'react'
import {saveShippingInfo} from "../../action/cartAction"
import { Country, State, City }  from 'country-state-city'
import {useDispatch, useSelector} from "react-redux"
import {useAlert} from "react-alert"
import{useNavigate} from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import MetaData from '../layouts/MetaData'
import CheckStep from './CheckStep'



function ShippingInfo() {

    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate()
    const{shippingInfo}=useSelector((state)=>state.cart)


    const[address ,setAddress]=useState(shippingInfo.address)
    const[city ,setCity]=useState(shippingInfo.city)
    const[state ,setState]=useState(shippingInfo.state)
    const[phoneNo ,setPhoneNo]=useState(shippingInfo.phoneNo)
    const[pinCode ,setPinCode]=useState(shippingInfo.pinCode)
    const[country ,setCountry]=useState(shippingInfo.country)


    const shippingSubmitHandel=(e)=>{
        e.preventDefault()
        if(phoneNo.length<10 || phoneNo.length>10)
        {
            alert.error("Phone Number Should be 10 dights")
            return;
        }
        dispatch(saveShippingInfo({address, phoneNo, city, state, phoneNo, pinCode, country}))
        navigate('/order/orderconfirm')
    }

  return (
    <>
    <MetaData title={"Shipping Details -Shopped In"}/>
   <CheckStep  activeStep={0}/>
    <section className='shipping-section'>
        <div className="container">
            <div className="shippingBox">
                <h2 className='shippingHeadding'>ShippingDetails</h2>
                <form onSubmit={shippingSubmitHandel} className="shoppingFrom">
                  <div>
                      <HomeIcon/>  <input type="text"  
                     required  value={address} 
                     onChange={(e)=>setAddress(e.target.value)}
                     placeholder='Address' />
                  </div>
                   
                  <div>
                     <PhoneIcon/>  <input className='number' type="number"  
                     required  value={phoneNo} 
                     onChange={(e)=>setPhoneNo(e.target.value)}
                     placeholder='Phone No' />
                  </div>

                  <div>
                     <PublicIcon/>  
                     <select required value={country} onChange={(e)=>setCountry(e.target.value)}>
                        <option value="">Country</option>
                        {
                            Country && Country.getAllCountries().map((item)=>(
                                <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                            ))
                        }
                     </select>
                  </div>

                  {
                    country &&(

                        <div>
                            <EmojiTransportationIcon/>
                            <select required value={state} onChange={(e)=>setState(e.target.value)}>
                                <option value="">State</option>
                                {
                                    State && State.getStatesOfCountry(country).map((item)=>(
                                    <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    )
                  }
                   <div>
                     <LocationCityIcon/>  <input type="text"  
                     required  value={city} 
                     onChange={(e)=>setCity(e.target.value)}
                     placeholder='City' />
                  </div>

                  <div>
                     <LocationOnIcon/><input type="text"  
                     required  value={pinCode} 
                     onChange={(e)=>setPinCode(e.target.value)}
                     placeholder='Pin Code' />
                  </div>
                  <button className='shippingBtn' type='submit'>continue</button>
                </form>
            </div>
        </div>

    </section>
    </>
  )
 
}

export default ShippingInfo