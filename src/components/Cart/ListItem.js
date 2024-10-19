import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FetchCartPost } from "Actions/cart/action";
import axios from "axios";
import { Img } from "components";
import { LoginModel } from "components/LandingPageHeader/LoginModel";
import { Loader } from "components/Loader";
import Product from "components/Product/index";
import { AddressModel } from "pages/Profile/AddressModel";
import React, { useEffect, useState } from "react";
import { BiSolidOffer } from "react-icons/bi";
import { FaFileLines } from "react-icons/fa6";
import { MdCardMembership } from "react-icons/md";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import fill from "../../styles/imgs/fill.png";
import Other from "../../styles/imgs/logo/Other.svg";
import nonvegicon from "../../styles/imgs/logo/nonvegicon.svg";
import vegicon from "../../styles/imgs/logo/vegicon.svg";
import ProductImage from "../Product/ProductImage";
import "./Cart.scss";
import { CartProdct } from "./CartProduct";
import { EmptyCart } from "./EmptyCart";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import moment from "moment";
import { fetchAllAddressData } from "Actions/address/action";
import { CleanOrder } from "Actions/myoder/action";
import { CouponCard } from "components/Cards";


// import Nav from './Nav.js'
// import NavItem from './NavItem.js'
// import List from './List.js'
// import ListItem from './ListItem.js'


export default function ListItem({ movie }) {

    const { package_data, package_loading, error, package_id } = useSelector(
        (state) => state.PackageReducer
      );
      const [selectDeal, setSelectDeal] = useState(package_id);

      const getIcons = (item) => {
        const ibadgeExists = "is_veg" in item;
        const ibadgeValue = ibadgeExists ? item.is_veg : 0;
        if (ibadgeExists) {
          // Key 'ibadge' exists
          return ibadgeValue === 1 ? (
            <Img className="veg-icon z-10" src={vegicon} alt="" />
          ) : (
            <Img className="veg-icon z-10" src={nonvegicon} alt="" />
          );
        } else {
          // Key 'ibadge' does not exist
          return <Img className="veg-icon z-10" src={Other} alt="" />;
        }
      };

      const thumbnailSettings = {
        responsive: {
          superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 2.1 },
          desktop: { breakpoint: { max: 3000, min: 1024 }, items: 2.1 },
          tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
          mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
        },
        arrows: true, // Show arrows for navigation
        renderButtonGroupOutside: true, // Render the button group outside the carousel
      };

      const handleApply = (packageId) => {
        setSelectDeal(packageId);
      };


    return (
      <>

{package_data?.data?.[0]?.trigger_prod?.length > 0 ? (
  package_data?.data?.map((db, key) => {
    return (
      <span key={key}>
        <div>
          <span className="card-badge bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 text-center">
            {db?.name}
          </span>
        </div>
        {db?.trigger_prod?.map((item, key1) => {
          return (
            <Product
              prd={item}
              key={key1}
              handleApply={handleApply}
              exiting_deal={db?.idpackage}
            />
          );
        })}
      </span>
    );
  })
) : (
  package_data?.data?.[0]?.tagged_prod?.length > 0 && (
    package_data?.data?.map((db, key) => {
      return (
        <span key={key} className="exciting-deals flex flex-col justify-between">
          {db?.name && (
            <div
              className={db?.name?.length > 10 ? "min-h-[50px]" : ""}
            >
              <span className="card-badge bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 text-center">
                {db?.name}
              </span>
            </div>
          )}

          {/* sho */}
          <div className="shadow-xl rounded">
            {db?.tagged_prod?.map((item, key1) => {
              return (
                <div
                  className="product-cart-wrap 11cart-width relative h-full"
                  key={key1}
                >
                  {getIcons(item)}
                  <ProductImage
                    prd={item}
                    style={true}
                    isHeight={
                      item?.selected_batch?.copartner == null &&
                      item?.selected_batch?.land == null
                    }
                  />
                  <div className="product-content-wrap p-2">
                    <div className="product-category"></div>
                    <div style={{ height: 40 }}>
                      <h2>
                        <Link
                          to={`/prn/${item?.prod_name.replace(/\s+/g, "-")}/${
                            item?.idproduct_master
                          }`}
                          className="text-decoration-none"
                        >
                          {item?.prod_name}
                        </Link>
                      </h2>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="product-price ">
                        <span className="block">
                          ₹
                          {new Intl.NumberFormat("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(item?.selling_price)}
                        </span>
                        <span className="old-price block m-0">
                          ₹{item?.mrp}
                        </span>
                      </div>

                      <div className="product-card-bottom mt-0">
                        <div
                          className="product-price"
                          style={{
                            fontSize: "20px",
                            color: "#000",
                            fontWeight: "bolder",
                          }}
                        ></div>

                        <div className="product-card-bottom mt-0 11">
                          <div
                            className="product-price"
                            style={{
                              fontSize: "20px",
                              color: "#000",
                              fontWeight: "bolder",
                            }}
                          ></div>
                          <div className="11add-cart add-btn">
                            {package_id !== db.idpackage ? (
                              <span
                                className="button text-decoration-none btn-sm"
                                onClick={() => handleApply(db.idpackage)}
                              >
                                Apply
                              </span>
                            ) : (
                              <span className="button text-decoration-none btn-sm">
                                Applied
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </span>
      );
    })
  )
)}
 
      </>
    )
  }
  