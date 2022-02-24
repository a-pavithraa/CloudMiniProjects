import React, { useContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';

import CardContent from '@mui/material/CardContent';

import { styled } from '@mui/material/styles';
import { StyledCard } from '../ui/Themes';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';
import AuthContext from '../../store/auth-context';
import { useDispatch, useSelector } from 'react-redux';
import { postBookmarkHotel } from '../../store/travelservice-actions';

const HotelTopBar = (props) => {    
  const dispatch = useDispatch();
  const bookmarkedProps = useSelector((state) => state.travelService.bookmarkedProperties);
  const authCtx=useContext(AuthContext);
  const [isFavorite,setFavorite]=useState(false);
  useEffect(()=>{
   
    if(bookmarkedProps && bookmarkedProps.hotelsList){
      const elem=bookmarkedProps.hotelsList.find(x=>x.hotelId===props.hotelId);
      if(elem!==undefined)
      setFavorite(true);
    }
   

  },[])
   
    const addToFavHandler = ()=>{
      if(authCtx.isLoggedIn){
      
          if (authCtx.reqHeader !== null && authCtx.reqHeader !== undefined) {

            dispatch(postBookmarkHotel(authCtx.reqHeader, authCtx.userName,props.hotelId));
          }
      }else{
        alert('Please login');
      }
      
    }
    return (<StyledCard >
      <Box sx={{ display: 'flex'}}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6">
            {props.name}
          </Typography>
       
  
        </CardContent>
    <CardContent><span className='rightAlign'> {isFavorite?<FavoriteIcon fontSize="large" sx={{ color: pink[500] }}/>:<FavoriteBorderIcon fontSize="large" sx={{ color: pink[500] }} onClick={addToFavHandler}/>}</span>  </CardContent>
        </Box>
        </StyledCard>);
}

export default HotelTopBar;