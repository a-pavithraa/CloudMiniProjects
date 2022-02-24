export const SERVICE_API_URL = 'http://localhost:8102/';
export const REVERSE_GEO_API='https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=37.42159&longitude=-122.0837&localityLanguage=en'
////Key has to be added  https://www.bigdatacloud.com/
export const LOCATION_API='https://api.bigdatacloud.net/data/ip-geolocation?key=b45faf7c8e6b4cd2b94a4b490dd2f3e5'

//Backend Service URL 
export const TRAVEL_SERVICE_API_URL = 'https://bookingserviceapi.pavithraavasudevan.com/';
export const HOTEL_SERVICE_URL=TRAVEL_SERVICE_API_URL;
export const FLIGHT_SERVICE_URL=TRAVEL_SERVICE_API_URL+'flight-service/'
export const IATA_SERVICE_URL=TRAVEL_SERVICE_API_URL+'iata-service/'
// Cognito URL . Custom Domain is used. Redirect URL should match with Client App Settings
export const COGNITO_URL='https://newauth.pavithraavasudevan.com/login?client_id=vp5414n8rqqsdbsrg9o17pgof&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=http://localhost:3000/';