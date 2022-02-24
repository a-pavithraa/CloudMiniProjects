
import React,{useEffect,useContext,useState, useCallback} from 'react';
import { NormalParagraph } from '../ui/Themes';
import AuthContext from '../../store/auth-context';
import { HOTEL_SERVICE_URL } from '../../util/Constants';

const HotelDescription =(props)=>{
    const authCtx = useContext(AuthContext);
    const [hotelDescription,setHotelDescription]=useState(null);
    const getHotelDescription=useCallback(async()=>{
      const response = await fetch(HOTEL_SERVICE_URL+'HotelDescription?locale=en-gb&hotelId='+props.hotelId, authCtx.reqHeader);
      if (!response.ok) {
       // alert('Could not fetch details!');
       setHotelDescription();
  
      } 
      const description = await response.json();  
      setHotelDescription(description);


    }, [props.hotelId]);
    useEffect(()=>{
      getHotelDescription();
    }, [getHotelDescription]);
  
  
    return <React.Fragment>       
           {hotelDescription && <NormalParagraph>          
          {hotelDescription.description}<br/>
          {hotelDescription.extra_lines && hotelDescription.extra_lines.imp_info}
      </NormalParagraph>}
    </React.Fragment>

}

export default HotelDescription;