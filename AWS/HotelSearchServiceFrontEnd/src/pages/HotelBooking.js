import React, { useCallback, useContext } from 'react';


import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SearchBar from '../components/search/HotelSearch';
import HotelList from '../components/hotel/HotelList';
import AuthContext from '../store/auth-context';
import { fetchHotels } from '../store/travelservice-actions';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import getSymbolFromCurrency from 'currency-symbol-map'
import { checkArray } from '../util/UtilFunctions';
const HotelBooking = () => {

  const authCtx = useContext(AuthContext);
  const searchValues = useSelector((state) => state.travelService.hotelSearchCriteria);
  const [page, setPage] = React.useState(1);
  const hotelsList = useSelector((state) => state.travelService.hotelsList);
  const progressBar = useSelector((state) => state.travelService.progress);
  const dispatch = useDispatch();
  const currencyCode = getSymbolFromCurrency(authCtx.currency);
  let details = '';
  const handleChange = (event, value) => {

    setPage(value);
    searchResults(searchValues.id, searchValues.fromDate, searchValues.toDate, value);

  };

  const searchResults = useCallback((location, fromDate, toDate, page) => {
    const urlParams = {
      room_number: '1',
      order_by: 'popularity',
      filter_by_currency: authCtx.currency,
      checkout_date: toDate,
      checkin_date: fromDate,
      units: 'metric',
      adults_number: '2',
      dest_id: location,
      dest_type: 'city',
      locale: 'en-gb',
      page_number: page

    }

    if (authCtx.reqHeader !== null && authCtx.reqHeader !== undefined) {

      dispatch(fetchHotels(authCtx.reqHeader, urlParams));
    }


  })
  if (hotelsList && checkArray(hotelsList.result))
    details = <React.Fragment>

      <Stack spacing={3} >
        <Pagination
          count={(Math.floor(hotelsList.count / 25))}
          color="primary"
          page={page} onChange={handleChange}
          sx={{
            justifyContent: "right",
            display: 'flex'
          }}

        />
      </Stack>
      <HotelList resultList={hotelsList.result} currencyCode={currencyCode} />
    </React.Fragment>
  return <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SearchBar onSearch={searchResults} onSearch={searchResults} />
      </Grid>
      <Grid item xs={12}>
        {progressBar && <CircularProgress color="success" sx={{
          justifyContent: "center", width: "100%", margin: "auto",
          display: 'flex'
        }} />}
        {!progressBar && details}


      </Grid>
    </Grid>
  </Box>

}

export default HotelBooking;