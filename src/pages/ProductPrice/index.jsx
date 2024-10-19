import { productPriceGet } from "Actions/products/action";
import axios from "axios";
import Breadcrumb from "components/Breadcrumb";
import LandingPageFooter from "components/LandingPageFooter";
import LandingPageHeader from "components/LandingPageHeader";
import { Loader } from "components/Loader";
import Product from "components/Product";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./ProductPrice.scss"

const ProductPricePage = (props) => {
  const dispatch = useDispatch();
  const { price } = useParams();
  const token = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.access_token
  );
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
      });
    };

    scrollToTop();
    return () => {};
  }, []);
  useEffect(() => {
    dispatch(
      productPriceGet("api/get-products-by-price", token, 2, parseInt(price))
    );
  }, [price]);
  const { product_result, product_loading } = useSelector(
    (state) => state.ProductPriceWiseListReducer
  );
  return (
    <>
      <LandingPageHeader />
      <main className="main">
        <div className="container-fluid mb-30 ">
          <div className="">
            {product_loading ? (
              <Loader />
            ) : (
              <>
                <Breadcrumb activepage={"Store based on price " + price} />
                {/* <div className="product-grid gridproduct-price "> */}
                <div className="product-price-grid">
                  {product_result?.data &&
                  Array.isArray(product_result?.data) ? (
                    product_result?.data?.map((product, index) => (
                      <div className="" key={index}>
                        <Product prd={product} key={product.idproduct_master} />
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <LandingPageFooter />
    </>
  );
};

export default ProductPricePage;
