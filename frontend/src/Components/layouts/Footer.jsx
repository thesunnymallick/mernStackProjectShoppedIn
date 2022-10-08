import React from 'react'
import { Link } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import logo from '../../assets/logo.png'
function Footer() {
  return (
   
    <>
    <section className='footerSection'>
        <div className="container">
            <div className="footerMain">
                <div className="footerContent">
                 <div className='content'>
                 <span>
                    <p ><img src={logo} alt="" /></p>
                    <p style={{marginRight:"9px"}}>Shooped In</p>
                
                 </span>
                 <div style={
                  {
                    padding:"1rem 0rem"
                  }
                 }>
                    <p>Trusted by more than 1 Crore Indians
                      Cash on Delivery | Free Delivery</p>

                       <div className="socialLink">
                        <a href="https://www.linkedin.com/in/thesunnymallick/" target="_blank"  rel="noopener noreferrer"><LinkedInIcon/></a>
                        <a  sx={{mt:2}}href="https://github.com/thesunnymallick" target="_blank" rel="noopener noreferrer"><GitHubIcon/></a>
                        <a href="https://www.facebook.com/thesunnymallick" target="_blank" rel="noopener noreferrer"><FacebookIcon/></a>
                        <a href="https://www.instagram.com/themallicksunny/" target="_blank" rel="noopener noreferrer"><InstagramIcon/></a>
                     </div>

                 </div>
                 </div>
                 <div className='content'>
                   <span><h6>Useful Links</h6></span>
                 <div style={{marginTop:"1rem"}}>
                  <Link to="/">Home</Link>
                  <Link to="/about">About</Link>
                  <Link to="/contact">Contact</Link>
                  <Link to="/cart">Cart</Link>

                 </div>
                 </div>
                 <div className='content'>
                   <span><h6>Contact Us</h6></span>
                 <div >
                  <p  style={{padding:"1rem 0rem", marginTop:"1rem"}}>Address: Vill:Chandai  PO: Perabera PS:Borjora Dist:Bankura </p>
                  <p style={{paddingBottom:"0.40rem"}}>91+ 6297179586</p>
                  <p style={{paddingBottom:"0.40rem"}}>alfesunnymallick800@gmail.com</p>

                 </div>
                 </div>

                 <div className='content'>
                   <span style={{paddingBottom:"1.40rem"}}><h6>Email Me!</h6></span>
                 <div >
                   <p style={{padding:"1rem 0rem", marginTop:"1rem"}}>If you have any Query You can mail us.</p>
                    
                    <div className='emailUs'>
                    <a href="mailto:alfesunnymallick800@gmail.com" rel="noopener noreferrer">
                       Email us
                      <EmailIcon/>
                    
                    </a>
                   
                   
                    </div>
                  
                 </div>
                 </div>
                


                </div>
            </div>
           
        </div>
    </section>

    <footer className='footer'>
          <div className="container " >
                <div> Terms of use | privacy Environmental Policy</div>
                 <div>copyright &copy; 2022 Shooped In founder By Sunny mallick || All rights reserved</div>
                 </div>
    </footer>
    </>
  )
}

export default Footer