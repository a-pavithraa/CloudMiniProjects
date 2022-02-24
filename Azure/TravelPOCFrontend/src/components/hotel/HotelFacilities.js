import {  Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState,useContext,useEffect, useCallback } from 'react';
import { HOTEL_SERVICE_URL } from '../../util/Constants';
import { NormalParagraph } from '../ui/Themes';
import AuthContext from '../../store/auth-context';
import { checkArray,delay } from '../../util/UtilFunctions';

const Facilities = styled('div')(({ theme }) => ({
    display: 'flex', marginLeft: "20px", color: 'white', borderRadius: "10px", boxShadow: 'inset 0px 15px 30px rgba(0, 16, 38, 0.5)'

}));

const TitleText = styled('div')`
  font-family: BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size: 16px;
    font-weight: 700;
    line-height: 14px;
    margin:0;
  `

const OuterListItem = styled('div')`
  margin: 0;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  `;

const ListItem = styled('div')`
  -webkit-box-flex: 1;
  -ms-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  font-size:14px;
  box-sizing: border-box
  `

const HotelFacilityItem = (props) => {


    return <React.Fragment>
        <TitleText>
            {props.title}
        </TitleText>
        <ul>
            {
                props.items.map(item => <li>
                    <OuterListItem>
                        <ListItem>{item}</ListItem>
                    </OuterListItem>
                </li>)
            }

        </ul>
    </React.Fragment>

}
const HotelFacilites = (props) => {
    const authCtx = useContext(AuthContext);
    const [hotelFacility, setHotelFacility] = useState(null);
    const getHotelFacilties = useCallback(async()=>{
          //rapid api throws error for more that 3 requests in a second.. so adding delay here
          delay(3000);
          const response = await fetch(HOTEL_SERVICE_URL + 'HotelFacilities?locale=en-gb&hotelId=' + props.hotelId, authCtx.reqHeader);
          if (!response.ok) {
             // alert('Could not fetch details!');
             setHotelFacility([]);
  
          }
          const facility = await response.json();
          setHotelFacility(facility);

    },[props.hotelId,authCtx]);
    useEffect( () => {
        getHotelFacilties();


    }, [getHotelFacilties]);
    let facilities = '';
    if (checkArray(hotelFacility)) {
        let resultantMap = hotelFacility.reduce(function (map, obj) {
            let key = obj.facilitytype_name
            let values = [];
            if (map[key]) {
                values = map[obj.facilitytype_name];

            }
            else {
                map[key] = values;

            }
            values.push(obj.facility_name)
            return map;
        }, {});
       
        facilities = Object.entries(resultantMap).map(obj => <Grid item xs={12} sm={4} key={obj[0]}>
            <HotelFacilityItem title={obj[0]} items={obj[1]} />

        </Grid>)

    }
 



    return <React.Fragment>
        <NormalParagraph>
            <Grid container spacing={2}>   {facilities}</Grid>
        </NormalParagraph>

    </React.Fragment>


}

export default HotelFacilites;