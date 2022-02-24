import { createSlice } from '@reduxjs/toolkit';

const searchCriteria ={id:'',labelVal:'',fromDate:'',toDate:''};


const travelServiceSlice = createSlice({
    name: 'travelService',
    initialState: { bookmarkedProperties: {},hotelsList:{},topFlightsList:{},searchedFlightsList:{},progress:false,hotelSearchCriteria:searchCriteria},
    reducers: {
      setBookmarkedProperties(state,action) {
        state.bookmarkedProperties = action.payload.bookmarkedProperties;
      
      },
      setHotelsList(state,action){
        state.hotelsList=action.payload.hotelsList;
      },
      setTopFlightsList(state,action){
        state.topFlightsList=action.payload.topFlightsList;
        
      },
      setSearchedFlightsList(state,action){
          state.searchedFlightsList=action.payload.searchedFlightsList
      },
     
      setProgress(state,action){
        state.progress=action.payload.progress;
      },
      setHotelSearchCritera(state,action){
        state.hotelSearchCriteria=action.payload.criteria;
      },
      logout: state => {
       
        state.bookmarkedProperties ={};
        state.hotelsList={};
        state.progress={};
        state.searchedFlightsList={};
        state.topFlightsList={};
        state.searchedFlightsList={};
        
      }
   
    },
  });
  
  export const travelServiceActions = travelServiceSlice.actions;
  
  export default travelServiceSlice;