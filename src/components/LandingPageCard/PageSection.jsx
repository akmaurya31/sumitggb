import { CardSlider } from "components/SlickSlider/CardSlider";
import "react-responsive-modal/styles.css";
import { CardSkeleton } from "./CardSkeleton";
import Product from "components/Product";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SectionTitle from "components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
export const PageSection = ({
  title,
  productData,
  loading,
  cartSlider,
  isSeeall,
}) => {
  // console.log("productData", productData);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },

    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const responsiveCart = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },

    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  // console.log("cartSlider", cartSlider)
  return (
    <>
      {/* <section className=" 11pb-2"> */}
      <div
        className="container-fluid"
        // style={{ paddingRight: 0 }}
      >
        <div
          className={`"section-title wow animate__animated animate__fadeIn flex justify-between items-center  " ${
            cartSlider == "cart" && "mb-2"
          }`}
          // style={{ paddingLeft: 10 }}
        >
          {
          cartSlider == 'cart' ? 
          productData?.length != 0 && (
            <h5 className="free-del-text mt-4 mb-0">{title}</h5>
          )
          :
          productData?.length != 0 && (
            <h5 className="section-home-head mt-4 mb-2">{title}</h5>
          )
          }
          {productData?.length > 5 && (
            <>
              {isSeeall && (
                <Link
                  to="/products"
                  style={{ fontSize: "17px", color: "#0c831f" }}
                  className="text-decoration-none"
                >
                  See all
                </Link>
              )}
            </>
          )}
        </div>

        <div className="">
          {cartSlider == "cart" ? (
            loading ? (
              <div className="sm:grid-cols-2 grid grid-cols-2 gap-2">
                <CardSkeleton height={240} width={""} />
                <CardSkeleton height={240} width={""} />
              </div>
            ) : (
              <Carousel responsive={responsiveCart}>
                {productData?.map((prd, index) => {
                  return <Product prd={prd} key={prd.idproduct_master} />;
                })}
              </Carousel>
            )
          ) : loading ? (
            <div
              className="sm:grid-cols-3 grid grid-cols-7 gap-3"
              style={{ flexFlow: "wrap" }}
            >
              <CardSkeleton height={240} width={""} />
              <CardSkeleton height={240} width={""} />
              <CardSkeleton height={240} width={""} />
              <CardSkeleton height={240} width={""} />
              <CardSkeleton height={240} width={""} />
            </div>
          ) : (
            <Carousel responsive={responsive}>
              {productData?.map((prd, index) => {
                return <Product prd={prd} key={prd.idproduct_master} />;
              })}
            </Carousel>
          )}

          {/* <CardSlider>
              {productData?.map((prd) => {
                return (
                  <Product prd={prd} key={prd.idproduct_master} />
                );
              })}
            </CardSlider> */}
        </div>
      </div>
      {/* </section> */}
    </>
  );
};
