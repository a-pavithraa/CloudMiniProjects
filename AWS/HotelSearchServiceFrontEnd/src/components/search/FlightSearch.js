import  React,{useContext,useEffect,useState} from 'react';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import { StyledCard } from '../ui/Themes';
import { StyledBox } from '../ui/Themes';
import moduleClasses from './SearchComponent.module.scss';
import { IATA_SERVICE_URL,FLIGHT_SERVICE_URL } from '../../util/Constants';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, Grid } from '@mui/material';
import AuthContext from '../../store/auth-context';
import dateFormat from 'dateformat';




export default function FlightSearch(props) {
  const [value, setValue] = React.useState([null, null]);
  const [airportCodes,setAirportCodes]=useState([]);
  const [originCode,setOriginCode]=useState();
  const [destinationCode,setDestinationCode]=useState();
  const authCtx = useContext(AuthContext);
  const fromDate = dateFormat(value[0],'yyyy-mm');
  const toDate = dateFormat(value[1],'yyyy-mm');
  
 
  const searchFlights =()=>{

    if(originCode===''&& destinationCode===''){
      alert('Please enter source and destination');
      return false;
    }
    if(value[0]===''){
      alert('Please enter Date');
      return false;
    }
     const urlParams = {
     
      currency: authCtx.currency,
      origin: originCode,
      destination: destinationCode,
      return_date: toDate,
      depart_date: fromDate,      
      page_number:1
      
    }
    props.onSearch(urlParams);


  }
  async function populateAirports() {
   
      const response = await fetch(
        IATA_SERVICE_URL+'AllAirports', authCtx.reqHeader
      );
      if (!response.ok) {
       //alert('Could not fetch suggestions!');
  
      }  
      const suggestions = await response.json();     
      setAirportCodes(suggestions);

    
   
  }

  useEffect(() => {   
    populateAirports() 
  
  }, []);
 
 

  return (
    <StyledCard>
    <Box sx={{ display: 'flex', flexDirection: 'column',width: '100%' }}>
      <Grid md={12} container spacing={10}>
      
      <Grid item xs={12} md={3}>     
      <Autocomplete
      
      sx={{ width: 300 }}
      options={airportCodes}
      autoHighlight
      getOptionLabel={(option) => option.name}
      onChange={(option,value)=>{if(value)setOriginCode(value.code)}}
      renderOption={(props, option) => (
        <Box component="li" {...props} >
          
          {option.name} ({option.code}) 
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="From"
          className={moduleClasses.inputSpacing}
          variant="standard"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
    </Grid>

    <Grid item xs={12} md={3}>     
    <Autocomplete
      
      sx={{ width: 300 }}
      options={airportCodes}
      autoHighlight
      getOptionLabel={(option) => option.cityName+' '+option.name}
      onChange={(option,value)=>{if(value)setDestinationCode(value.code)}}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          
        {option.cityName}  {option.name} ({option.code}) 
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="To"
          className={moduleClasses.inputSpacing}
          variant="standard"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
    </Grid>
    <Grid item xs={12} md={3}>
    
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="From"
        endText="To"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} variant="standard" className={moduleClasses.inputSpacing}/>
            
            <TextField {...endProps} variant="standard" className={moduleClasses.inputSpacing}/>
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
    </Grid>
    <Grid item xs={12} md={3}>
    <Button variant="contained" sx={{marginTop:"15px"}} onClick={searchFlights} >Search</Button>
    </Grid>
   
    <StyledBox>
   
    </StyledBox>
    </Grid>
    </Box>
    </StyledCard>
  );
}

