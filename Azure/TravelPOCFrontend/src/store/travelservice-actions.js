import {travelServiceActions} from './travelervice-slice';
import {HOTEL_SERVICE_URL, FLIGHT_SERVICE_URL} from '../util/Constants';

export const fetchSearchedFlights =(header,urlParams)=>{

  return async (dispatch) => {
    const fetchData = async () => {
     
      const response = await fetch(
        FLIGHT_SERVICE_URL+'CheapestFlights?'+new URLSearchParams(urlParams),header);

      if (!response.ok) {
        throw new Error('Could not fetch hotels!');
      }

      const data = await response.json();     
      dispatch(travelServiceActions.setProgress({progress:false}));

      return data;
    };

    try {
      dispatch(travelServiceActions.setProgress({progress:true}));
      const searchedFlightsList = await fetchData();      
      dispatch(
          travelServiceActions.setSearchedFlightsList({
            searchedFlightsList: searchedFlightsList || {}
          
        })
      );
    } catch (error) {
     //Need to modify state to show error
    }
  };

}

export const fetchTopFlights =(header,location,currency)=>{

  return async (dispatch) => {
    const fetchData = async () => {
     
      const response = await fetch(
        FLIGHT_SERVICE_URL+'TopRoutes?origin='+location+"&currency="+currency,header);

      if (!response.ok) {
        throw new Error('Could not fetch hotels!');
      }

      const data = await response.json();    
      dispatch(travelServiceActions.setProgress({progress:false})); 
     

      return data;
    };

    try {
      dispatch(travelServiceActions.setProgress({progress:true}));
      
      const topFlightsList = await fetchData();
      
     
      dispatch(
          travelServiceActions.setTopFlightsList({
            topFlightsList: topFlightsList || {}
          
        })
      );
    } catch (error) {
     //Need to modify state to show error
    }
  };

}

export const fetchHotels = (header,params) => {
    return async (dispatch) => {
      const fetchData = async () => {
       
        const response = await fetch(
          HOTEL_SERVICE_URL+'Hotels?'+ new URLSearchParams(params),header);
  
        if (!response.ok) {
          throw new Error('Could not fetch hotels!');
        }
  
        const data = await response.json();     
        dispatch(travelServiceActions.setProgress({progress:false}));
  
        return data;
      };
  
      try {
       dispatch(travelServiceActions.setProgress({progress:true}));
        const hotelSearchDetails = await fetchData();
       
        dispatch(
            travelServiceActions.setHotelsList({
              hotelsList: hotelSearchDetails || {}
            
          })
        );
      } catch (error) {
       //Need to modify state to show error
      }
    };
  };

export const fetchBookmarkHotel =(header,userName) => {
  return async (dispatch) => {
    const fetchData = async () => {
     
      const response = await fetch(
        HOTEL_SERVICE_URL+'FavoriteHotels?userName='+userName,header);

      if (!response.ok) {
        throw new Error('Could not fetch hotels!');
      }

      const data = await response.json();     
      dispatch(travelServiceActions.setProgress({progress:false}));

      return data;
    };

    try {
     dispatch(travelServiceActions.setProgress({progress:true}));
      const bookmarkedProperties = await fetchData();
     
      dispatch(
          travelServiceActions.setBookmarkedProperties({
            bookmarkedProperties: bookmarkedProperties || {}
          
        })
      );
    } catch (error) {
     //Need to modify state to show error
    }
  };
};


export const postBookmarkHotel = (header,userName,hotelId) => {
  return async (dispatch) => {
    const fetchData = async () => {

     
     
      const response = await fetch(
        HOTEL_SERVICE_URL+'FavoriteHotels?'+ new URLSearchParams({userName:userName}),{...header,body:JSON.stringify({hotelId:hotelId}),method:'POST'});

      if (!response.ok) {
        throw new Error('Could not fetch hotels!');
      }

      const data = await response.json();     
      dispatch(travelServiceActions.setProgress({progress:false}));

      return data;
    };

    try {
     dispatch(travelServiceActions.setProgress({progress:true}));
      const bookmarkedProperties = await fetchData();
      console.log(bookmarkedProperties);
     
      dispatch(
          travelServiceActions.setBookmarkedProperties({
            bookmarkedProperties: bookmarkedProperties || {}
          
        })
      );
    } catch (error) {
     //Need to modify state to show error
    }
  };
};

 

  
  