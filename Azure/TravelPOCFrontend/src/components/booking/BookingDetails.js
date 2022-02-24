import React from 'react';

import Typography from '@mui/material/Typography';
import { ResultDiv, StyledCard } from '../ui/Themes';
import { Divider, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import dateFormat, { masks } from "dateformat";
import { checkArray } from '../../util/UtilFunctions';

const RouteLine = styled(Divider)(({ theme }) => ({
  marginTop: theme.spacing(5), borderColor: theme.palette.primary.dark

}));
const VerticalLine = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.primary.light

}));


const BookingDetails = (props) => {

  const valuesArr = Object.values(props.result).slice(0, 10);

  return <Grid container spacing={2} sx={12} md={12}>
    <Grid item xs={12} >
      <Typography component="div" variant="h5" sx={{ marginLeft: "20px", marginTop: "10px" }}>
        {props.title}
      </Typography>

    </Grid>
    <Grid item xs={12}>
     { !checkArray(valuesArr) && <ResultDiv><Typography>No Records found</Typography></ResultDiv>}
     {checkArray(valuesArr) && valuesArr.map(res => {
        return (<ResultDiv key={res.flight_number}>
          <Grid item sm container>
            <Grid item md={8} container direction="row" spacing={4}>
              <Grid item direction="column">
                <Grid item xs spacing={2}>
                  <Typography variant="body1" gutterBottom><b>{dateFormat(res.departure_at, 'dd/mmm/yyyy')}</b></Typography>
                </Grid>
                <Grid item xs spacing={2}>
                  <Typography variant="body1" gutterBottom><b>{dateFormat(res.departure_at, 'h:MM:ss TT')}</b></Typography>
                </Grid>
                <Grid item xs spacing={2}>
                  <Typography variant="body2" gutterBottom>{res.origin}</Typography>
                </Grid>

              </Grid>
              <Grid item xs md={4} spacing={2}>
                <RouteLine />
              </Grid>

              <Grid item direction="column" >
                <Grid item xs spacing={2}>
                  <Typography variant="body1" gutterBottom><b>{dateFormat(res.return_at, 'dd/mmm/yyyy')}</b></Typography>
                </Grid>
                <Grid item xs spacing={2}>
                  <Typography variant="body1" gutterBottom><b>{dateFormat(res.return_at, 'h:MM:ss TT')}</b></Typography>
                </Grid>
                <Grid item xs spacing={2}>
                  <Typography variant="body2" gutterBottom>{res.destination}</Typography>
                </Grid>

              </Grid>
            </Grid>

            <Grid item direction="column" sx={{ borderLeft: "1px solid white", paddingLeft: "10px" }}>
              <Grid item xs spacing={2}>
                <Typography variant="body2" gutterBottom>{res.airline} - {res.flight_number}</Typography>
              </Grid>
              <Grid item xs spacing={2}>
                <Typography variant="body2" gutterBottom>{props.currencyCode} {res.price.format()}</Typography>
              </Grid>
            </Grid>
          </Grid>

        </ResultDiv>);
      })}


    </Grid>
  </Grid>
}

export default BookingDetails;