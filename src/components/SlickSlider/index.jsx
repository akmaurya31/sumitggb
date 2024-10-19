import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { CardSkeleton } from "components/LandingPageCard/CardSkeleton";
import product_1_1 from "../../styles/imgs/shop/product-1-1.jpg";
import { Link } from "react-router-dom";

const SlickSlider = ({ data, loading }) => {
  const [settings] = useState({
    cssEase: "linear",
    dots: false,
    infinite: true,
    speed: 1000,
    arrows: false,
    autoplay: false,
    slidesToShow: 10.9,
    slidesToScroll: 1,
    loop: true,

    adaptiveHeight: true,
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

  const skl = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      {loading ? (
        <div className="flex gap-4 mb-4 " style={{ flexFlow: "wrap" }}>
          {skl?.map((sk,index) => (
            <CardSkeleton height={100} width={122.5} key={index}/>
          ))}
        </div>
      ) : (
        <Slider {...settings}>
          {data?.map((logo, index) => (
            <div
              key={index}
              className={`card-2  bg-${index + 9
                } wow animate__animated animate__fadeInUp`}
              data-wow-delay={`.${index}s`}
            >
              <figure className="img-hover-scale overflow-hidden">
                <Link to={{ pathname: "products", search: "category=" + logo.name.replace(/\s+/g, '-') }} state={{ value: logo.idcategory, type: "category", customavi:"avi67" }}>
                  <img src={logo.image === "no-image.png" || logo.image === "no-name.png" ? product_1_1 : logo.image} alt={logo.description} />
                </Link>
              </figure>
              <h6 className="heading-sm-1 ">
                <Link to={{ pathname: "products", search: "category=" + logo.name.replace(/\s+/g, '-') }} state={{ value: logo.idcategory, type: "category", customavi:"avi72" }} className="text-decoration-none" style={{ fontSize: 12 }}>
                  {logo.name}
                </Link>
              </h6>
            </div>
          ))}
        </Slider>
      )}
    </>
  );
};
export { SlickSlider };