import React, { useContext, useEffect, useState } from 'react';

import { Box, Button, Card, Grid,  Typography } from '@mui/material';



import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../../store/auth-context';
import { HOTEL_SERVICE_URL } from '../../util/Constants';
import { fetchBookmarkHotel } from '../../store/travelservice-actions';
import { useNavigate } from 'react-router-dom';

const FavoriteHotels = (props) => {

  const bookmarkedProps = useSelector((state) => state.travelService.bookmarkedProperties);
  const navigate=useNavigate();
  const [hotelDetails,setHotelDetails]=useState([]);
  const authCtx=useContext(AuthContext);
  const dispatch=useDispatch();
  function clickHandler(hotelId,hoteName) {
    navigate(`/hotelDetails/${hotelId}/${hoteName}`);

  }
  useEffect(()=>{
    console.log('userName===='+authCtx.userName);
    dispatch(fetchBookmarkHotel(authCtx.reqHeader,authCtx.userName));

  },[]);

  const fetchHotelDetails = async()=>{
    const tempDetails=[];   
    const allPromises =await bookmarkedProps.hotelsList.map(async el=>{

      const response = await fetch(HOTEL_SERVICE_URL+'HotelData?locale=en-gb&hotelId='+el.hotelId, authCtx.reqHeader);
      if (!response.ok) {
        alert('Could not fetch suggestions!');
  
      } 
      const hotelData = await response.json();
      tempDetails.push(hotelData);
    });
    await Promise.all(allPromises)
    setHotelDetails(tempDetails);
   
 
  }
  

  useEffect(()=>{
     
   
   
    if(bookmarkedProps !==undefined && bookmarkedProps.hotelsList!==undefined){
      fetchHotelDetails();     
    
    };
  
    
   
  },[bookmarkedProps]);
 
  
  return <Grid item xs={12} sm container sx={{ marginLeft: "20px", marginBottom: "10px" }}>
    {hotelDetails && hotelDetails.map(result => (<Grid item xs={12} sm={4} spacing={3}><Card sx={{ maxWidth: 345, marginBottom: "10px" }}>
      <CardMedia
        component="img"
        height="160"
        image={result.entrance_photo_url}

      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {result.name}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.primary">
          {result.city},{result.country}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {result.address}
        </Typography>


        <Typography gutterBottom variant="body2" color="text.secondary">
          <Button aria-label="delete" size="small" color="primary" variant="contained" sx={{ marginTop: "15px" }}>
            {result.review_score}
          </Button>

        </Typography>

        <Typography variant="body2" gutterBottom>{authCtx.currency} {result.maxrate.format()} </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="success" onClick={()=>clickHandler(result.hotel_id,result.name)}>View</Button>

      </CardActions>
    </Card></Grid>)

    )
    }

  </Grid>

}

export default FavoriteHotels;