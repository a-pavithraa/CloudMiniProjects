import  React,{useState,useEffect,useContext} from 'react';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import {  StyledCard } from '../ui/Themes';
import { StyledBox } from '../ui/Themes';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import moduleClasses from './SearchComponent.module.scss';
import { useNavigate } from 'react-router-dom';
import { HOTEL_SERVICE_URL } from '../../util/Constants';
import dateFormat from 'dateformat';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, Grid } from '@mui/material';
import AuthContext from '../../store/auth-context';
import { useDispatch, useSelector } from 'react-redux';
import { travelServiceActions } from '../../store/travelervice-slice';

export default function SearchBar(props) {
  const searchValues = useSelector((state) => state.travelService.hotelSearchCriteria);
  const [value, setValue] = useState([null,null]);
  const [location,setLocation]=useState(searchValues.id);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]); 
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();  
  const [inputValue, setInputValue] = useState(searchValues.labelVal);
  const loading = open && inputValue.length>2 && options.length === 0;  
  const navigate = useNavigate();
  function displayfavoriteHotels(){
    navigate(`/favHotels`);

  }

  function searchHotels(){
   
   if(value[0]===null || value[1]===null || location===''){
     alert('Please enter date and city');
     return false;
   }
    const fromDate = dateFormat(value[0],'yyyy-mm-dd');
    const toDate = dateFormat(value[1],'yyyy-mm-dd');    
    dispatch(travelServiceActions.setHotelSearchCritera({criteria:{fromDate:fromDate,toDate:toDate,id:location,labelVal:inputValue}}));
    
    
    props.onSearch(location,fromDate,toDate,1);

  }

  async function handleDebounceFn(val) {
    if(val && val.length>4 && val.length<20){
      const response = await fetch(HOTEL_SERVICE_URL+'HotelLocations?locale=en-gb&locationName='+val, authCtx.reqHeader);
      if (!response.ok) {
        alert('Could not fetch suggestions!');
  
      } 
      const suggestions = await response.json();    
      return suggestions;

    }   
   
  }

  useEffect(() => {
    const identifier = setTimeout(async () => {
      if (loading  && inputValue!=='' && inputValue.length>4) {
        const suggestions= await handleDebounceFn(inputValue);
         if ( suggestions && suggestions!==null) {
           setOptions(suggestions.map(x => x));
         }
        
       }
    }, 300);

    return () => {
           clearTimeout(identifier);
    };
  }, [loading,inputValue]);

  
  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <StyledCard>
      <Box sx={{ display: 'flex', flexDirection: 'column',width: '100%' }}>
      <Grid md={12} container spacing={10}>
      
      <Grid item xs={10}>
        
      <CardContent >
        <Typography component="div" variant="h6" >
        Where To next?  {authCtx.isLoggedIn && ", "+ authCtx.userName}
        </Typography>   

      </CardContent>
      </Grid>
    
     
      <Grid item xs={12} md={4}>
      <Autocomplete
      
      sx={{ width: 300 }}
      autoComplete
      includeInputInList
      filterSelectedOptions
      autoHighlight
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
     
      options={options}
      loading={loading}
      getOptionLabel={(option) => option.label||''}
      onChange={(option,value)=>{if(value)setLocation(value.dest_id)}}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={option.image_url}
            
            alt=""
          />
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cities"
          variant="standard" className={moduleClasses.inputSpacing}
          
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
        </Grid>
        <Grid item xs={12} md={4}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="Check-in"
        endText="Check-out"
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
          <Grid item xs={12} md={4} >
          <Button variant="contained" onClick={searchHotels} >Search</Button>
          </Grid>
        </Grid>
     
    
   
    
    <StyledBox>
   
    </StyledBox>
    </Box>
    </StyledCard>
  );
}

