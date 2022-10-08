import React from 'react'
import Typography from '@mui/material/Typography';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
function CheckStep({activeStep}) {
const steps=[
    { label:<Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon/>
    },
    { label:<Typography>Confirm Order</Typography>,
     icon: <LibraryAddCheckIcon/>
    },
   { label:<Typography>Payment</Typography>,
   icon: <AccountBalanceIcon/>
   },
]

const stepStyles={
    boxSizing:"border-box"
}

  return (
     <Stepper sx={{marginTop:"1rem"}} activeStep={activeStep} alternativeLabel style={stepStyles}>
        {
            steps.map((item,index)=>(
             <Step key={index}
             active={activeStep === index ? true : false}
             completed={activeStep >= index ? true : false}
             >
             <StepLabel
               style={{
                color: activeStep >= index ? "#4caf50" : "#3f3f3f",
              }}
              icon={item.icon}>{item.label}</StepLabel>
             </Step>
            ))
        }
     </Stepper>
  )
}

export default CheckStep