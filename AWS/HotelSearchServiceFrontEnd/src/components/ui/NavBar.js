import React, { useEffect,useContext } from "react";

import AppBar from '@mui/material/AppBar';

import { Toolbar, Typography } from "@mui/material";
import moduleClasses from './NavBar.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

import AuthContext from "../../store/auth-context";
import { useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
const NavBar = () => {
    const [value, setValue] = React.useState(0);
    const authCtx=useContext(AuthContext);
    const location = useLocation();
    const dispatch = useDispatch();  
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

        if (location.hash) {
          var hash = location.hash.substring(1);
    
          var result = hash.split('&').reduce(function (res, item) {
            var parts = item.split('=');
            res[parts[0]] = parts[1];
            return res;
          }, {});
    
         
          const idToken = result.id_token;
          console.log(idToken);
          
          localStorage.setItem('jwtToken', idToken);
    
    
          const expirationTime = new Date(
            new Date().getTime() + +3600 * 1000
          );
    
          authCtx.login(idToken, expirationTime);
        
        }
    
      }, [location.hash]);

      const googleLogin = event => {
        event.preventDefault();
        window.location.href = 'https://newauth.pavithraavasudevan.com/login?client_id=vp5414n8rqqsdbsrg9o17pgof&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=http://localhost:3000/';
    
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
                     {!authCtx.isLoggedIn &&   <Button color="inherit" onClick={googleLogin} >Login</Button>}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;