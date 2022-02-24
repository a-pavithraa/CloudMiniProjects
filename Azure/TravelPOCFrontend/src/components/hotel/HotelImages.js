/* eslint-disable */
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React, { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from '../../store/auth-context';
import { HOTEL_SERVICE_URL } from "../../util/Constants";
import { checkArray } from "../../util/UtilFunctions";
const Img = styled('img')({

  display: 'block',
  maxWidth: '100%',
  maxHeight: '230px'

});
const ImgSlider = (props) => {
  const authCtx = useContext(AuthContext);
  const [hotelImages, setHotelImages] = useState();
  const fetchHotelImages = useCallback(async () => {

    const response = await fetch(HOTEL_SERVICE_URL + 'HotelPhotos?locale=en-gb&hotelId=' + props.hotelId, authCtx.reqHeader);
    if (!response.ok) {
      setHotelImages([]);

    }
    const imgs = await response.json();
    setHotelImages(imgs);

  }, [props.hotelId, authCtx])

  useEffect(() => {
    fetchHotelImages();


  }, [props.hotelId]);
  let settings = {

    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <React.Fragment>
      {checkArray(hotelImages) && <Carousel {...settings}>
        {hotelImages.map(
          photoEl => {
            return <Wrap key={photoEl.photo_id}>
              <a alt="image">
                <Img src={photoEl.url_max} alt="" />
              </a>
            </Wrap>

          }
        )}

      </Carousel>}
    </React.Fragment>



  );
};
//Reused from https://github.com/SudhanshuBlaze/disney-plus-clone

const Carousel = styled(Slider)`
  margin-top: 20px;  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;
  }

  &:hover {
    & > button {
      opacity: 1;    
      transition: opacity 0.4s ease 0s;
    }
  }

  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }

  li.slick-active button:before {
    color: white;
  }

  
  .slick-list {
    overflow: initial;
  }
  .slick-prev {
    left: 60px;
  }
  .slick-next {
    right: 60px;
  }
`;
const Wrap = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  a {
    border-radius: 4px; 
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    display: block;
    position: relative;
    padding: 4px;
    img {
      width: 100%;
      height: 100%;
    }
    &:hover {
      padding: 0;
      border: 4px solid rgba(249, 249, 249, 0.8);
      transition-duration: 300ms;
    }
  }
`;

export default ImgSlider;
