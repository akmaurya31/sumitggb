import { useState } from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";


const CardSlider = ({children}) => {
  const [settings] = useState({
    // dots: true,
    // infinite: true,
    // slidesToShow: 6,
    // slidesToScroll: 1,
    // autoplay: false,
    // speed: 2000,
    // autoplaySpeed: 2000,
    cssEase: 'linear',
    dots: false,
    infinite: true,
    speed: 1000,
    arrows: true,
    autoplay: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    loop: true,
    adaptiveHeight: true,

    responsive: [
        {
            breakpoint: 1025,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ],
    // prevArrow: '<span class="slider-btn slider-prev"><i class="fi-rs-arrow-small-left"></i></span>',
    // nextArrow: '<span class="slider-btn slider-next"><i class="fi-rs-arrow-small-right"></i></span>',
  });
  
  
  // Your component logic
  return (
    
      <Slider {...settings}>
     {children}
      </Slider>
    
  );
};
export { CardSlider };

