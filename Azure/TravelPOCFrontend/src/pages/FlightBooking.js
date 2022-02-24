import React,{useCallback, useContext, useEffect,useState} from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import BookingDetails from '../components/booking/BookingDetails';
import FlightSearch from '../components/search/FlightSearch';
import AuthContext from '../store/auth-context';

import { fetchSearchedFlights, fetchTopFlights } from '../store/travelservice-actions';
import { checkArray } from '../util/UtilFunctions';
import { useDispatch, useSelector } from 'react-redux';
import getSymbolFromCurrency from 'currency-symbol-map'
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(3),
    marginLeft: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
const FlightBooking = ()=>{
  const topFlightsList = useSelector((state) => state.travelService.topFlightsList);
  const searchedFlightsList = useSelector((state) => state.travelService.searchedFlightsList);
  const [searchInvoked,setSearchInvoked]=useState(false);
  //const progressBar = useSelector((state) => state.travelService.progress);
  const authCtx=useContext(AuthContext);
  const currencyCode =getSymbolFromCurrency(authCtx.currency);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchTopFlights(authCtx.reqHeader, authCtx.location.city,authCtx.currency));

  },[]);
  const searchFlights = useCallback((searchParams)=>{
    
    if (authCtx.reqHeader !== null && authCtx.reqHeader !== undefined){
     
      dispatch(fetchSearchedFlights(authCtx.reqHeader, searchParams));
    }
    setSearchInvoked(true);
     
    
  })
return (
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2}>
      <Grid item xs={11}>
       <FlightSearch onSearch={searchFlights}/>
      </Grid>
     
      <Grid item xs={11} md={6}>
      {checkArray(topFlightsList) && <BookingDetails title="Popular Routes" result={topFlightsList} currencyCode={currencyCode} />}
      </Grid>
      <Grid item xs={11} md={6}>        
      {searchInvoked && <BookingDetails title="Cheapest Flights" result={searchedFlightsList} currencyCode={currencyCode} />}
      </Grid>
    </Grid>
  </Box>
)
}

export default FlightBooking;