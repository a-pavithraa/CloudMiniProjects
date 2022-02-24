import React from 'react';
import { ResultDiv } from '../ui/Themes';
import { Grid, Typography } from '@mui/material';


const HotelReviews = (props)=>{
 
    return props.reviews.map(review=>{ return (<ResultDiv key={props.title}>
          <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={3}>
            <Grid item xs spacing={2}>
              <Typography gutterBottom variant="h6" component="div">
              {review.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {review.author.name} reviewed this on {review.date}
              </Typography>
             
            </Grid>
            <Grid item xs spacing={4}>
            <Typography variant="body2" gutterBottom><span className="underlinedBoldText">Pros:</span> {review.pros}</Typography>
            </Grid>
            <Grid item xs spacing={4}>
            <Typography variant="body2" gutterBottom><span className="underlinedBoldText">Cons:</span> {review.cons}</Typography>
            </Grid>

            {props.showMoreReviews && <Grid item xs spacing={4}>
            <Typography variant="body2" gutterBottom sx={{float:"right"}}><a href="#" className='link' onClick={props.onOpen}>View More Reviews</a></Typography>
            </Grid>}
           
          </Grid>
          </Grid>
          </ResultDiv>)
})
  
}

export default HotelReviews;