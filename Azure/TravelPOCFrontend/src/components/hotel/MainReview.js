import React,{useEffect,useContext,useState, Fragment,useCallback} from 'react';
import AuthContext from '../../store/auth-context';
import { HOTEL_SERVICE_URL } from '../../util/Constants';
import Modal from '../ui/Modal';
import HotelReviews from './HotelReview';
import { checkArray,delay } from '../../util/UtilFunctions';

const MainReview = (props)=>{
    const authCtx=useContext(AuthContext);
    const [showMoreReviews, setShowMoreReviews] = useState(false);
    const [reviews,setReviews]=useState();
    const showDialog = useCallback(() => setShowMoreReviews(true));
    const hideDialog = useCallback(() => setShowMoreReviews(false));
    const fetchHotelReviews=useCallback(async ()=>{

        delay(2000);
        const response = await fetch(HOTEL_SERVICE_URL + 'HotelReviews?locale=en-gb&hotelId=' + props.hotelId, authCtx.reqHeader);
        if (!response.ok) {
         //   alert('Could not fetch details!');
         setReviews([]);

        }
        const reviewList = await response.json();
        setReviews(reviewList);
    },[props.hotelId,authCtx]);

    useEffect(() => {
        //rapid api throws error for more that 3 requests in a second.. so adding delay here
        fetchHotelReviews();

    }, [fetchHotelReviews]);
    let details ='';
    if(reviews && checkArray(reviews.result)){
        details = <>
          <Modal title="More Reviews" open={showMoreReviews} onClose={hideDialog}>
        <HotelReviews reviews={reviews.result}  /> 
        </Modal>
        <HotelReviews reviews={reviews.result.slice(0, 1)} onOpen={showDialog} showMoreReviews="true" />
        </>
    }
    return <Fragment>
        
      
         {details}
        
    </Fragment>

}

export default MainReview;