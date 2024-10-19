// import React, { useState } from "react";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

import { CardSkeleton } from "components/LandingPageCard/CardSkeleton";
import product_1_1 from "../../styles/imgs/shop/product-1-1.jpg";

const SubCatSection = ({ data, loading, title }) => {
  // const [settings] = useState({
  //   cssEase: "linear",
  //   dots: false,
  //   infinite: true,
  //   speed: 1000,
  //   arrows: false,
  //   autoplay: false,
  //   slidesToShow: 10.9,
  //   slidesToScroll: 1,
  //   loop: true,

  //   adaptiveHeight: true,
  //   responsive: [
  //     {
  //       breakpoint: 1025,
  //       settings: {
  //         slidesToShow: 4,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // });

  const skl = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <div
        className="section-title wow animate__animated animate__fadeIn flex justify-between items-center "
        style={{ paddingLeft: 10 }}
      >
        <h5 className="section-home-head mt-4 mb-0">{title}</h5>
        {data?.length > 8 && (
          <Link
            to="/#"
            style={{ fontSize: "17px", color: "#0c831f" }}
            className="text-decoration-none"
          >
            See all
          </Link>
        )}
      </div>

      
      {loading ? (
        <div className="flex mb-4" style={{ flexFlow: "wrap", gap: "0.83rem" }}>
          {skl?.map((sk, index) => (
            <CardSkeleton height={100} width={122.5} key={index} />
          ))}
        </div>
      ) : (
        <div className="flex " style={{ flexFlow: "wrap", gap: "0.83rem" }}>
          {data?.slice(0, 8).map((logo, index) => (
            <div
              key={index}
              className={`card-2 bg-11 wow animate__animated animate__fadeInUp brand-class flex items-center flex-col justify-center`}
              data-wow-delay={`.${index}s`}
            >
              <figure className="img-hover-scale overflow-hidden">
                <Link
                  to={{ pathname: "products", search: "sub_category=" + logo.name.replace(/\s+/g, '-') }}
                  state={{ value: logo.idbrand, type: "sub_category" }}
                >
                  <img
                    src={
                      logo.image === "no-image.png" ||
                      logo.image === "no-name.png"
                        ? product_1_1
                        : logo.image
                    }
                    alt={logo.description}
                  />
                </Link>
              </figure>
              <h6 className="heading-sm-1 ">
                <Link
                  to={{ pathname: "products", search: "brand=" + logo.name.replace(/\s+/g, '-') }}
                  state={{ value: logo.idbrand, type: "brand" }}
                  className="text-decoration-none"
                  style={{ fontSize: 12 }}
                >
                  {logo.name}
                </Link>
              </h6>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export { SubCatSection };
