import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { travelServiceActions } from './travelervice-slice';
import { TRAVEL_SERVICE_API_URL, LOCATION_API } from '../util/Constants';


let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false, 
  userName: '',
  location: {},
  reqHeader:{},
  currency: 'USD',
  login: (token) => { },
  logout: () => { },
  subscribe: () => { }
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('jwtToken');
  const storedExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  const dispatch = useDispatch();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);
  const [location, setLocation] = useState({});
  const [currency, setCurrency] = useState('USD');
  const [reqHeader,setReqHeader]=useState({});
  const [loggedInUser,setLoggedInUser]=useState();


  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('expirationTime');
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    dispatch(travelServiceActions.logout());
  }, [dispatch]);

  function getUserNameFromToken(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const jsonObj = JSON.parse(window.atob(base64));
    
    const userName = jsonObj.name??jsonObj["cognito:username"];
    return userName;
}

  const loginHandler = async (token, expirationTime) => {
    setToken(token);
    console.log("parsing user name");
    setLoggedInUser(getUserNameFromToken(token));
   
    localStorage.setItem('jwtToken', token);
    setReqHeader({headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
      }
    });
    localStorage.setItem('expirationTime', expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);

    const locationResponse = await fetch(LOCATION_API);

    if (locationResponse.ok) {
      const data = await locationResponse.json();
      if (data !== null) {

        if (data.location !== null) {

          setLocation({ city: data.location.city, latitude: data.location.latitude, longitude: data.location.longitude });

        }
        if (data.country !== null) {
          setCurrency(data.country.currency.code);
        }
      }

    }

  };

  useEffect(() => {
    if (tokenData) {
     
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    userName:loggedInUser,
    login: loginHandler,
    logout: logoutHandler,
    location: location,
    currency: currency,
    reqHeader:reqHeader


  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
