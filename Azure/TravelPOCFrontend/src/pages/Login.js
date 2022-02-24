import React, { useContext, useState, useEffect,useCallback } from 'react';
import moduleClasses from './Login.module.scss';
import { useNavigate,useLocation } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

import { Box, Button, CircularProgress, Grid, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LoginTextField } from '../components/ui/Themes';




const Login = () => {
 
  const navigate = useNavigate();
  const location = useLocation();
 
  const context = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  //const {isLoggedIn,isInvalidCredential}=context;
  const [userName, setUserName] = useState('');
  const [progress, setProgress] = useState(false);
  const [password, setPassword] = useState('');
  
  const setUserNameChange = useCallback((event) => { 

    setUserName(event.target.value);

  },[]);
  const setPasswordChange = useCallback((event) => {
    setPassword(event.target.value);


  },[]);
  const switchAuthModeHandler = (event) => {
    event.preventDefault();
    setIsLogin((prevState) => !prevState);
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
      
      localStorage.setItem('jwtToken', idToken);


      const expirationTime = new Date(
        new Date().getTime() + +3600 * 1000
      );

      context.login(idToken, expirationTime);
     navigate("/hotelBookings")
    }

  }, [location,  context]);

  
 

  const createNewUser = () => {
    setProgress(true);
    var poolData = {
      UserPoolId: 'us-east-1_DUfDYLnmA',
      ClientId: '7sopkguq2mmi4vf7dhnet51kjn'
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var attributeList = [];
    var dataEmail = {
      Name: 'email',
      Value: 'aravamudhan.pavithra@craneww.com',
    };

    var dataPhoneNumber = {
      Name: 'phone_number',
      Value: '+919176886939',
    };
    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(
      dataPhoneNumber
    );

    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);

    userPool.signUp(userName, password, attributeList, null, function (
      err,
      result
    ) {
      setProgress(false);
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      var cognitoUser = result.user;
     
      console.log('user name is ' + cognitoUser.getUsername());
      loginHandler();
    });
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (userName === null || userName.trim() === '' || password === null || password.trim() === '') {
      alert('Please enter username and password!');
      return false;
    }
    if (isLogin) {
      loginHandler();
    } else {
      createNewUser();
    }


  }

  const loginHandler = () => {

    setProgress(true);
    var authenticationData = {
      Username: userName,
      Password: password,
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    var poolData = {
      UserPoolId: 'us-east-1_DUfDYLnmA',
      ClientId: '7sopkguq2mmi4vf7dhnet51kjn'
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
      Username: userName,
      Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);


    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        var accessToken = result.getAccessToken().getJwtToken();
        var idToken = result.idToken.jwtToken;
        localStorage.setItem('jwtToken', idToken);
        setProgress(false);        
        const expirationTime = new Date(
          new Date().getTime() + +3600 * 1000
        );

        context.login(idToken, expirationTime);        
        navigate("/hotelBookings");

        /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */


      },

      onFailure: function (err) {
        alert('Invalid credentials');
        setProgress(false);
       

      },

    });
  }
  return (<Box className={moduleClasses.login}>
    <form  noValidate autoComplete="off">
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"

      >
     
       
          <div className={moduleClasses.floatRight}>
            <Button
              
              onClick={switchAuthModeHandler}
              sx={{color:"white"}}

            >
              {isLogin ? 'Sign Up ' : 'Login '}
            </Button>
          </div>

     

        <Grid item xs={12}>
          <LoginTextField   label="User Name"  onChange={setUserNameChange}  variant="standard"/>
        </Grid>
        <Grid item xs={12}>
          <LoginTextField            
            label="Password"
            type="password"       
            variant="standard"
            autoComplete="current-password"
            onChange={setPasswordChange}
          />
        </Grid>
      </Grid>

      <div className={`${moduleClasses.btnActions} `}>


        {progress ? <CircularProgress color="secondary" size={24}  /> : <Button type="submit" variant="contained" color="success" onClick={submitHandler}> {isLogin ? 'Login' : 'Create Account'}</Button>}


       
      </div>
      <div>
      
    

      </div>

    </form>
  </Box>);


}
export default Login;