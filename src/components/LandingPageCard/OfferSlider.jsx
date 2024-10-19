import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { CardSkeleton } from "components/LandingPageCard/CardSkeleton";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Img } from "components";
import { Link } from "react-router-dom";
const OfferSlider = ({ bannerData, loading }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items:
        bannerData?.length == 1
          ? 1
          : bannerData?.length == 2
          ? 2
          : bannerData?.length > 2
          ? 3
          : 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items:
        bannerData?.length == 1
          ? 1
          : bannerData?.length == 2
          ? 2
          : bannerData?.length > 2
          ? 3
          : 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  // Your component logic
  return (
    <>
      {loading ? (
        <CardSkeleton height={230} />
      ) : (
        <Carousel responsive={responsive} className="">
          {bannerData?.map((off, index) => {
            return (
              <div
                className="col-sm-12 col-md-6 col-lg-3 d-md-none d-lg-flex slick-slide slick-active"
                key={index}
                style={{ width: "100%" }}
              >
                <Link to="#" className="w-full">
                <div
                  className="banner-img mb-sm-0 relative wow animate__animated animate__fadeInUp"
                  data-wow-delay=".4s"
                  style={{ width: "100%" }}
                >
                  <Img
                    src={off?.image}
                    alt=""
                    className={"banner-image"}
                    style={{ width: "100%" }}
                  />
                  {/* <div
                    className="banner-text"
                    style={{ top: "86%", right: 6, padding: 0 }}
                  >
                    <a href="/products" className="btn btn-xs">
                      Shop Now <i className="fi-rs-arrow-small-right"></i>
                    </a>
                  </div> */}
                </div>
                </Link>
                
              </div>
            );
          })}
        </Carousel>
      )}
    </>
  );
};
export { OfferSlider };
