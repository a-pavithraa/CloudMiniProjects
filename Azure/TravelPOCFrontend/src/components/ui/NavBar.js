import React, { useEffect, useContext } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "../../util/authConfig";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { Toolbar, Typography } from "@mui/material";
import moduleClasses from './NavBar.module.scss';

import {  EventType } from "@azure/msal-browser";

import {  useNavigate } from 'react-router-dom';

import AuthContext from "../../store/auth-context";


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const NavBar = () => {
    const [value, setValue] = React.useState(0);
    const authCtx = useContext(AuthContext);

    const { instance } = useMsal();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    useEffect(() => {
        // This will be run on component mount
        const callbackId = instance.addEventCallback((message) => {
            // This will be run every time an event is emitted after registering this callback
            if (message.eventType === EventType.LOGIN_SUCCESS) {
                const result = message.payload;    
                console.log(result);
                const idToken = result.idToken;
          
                //localStorage.setItem('jwtToken', idToken);
          
          
                const expirationTime = new Date(
                  new Date().getTime() + +3600 * 1000
                );
               
          
                authCtx.login(idToken, expirationTime);
                // Do something with the result
            }
            if (message.eventType === EventType.LOGOUT_SUCCESS) {
               
          
                authCtx.logout();
                // Do something with the result
            }
        });

        return () => {
            // This will be run on component unmount
            if (callbackId) {
                instance.removeEventCallback(callbackId);
            }
        }
        
    }, []);



    const loginHandler = event => {
    
        instance.loginRedirect(loginRequest).catch(e => {
            console.log(e);
        });

    }

    const logoutHandler = ()=>{
        instance.logoutRedirect({
            postLogoutRedirectUri: "/",
        });
    
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const fetchBookmarkHotel =()=>{
     
        navigate(`/favHotels`);
  
      }
      let appBarContent = <Typography component="div" variant="h5">HOTEL SEARCH SERVICE </Typography>
      
       
    
      return (
          <div >
              <AppBar position="static" sx={{
                  fontWeight: "bolder",
                  width: '100%',
                  fontSize: '20px',
                  marginBottom: `20px`
              }}>
                
                  <Toolbar>
  
                     {appBarContent}
                      <div className={moduleClasses.rightAlignment}>
                          
                      {authCtx.isLoggedIn && <Button  onClick={fetchBookmarkHotel} >Bookmarks</Button>}
                      {authCtx.isLoggedIn &&  <><Button
          id="basic-button"
          color="inherit"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {authCtx.userName}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={fetchBookmarkHotel}>Bookmarks</MenuItem>
         
        </Menu></>}
                       {authCtx.isLoggedIn &&   <Button color="inherit" onClick={authCtx.logout} >Logout</Button>}
                       {!authCtx.isLoggedIn &&   <Button color="inherit" onClick={loginHandler} >Login</Button>}
                      </div>
                  </Toolbar>
              </AppBar>
          </div>
      );
  }
  
  export default NavBar;