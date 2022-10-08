
import React from 'react'
import { Link } from 'react-router-dom'
import EmptyCartImage from "../../assets/empty-cart.png"
import MetaData from '../layouts/MetaData'


function EmptyCart() {
  return (
   <>
 
      <MetaData title={`EmptyCart -ShoppedIn`}/>
     <section className='EmptyCart'>
        <div className="container">
            <p>you probably  haven't ordered a product yet <br /> to order a product go to the main page
            
            </p>
            <img src={EmptyCartImage} alt="EmptyCart" />
           <Link to='/'>Go Back</Link>

        </div>
     </section>
     </>
  )
}

export default EmptyCart