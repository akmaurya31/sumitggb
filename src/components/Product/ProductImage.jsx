import React, { useState } from "react";
import { Img } from "components";
import vegicon from "../../styles/imgs/logo/vegicon.svg";
import product_1_1 from "../../styles/imgs/shop/product-1-1.jpg";
import no_image from "../../assets/images/no-image.jpeg";
import product_1_2 from "../../styles/imgs/shop/product-1-2.jpg";
import { Link } from "react-router-dom";
import "./ProductCard.scss";

const ProductImage = ({ prd, style, isHeight }) => {
  const item_id = prd?.batches
    ? prd?.batches[0]?.idproduct_master
      ? prd.batches[0].idproduct_master
      : prd?.idproduct_master
    : prd?.idproduct_master;


  return (
    <div className="product-img-action-wrap z-0 11">
      <div
        className="product-img product-img-zoom flex items-center justify-center"
        style={{ width: 130, height: isHeight ? 171 : 140, margin: "0px auto" }}
      >
        <Link to={`/prn/${prd?.prod_name?.replace(/[\s/]+/g, "-")}/${item_id}`}>
          <Img
            className="default-img"
            src={
              prd?.barcode
                ? process.env.REACT_APP_PRODUCTS_URL +
                  // ? process.env.REACT_APP_PRODUCTS_URL +
                  prd.barcode +
                  ".jpg"
                :  no_image
                // : product_1_1
            }
            alt={prd?.description}
            style={{ width: "100%" }}
            onError={(e) => {
              e.target.src = no_image;
              // e.target.src = product_1_1;
            }}
          />
          {/* <Img className="hover-img"
                        src={(prd?.barcode) ? process.env.REACT_APP_PRODUCTS_URL + prd.barcode + ".jpg" : product_1_2}
                        alt=""
                        style={{ width: '100%' }}
                        onError={(e) => { e.target.src = product_1_2 }} /> */}
        </Link>
      </div>
    </div>
  );
};

export default ProductImage;
