import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import moduleClasses from './SearchComponent.module.scss';
import CardContent from '@mui/material/CardContent';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { StyledCard } from '../ui/Themes';
import { StyledBox } from '../ui/Themes';
import { DateRangePicker } from '@mui/lab';

const SearchComponent = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState([null, null]);

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (<StyledCard >
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography component="div" variant="h6">
          Book Flights, Hotels and Holiday Packages
        </Typography>

      </CardContent>
      <StyledBox>
        <TextField id="outlined-basic" label="Depart From" variant="standard" className={moduleClasses.inputSpacing} />
        <TextField id="outlined-basic" label="Going To" variant="standard" className={moduleClasses.inputSpacing} />
      </StyledBox>
      <StyledBox>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="Departure Date"
        endText="Return Date"
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
      </StyledBox>
      <StyledBox>
      <FormControl  className={moduleClasses.inputSpacing}>
      <FormLabel >Gender</FormLabel>
      <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        
      </RadioGroup>
    </FormControl>
    </StyledBox>
    </Box>

  </StyledCard>)
}


export default SearchComponent;