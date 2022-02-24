import React from 'react';
import { styled } from '@mui/material/styles';
import {  Button,  Grid,  Typography } from '@mui/material';
import parse from 'html-react-parser';
import { ResultDiv } from '../ui/Themes';
import { useNavigate } from 'react-router-dom';


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '280px',
});

const ScoringDiv = styled('div')({
  alignItems: "center",
  background: "#003580",
  borderRadius: "5.8181818182px 5.8181818182px 5.8181818182px 0",
  color: "#fff",
  display: "-ms-flexbox",
  display: "flex",
  height: "32px",
  justifyContent: "center",
  minWidth: "32px",
  verticalAlign: "baseline",
  width: "32px"
});

const HotelList = (props) => {
  const navigate = useNavigate();
  function clickHandler(hotelId,hoteName) {
    navigate(`/hotelDetails/${hotelId}/${hoteName}`);

  }
  const results = props.resultList.map(result => {
    return <ResultDiv key={result.hotel_id}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Img src={result.max_photo_url} alt="" />


        </Grid>
        <Grid item xs={12} sm container sx={{marginLeft:"8px"}}> 
          <Grid item xs container direction="column" spacing={3}>
            <Grid item xs spacing={10}>
              <Typography gutterBottom variant="h6" component="div">
                {result.hotel_name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {result.city_name_en} -  {result.distances[0].text}
              </Typography>
              <Typography variant="body2" >
                {parse(result.unit_configuration_label)}
              </Typography>
            </Grid>
            <Grid item xs spacing={4}>
              <Typography variant="body2" gutterBottom>{props.currencyCode} {result.composite_price_breakdown.all_inclusive_amount.value.format()}</Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={() => clickHandler(result.hotel_id,result.hotel_name)}>View Details</Button>
            </Grid>
          </Grid>

          <Grid item>
            <span className='smallFont' sx={{ paddingRight: "8px" }}>
              {result.review_score_word}&nbsp;
            </span>
          </Grid>


          <Grid item>

            <Typography variant="subtitle1" component="div">
              <ScoringDiv>{result.review_score}</ScoringDiv>
            </Typography>
          </Grid>
        </Grid>
      </Grid>

    </ResultDiv>
  })
  return <React.Fragment>
    {results}
  </React.Fragment>

}

export default HotelList;
