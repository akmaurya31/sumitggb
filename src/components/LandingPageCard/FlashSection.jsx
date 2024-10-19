import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import cat11 from "../../styles/imgs/shop/cat-11.png";
import cat12 from "../../styles/imgs/shop/cat-12.png";
import cat13 from "../../styles/imgs/shop/cat-13.png";
import cat9 from "../../styles/imgs/shop/cat-9.png";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

const FlashSection = ({ title, data }) => {
  const [settings] = useState({
    // dots: true,
    // infinite: true,
    // slidesToShow: 6,
    // slidesToScroll: 1,
    // autoplay: false,
    // speed: 2000,
    // autoplaySpeed: 2000,
    cssEase: "linear",
    dots: false,
    infinite: false,
    speed: 1000,
    arrows: false,
    autoplay: false,
    slidesToShow: 6,
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
          slidesToShow: 2,
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
    // prevArrow: '<span class="slider-btn slider-prev"><i class="fi-rs-arrow-small-left"></i></span>',
    // nextArrow: '<span class="slider-btn slider-next"><i class="fi-rs-arrow-small-right"></i></span>',
  });

  const logos = [
    { image: cat13, text: "29 store", price: 29 },
    { image: cat12, text: "49 store", price: 49 },
    { image: cat11, text: "99 store", price: 99 },
    { image: cat9, text: "129 store", price: 129 },
    { image: cat13, text: "149 store", price: 149 },
    { image: cat12, text: "199 store", price: 199 },

    // Add more logos here
  ];
  // Your component logic
  return (
    <>
      <div className="container-fluid">
        <div className="section-title wow animate__animated animate__fadeIn flex justify-between items-center ">
          <h5 className="section-home-head mt-4 mb-0">{title}</h5>
        </div>
      </div>

      {/* <Slider {...settings}>
        {logos?.map((logo, index) => (
          <div
            key={index}
            className={`card-2 card-padding bg-4 wow animate__animated animate__fadeInUp pt-3 pb-3`}
            data-wow-delay={`.${index}s`}
           
          >
            <h6 className="heading-sm-1">
              <Link to="products" className="text-decoration-none">
                {logo.text}
              </Link>
            </h6>
            <figure className="img-hover-scale overflow-hidden">
              <a href="/products">
                <img src={logo.image} alt="" />
              </a>
            </figure>
            <button
              className="button  "
              style={{ padding: "7px 11px", fontSize: 10 }}
            >
              Buy Now
            </button>
           
          </div>
        ))}
      </Slider> */}
      <div className="container-fluid">
        <div className="grid sm:grid-cols-3 md:grid-cols-4 grid-cols-6 sm:gap-2 md:gap-2 gap-2">
          {logos?.map((logo, index) => (
            <div key={index}>
              <Link
                to={`/product-price/${logo?.price}`}
                className="no-underline"
              >
                <div
                  key={index}
                  className={`card-2 mb-0 card-padding bg-4 wow animate__animated animate__fadeInUp pt-3 pb-3`}
                  data-wow-delay={`.${index}s`}
                  style={{ width: "100%" }}
                >
                  <div className="flex flex-col">
                    <h6 className="heading-sm-1 mb-0" style={{ fontSize: 50 }}>
                      {logo.price}
                    </h6>
                    <h7
                      className="heading-sm-1"
                      style={{ fontSize: 16, marginTop: "-3px" }}
                    >
                      Store
                    </h7>
                  </div>

                  {/* <button
                  className="button  "
                  style={{ padding: "7px 11px", fontSize: 10 }}
                >
                  Buy Now
                </button> */}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export { FlashSection };
