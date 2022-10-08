import React from 'react'
import { Rating } from "@material-ui/lab";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ReviewCard({review}) {

    const options = {
        value: review.rating,
        readOnly: true,
        precision: 0.5,
      };
  return (
    <div className="reviewCard">
    <AccountCircleIcon/>
    <p>{review.name}</p>
    <Rating {...options} />
    <span className="reviewCardComment">{review.comment}</span>
  </div>
  )
}

export default ReviewCard