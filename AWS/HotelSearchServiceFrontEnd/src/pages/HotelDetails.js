
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import HotelTopBar from '../components/hotel/HotelTopBar';
import ImgSlider from '../components/hotel/HotelImages';
import HotelDescription from '../components/hotel/HotelDescription';

import HotelFacilites from '../components/hotel/HotelFacilities';
import { useParams } from 'react-router-dom';
import MainReview from '../components/hotel/MainReview';
const HotelDetails = () => {
    const params = useParams();
    
    
    const { hotelId,hotelName } = params;  
    
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


    }, []);
 
   
    return <Box sx={{ flexGrow: 1 }}>
     
         
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <HotelTopBar name={hotelName} hotelId={hotelId}/>
            </Grid>
            <Grid item xs={12}>
                <Grid item xs={3} spacing={2} >
                    <ImgSlider hotelId={hotelId} />
                </Grid>
            </Grid>
            <Grid item xs={12} sm={8} container direction="column" >
                <Grid item ><HotelDescription hotelId={hotelId}  /></Grid>
                <Grid item ><HotelFacilites hotelId={hotelId}  /></Grid>
            </Grid>
            <Grid item xs={12} sm={4}><MainReview  hotelId={hotelId}/></Grid>

        </Grid>

    </Box>

}

export default HotelDetails;