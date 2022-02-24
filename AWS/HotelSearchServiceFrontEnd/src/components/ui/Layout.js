import React,{useState} from 'react';

import {  ThemeProvider  as MuiThemeProvider} from '@mui/material/styles';
import {darkTheme} from './Themes';
import NavBar from './NavBar';


const Layout =(props)=>{
   
    return (  
      <MuiThemeProvider theme={darkTheme}>
          <NavBar/>
         
          {props.children}
         
      </MuiThemeProvider>
  );
}
export default Layout;