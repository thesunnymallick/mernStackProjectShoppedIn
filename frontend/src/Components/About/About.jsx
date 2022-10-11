import React from 'react'
import Aboutjpg from "../../assets/About.jpg"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import MetaData from '../layouts/MetaData';
function About() {
  return (
    <>
    <MetaData title={`About -ShoppedIn`}/>
      <div className="Aboutpage">
          <h1>About Us</h1>
         <div className="Aboutus">
         <div>
          <img src={Aboutjpg} alt="About Us" />
           <h2>Founder Of Sunny Mallick</h2>
        </div>

        <div>
          <p>Every day, more than 1 million user visit our Shopped In website around the world.
             And they do so because our website are known  very fast, ease to use, and affordable product. Founded in 2022,</p>
             <div>
             <a href="https://www.linkedin.com/in/thesunnymallick/" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon/></a>
            <a href="https://www.instagram.com/themallicksunny/" target="_blank" rel="noopener noreferrer">
            <InstagramIcon/></a>
             </div>
        </div>
         </div>
      </div>
    </>
  )
}

export default About