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
      <article className="flex items-start space-x-6 pt-2 pr-2">
        <img src={movie.image} alt="" width="60" height="88" className="flex-none rounded-md bg-slate-100" />
        <div className="min-w-0 relative flex-auto">


  {/* Exciting Deals  (Not Visible)  */}
  {package_data?.data?.[0]?.trigger_prod?.length > 0 ? (
                          <Accordion
                            style={{
                              borderRadius: "15px",
                              backgroundColor: "#fff",
                              // paddingLeft: 16,
                              paddingTop: 0,
                              // paddingRight: 16,
                              paddingBottom: 0,
                            }}
                          >
                            <AccordionSummary
                              expandIcon={<ArrowDropDownIcon />}
                              aria-controls="panel2-content"
                              id="panel2-header"
                            >
                              <h6 className="free-del-text mb-0">
                                Exciting Deals
                              </h6>
                            </AccordionSummary>
                            <AccordionDetails>
                              <div
                                style={{
                                  marginLeft: "0.35rem",
                                  marginTop: "-0.75rem",
                                }}
                              >
                                <Carousel {...thumbnailSettings}>
                                  {package_data?.data?.map((db, key) => {
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
                                  })}
                                </Carousel>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                        ) : (
                          package_data?.data?.[0]?.tagged_prod?.length > 0 && (
                            <Accordion
                              style={{
                                borderRadius: "15px",
                                backgroundColor: "#fff",
                                paddingLeft: 16,
                                paddingTop: 0,
                                paddingRight: 16,
                                paddingBottom: 0,
                                marginTop: 15,
                              }}
                              defaultExpanded={true}
                            >
                              <AccordionSummary
                                expandIcon={<ArrowDropDownIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                              >
                                <h6 className="free-del-text mb-0">
                                  Exciting Deals
                                </h6>
                              </AccordionSummary>
                              <AccordionDetails>
                                <div
                                  style={{
                                    marginLeft: "0.35rem",
                                    marginTop: "-0.75rem",
                                  }}
                                >
                                  <Carousel {...thumbnailSettings}>
                                    {package_data?.data?.map((db, key) => {
                                      return (
                                        <span
                                          key={key}
                                          className="exciting-deals flex flex-col justify-between"
                                        >
                                          {db?.name && (
                                            <div
                                              className={
                                                db?.name?.length > 10 &&
                                                "min-h-[50px]"
                                              }
                                            >
                                              <span className=" card-badge bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 text-center">
                                                {db?.name}
                                                {/* {console.log(
                                                          "db?.name",
                                                          db?.name
                                                        )} */}
                                              </span>
                                            </div>
                                          )}
                                          <div className="">
                                            {db?.tagged_prod?.map(
                                              (item, key1) => {
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
                                                        item?.selected_batch
                                                          ?.copartner == null &&
                                                        item?.selected_batch
                                                          ?.land == null
                                                      }
                                                    />
                                                    <div className="product-content-wrap p-2">
                                                      <div className="product-category"></div>
                                                      <div
                                                        style={{
                                                          height: 40,
                                                        }}
                                                      >
                                                        <h2>
                                                          <Link
                                                            to={`/prn/${item?.prod_name.replace(
                                                              /\s+/g,
                                                              "-"
                                                            )}/${
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
                                                            {new Intl.NumberFormat(
                                                              "en-US",
                                                              {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2,
                                                              }
                                                            ).format(
                                                              item?.selling_price
                                                            )}
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
                                                              fontWeight:
                                                                "bolder",
                                                            }}
                                                          ></div>

                                                          <div className="product-card-bottom mt-0 11">
                                                            <div
                                                              className="product-price"
                                                              style={{
                                                                fontSize:
                                                                  "20px",
                                                                color: "#000",
                                                                fontWeight:
                                                                  "bolder",
                                                              }}
                                                            ></div>
                                                            <div className="11add-cart add-btn">
                                                              {package_id !=
                                                              db.idpackage ? (
                                                                // <button className="button text-decoration-none btn-sm flex items-center gap-3 py-1 px-2">Apply</button>
                                                                <span
                                                                  className="button text-decoration-none btn-sm"
                                                                  onClick={() =>
                                                                    handleApply(
                                                                      db.idpackage
                                                                    )
                                                                  }
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
                                              }
                                            )}
                                          </div>
                                        </span>
                                      );
                                    })}
                                  </Carousel>
                                </div>
                              </AccordionDetails>
                            </Accordion>
                          )
                        )}




          <h2 className="font-semibold text-slate-900 truncate pr-20">{movie.title}</h2>
          <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
            <div className="absolute top-0 right-0 flex items-center space-x-1">
              <dt className="text-sky-500">
                <span className="sr-only">Star rating</span>
                <svg width="16" height="20" fill="currentColor">
                  <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z" />
                </svg>
              </dt>
              <dd>{movie.starRating}</dd>
            </div>
            <div>
              <dt className="sr-only">Rating</dt>
              <dd className="px-1.5 ring-1 ring-slate-200 rounded">{movie.rating}</dd>
            </div>
            <div className="ml-2">
              <dt className="sr-only">Year</dt>
              <dd>{movie.year}</dd>
            </div>
            <div>
              <dt className="sr-only">Genre</dt>
              <dd className="flex items-center">
                <svg width="2" height="2" fill="currentColor" className="mx-2 text-slate-300" aria-hidden="true">
                  <circle cx="1" cy="1" r="1" />
                </svg>
                {movie.genre}
              </dd>
            </div>
            <div>
              <dt className="sr-only">Runtime</dt>
              <dd className="flex items-center">
                <svg width="2" height="2" fill="currentColor" className="mx-2 text-slate-300" aria-hidden="true">
                  <circle cx="1" cy="1" r="1" />
                </svg>
                {movie.runtime}
              </dd>
            </div>
            <div className="flex-none w-full mt-2 font-normal">
              <dt className="sr-only">Cast</dt>
              <dd className="text-slate-400">{movie.cast}</dd>
            </div>
          </dl>
        </div>
      </article>
    )
  }
  