import  React,{useContext,useEffect,useReducer} from 'react';
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

const originCityReducer = (state, action) => {
  
  if (action.type === 'SET_CITY') {
    return { ...state,originCity:action.val };
  }
  if (action.type === 'SET_CODE') {
    return { ...state,originIataCode:action.val };
  }
  if (action.type === 'SET_OPEN') {
    return { ...state,openOrigin:action.val };
  }
 
  return { ...state,originOptions:action.val };
};

const destCityReducer = (state, action) => {
  
  if (action.type === 'SET_CITY') {
    return { ...state,destCity:action.val };
  }
  if (action.type === 'SET_CODE') {
    return { ...state,destIataCode:action.val };
  }
  if (action.type === 'SET_OPEN') {
    return { ...state,openDest:action.val };
  }
 
  return { ...state,destOptions:action.val };
};


export default function FlightSearchAutoSuggest(props) {
  const [value, setValue] = React.useState([null, null]);
  const authCtx = useContext(AuthContext);
  const fromDate = dateFormat(value[0],'yyyy-mm-dd');
  const toDate = dateFormat(value[1],'yyyy-mm-dd');
  
  const [originVal, dispatchOriginVal] = useReducer(originCityReducer, {
    originIataCode: '',
    originCity:'',
    openOrigin:false,
    originOptions:[]
  });

  const [destinationVal, dispatchDestinationVal] = useReducer(destCityReducer, {
    destIataCode: '',
    destCity:'',
    openDest:false,
    destOptions:[]
  });
  
  const { originIataCode,originCity,openOrigin,originOptions} = originVal;  
  const { destIataCode,destCity,openDest,destOptions} = destinationVal;  
  const originLoading = openOrigin && originCity.length>2 && originOptions.length === 0;
  const destLoading = openDest && destCity.length>2 && destOptions.length === 0;   
  
  const searchFlights =()=>{

    if(originIataCode===''&& destIataCode===''){
      alert('Please enter source and destination');
      return false;
    }
     const urlParams = {
     
      currency: authCtx.currency,
      origin: originIataCode,
      destination: destIataCode,
      return_date: toDate,
      depart_date: fromDate,      
      page_number:1
      
    }
    props.onSearch(urlParams);


  }
  async function handleDebounceFn(val) {
    if(val && val.length>2 && val.length<20){
      const response = await fetch(
        IATA_SERVICE_URL+val, authCtx.reqHeader
      );
      if (!response.ok) {
       alert('Could not fetch suggestions!');
  
      }  
      const suggestions = await response.json();     
      return suggestions;

    }   
   
  }

  useEffect(() => {
   
    const identifier = setTimeout(async () => {
      if (originLoading  && originCity!=='' && originCity.length>2) {
        const suggestions= await handleDebounceFn(originCity);
         if ( suggestions) {
          dispatchOriginVal({ type: 'SET_OPTIONS', val: suggestions.map(x => x)});
         
         }
        
       }
    }, 500);
  
    return () => {     
      clearTimeout(identifier);
    };
  
  }, [originLoading,originCity,handleDebounceFn]);
  useEffect(() => {
    if (!openOrigin) {
    
      dispatchOriginVal({ type: 'SET_OPTIONS', val: []});
    }
  }, [openOrigin]);

  useEffect(() => {   
    const identifier = setTimeout(async () => {
      if (destLoading  && destCity!=='' && destCity.length>2) {
        const suggestions= await handleDebounceFn(destCity);
         if ( suggestions) {
          dispatchDestinationVal({ type: 'SET_OPTIONS', val: suggestions.map(x => x)});         
         }
        
       }
    }, 500);  
    return () => {
          clearTimeout(identifier);
    };
  
  }, [destLoading,destCity,handleDebounceFn]);
  useEffect(() => {
    if (!openDest) {
    
      dispatchDestinationVal({ type: 'SET_OPTIONS', val: []});
    }
  }, [openDest]);

  return (
    <StyledCard>
    <Box sx={{ display: 'flex', flexDirection: 'column',width: '100%' }}>
      <Grid md={12} container spacing={10}>
      
      <Grid item xs={12} md={3}>     
      <Autocomplete      
      sx={{ width: 300 }}
      autoComplete
      includeInputInList
      filterSelectedOptions
      autoHighlight
      open={openOrigin}
      onOpen={() => {
      
        dispatchOriginVal({ type: 'SET_OPEN', val: true});
      }}
      onClose={() => {
        dispatchOriginVal({ type: 'SET_OPEN', val: false});
      }}      
      onInputChange={(event, newInputValue) => {
        
        dispatchOriginVal({ type: 'SET_CITY', val: newInputValue});
      }}     
      options={originOptions}
      loading={originLoading}
      getOptionLabel={(option) => option.name||''}
      onChange={(option,value)=>{if(value) dispatchOriginVal({ type: 'SET_CODE', val: value.code});}}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>         
          {option.name} -- {option.code}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="From"
          variant="standard" className={moduleClasses.inputSpacing}
          
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
      autoComplete
      includeInputInList
      filterSelectedOptions
      autoHighlight
      open={openDest}
      onOpen={() => {
      
        dispatchDestinationVal({ type: 'SET_OPEN', val: true});
      }}
      onClose={() => {
        dispatchDestinationVal({ type: 'SET_OPEN', val: false});
      }}      
      onInputChange={(event, newInputValue) => {
        
        dispatchDestinationVal({ type: 'SET_CITY', val: newInputValue});
      }}     
      options={destOptions}
      loading={destLoading}
      getOptionLabel={(option) => option.name||''}
      onChange={(option,value)=>{if(value) dispatchDestinationVal({ type: 'SET_CODE', val: value.code});}}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>         
          {option.name} -- {option.code}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="To"
          variant="standard" className={moduleClasses.inputSpacing}
          
          inputProps={{
            ...params.inputProps
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

