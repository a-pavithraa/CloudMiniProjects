export const SERVICE_API_URL = 'http://localhost:8102/';

export const REVERSE_GEO_API='https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=37.42159&longitude=-122.0837&localityLanguage=en'
////Key has to be added  https://www.bigdatacloud.com/
export const LOCATION_API='https://api.bigdatacloud.net/data/ip-geolocation?key=9509b82187044d29a9d0134ceb037f05'
// Backend Serice URL
export const TRAVEL_SERVICE_API_URL = 'https://bookingserviceapi.saaralkaatru.com/bookingserviceapi-prod/';
export const HOTEL_SERVICE_URL=TRAVEL_SERVICE_API_URL;
export const FLIGHT_SERVICE_URL=TRAVEL_SERVICE_API_URL+'flight-service/'
export const IATA_SERVICE_URL=TRAVEL_SERVICE_API_URL+'iata-service/'

//B2C Constants

export const B2C_CLIENT_ID="8338dac5-fa34-4477-a8fd-6b31299d8917";
//User Flow
export const B2C_AUTHORITY="https://pocorgb2c.b2clogin.com/pocorgb2c.onmicrosoft.com/B2C_1_todo2101";
//Have to be configured in App Registration -> App ->Authentication
export const REDIRECT_URI =  "http://localhost:3000";
export const LOGOUT_URI="http://localhost:3000/";
export const KNOWN_AUTHORITIES = "pocorgb2c.b2clogin.com";
export const READ_SCOPE = "https://pocorgb2c.onmicrosoft.com/f0753138-0486-4581-9c50-2f129b923d9c/User.Read"