import React from 'react'
import EmailIcon from '@mui/icons-material/Email';
import MetaData from '../layouts/MetaData';
function Contact() {
  return (
    <>
    <MetaData title={`Contact -ShoppedIn`}/>
      <div className="conatctUs">
      <a href="mailto:alfesunnymallick800@gmail.com" rel="noopener noreferrer">
      <EmailIcon/>alfesunnymallick800@gmail.com</a>
      </div>
    </>
  )
}

export default Contact