import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { CardSkeleton } from "components/LandingPageCard/CardSkeleton";

const BannerSlider = ({ bannerData, loading }) => {
  const [settings] = useState({
    
    cssEase: "linear",
    dots: false,
    infinite: true,
    speed: 80,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    loop: true,
    adaptiveHeight: true,
    fade: true,

    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
   });

  // Your component logic
  return (
    <>
      {loading ? (
        <CardSkeleton height={230} width={"100%"} />
      ) : (
        <Slider {...settings}>
          {bannerData?.map((bn,index) => {
            return (
              <div style={{ width: "100%", maxHeight:234 }} key={index}>
                <img src={`${bn?.image}`} style={{ width: "100%" ,maxHeight:234,borderRadius:20}} />
              </div>
            );
          })}
        </Slider>
      )}
    </>
  );
};
export { BannerSlider };
