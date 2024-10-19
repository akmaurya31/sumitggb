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


import Nav from './Nav.js'
import NavItem from './NavItem.js'
import List from './List.js'
import ListItem from './ListItem.js'

export default function CartContent({ anchor, toggleDrawer, openRightDrawer, setOpenRightDrawer }) {

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const movies = [{
    image: "https://via.placeholder.com/60x88", // Placeholder image URL
    title: "The Adventures of Space Cats", // Movie title
    starRating: 4.5, // Star rating
    rating: "PG-13", // Movie rating
    year: 2024, // Release year
    genre: "Science Fiction", // Movie genre
    runtime: "2h 15m", // Movie runtime
    cast: "Jane Doe, John Smith, Alice Johnson" // Cast members
  },{
    image: "https://via.placeholder.com/60x88", // Placeholder image URL
    title: "The Adventures of Space Cats1", // Movie title
    starRating: 4.5, // Star rating
    rating: "PG-13", // Movie rating
    year: 2024, // Release year
    genre: "Science Fiction", // Movie genre
    runtime: "2h 15m", // Movie runtime
    cast: "Jane Doe, John Smith, Alice Johnson" // Cast members
  },
  {
    image: "https://via.placeholder.com/60x88", // Placeholder image URL
    title: "The Adventures of Space Cats1", // Movie title
    starRating: 4.5, // Star rating
    rating: "PG-13", // Movie rating
    year: 2024, // Release year
    genre: "Science Fiction", // Movie genre
    runtime: "2h 15m", // Movie runtime
    cast: "Jane Doe, John Smith, Alice Johnson" // Cast members
  },
  {
    image: "https://via.placeholder.com/60x88", // Placeholder image URL
    title: "The Adventures of Space Cats1", // Movie title
    starRating: 4.5, // Star rating
    rating: "PG-13", // Movie rating
    year: 2024, // Release year
    genre: "Science Fiction", // Movie genre
    runtime: "2h 15m", // Movie runtime
    cast: "Jane Doe, John Smith, Alice Johnson" // Cast members
  }];


  const { package_data, package_loading, error, package_id } = useSelector(
    (state) => state.PackageReducer
  );
  const [takeAddress, setTakeAddress] = useState(false);
  const { Coupon_data, Coupon_loading } = useSelector(
    (state) => state?.CouponReducer
  );
  const [selectDeal, setSelectDeal] = useState(package_id);
  const [storeid, setStoreid] = useState("");
  const [sendstoreid, sendsetStoreid] = useState("");
  const [isLoader, setLoader] = useState(false);
  const location=useLocation()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = useSelector((state) => {
    return state.WarehouseReducer?.warehouseData;
  });

  
  useEffect(() => {
    if (id && id?.length > 0) {
      sendsetStoreid(id[0].idstore_warehouse)
    } 
  }, [id]);


  const [loginOpen, setloginOpen] = useState(false);
  const [isChecked, setChecked] = useState({
    idcustomer_address: 0,
    checkbox_index: null,
    lat: null,
    long: null,
  });
  
  const { cart_result, cart_id, fetch_cart } = useSelector(
    (state) => state.CartReducer
  );
  const { Dilevery_location } = useSelector((state) => state.DeliveryReducer);
  const total = cart_result?.length
    ? cart_result.reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity,
        0
      )
    : 0;

  const { addressData } = useSelector((state) => state.AddressReducer);
  const token = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.access_token
  );
  
  const onLoginOpenModal = (anchor) => {
    setloginOpen(true);
    // setOpenRightDrawer({...openRightDrawer,right:false})
    if (token && total) {
      ClickCheckout(anchor);
    }
  };
  const onLoginCloseModal = () => setloginOpen(false);

  const ClickCheckout = (anchor) => {
   
    if (total>0) {
      
      dispatch(fetchAllAddressData(token, "customer-address"));
      setTakeAddress(true);
      // clear order_fetch states
      dispatch(CleanOrder());
    } else {
    
       setOpenRightDrawer({ ...openRightDrawer, [anchor]: false });
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };

  const token_date = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.expires_at
  );
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    // console.log("fffffsssmmm 5s",cart_id,storeid,sendstoreid)
    if (cart_id && sendstoreid) {
      let cart_object = {
        cart_id: cart_id,
        idstore: sendstoreid,
        discountAmount: 0,
        discountPercentage: 0,
        coupon: "",
        selectedNonGenPkgId: selectDeal ? selectDeal : package_id,
        isAppliedDynFxDis: 0,
      };
      dispatch(FetchCartPost("api/get-cart", cart_object, token));
    }
  }, [openRightDrawer, cart_result, selectDeal, sendstoreid]);
 
  const { membership_name, idmembership_plan } = useSelector(
    (state) => state.LoginOtpVerifyReducer?.currentmembership
  );

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
  const returnMebershipname = (id) => {
    if (id == 2) {
      return "Product - Wish Basket";
    } else if (id == 3) {
      return "Land - Wish Basket";
    } else if (id == 4) {
      return "Copartner - Wish Basket";
    } else {
      return "Instant Discount";
    }
  };
  const returnMebershipTitle = (id) => {
    if (id == 2) {
      return "Product";
    } else if (id == 3) {
      return "Land";
    } else if (id == 4) {
      return "Copartner";
    } else {
      return "Instant";
    }
  };
  const handleCheckboxChange = (
    event,
    idcustomer_address,
    checkbox_index,
    lat,
    long
  ) => {
    if (lat && long) {
      setLoader(true);
      const BASE_URL = process.env.REACT_APP_BASE_URL;
      axios
        .get(`${BASE_URL}/api/get-stores/${lat}/${long}`)
        .then((response) => {
          if (
            response &&
            response.data &&
            response.data.data &&
            response.data.data[0]
          ) {
            // setStoreid(response.data.data[0].idstore_warehouse);
            if (response.data && response.data.data.length > 1) {
              let store_ids = response.data.data.sort(
                (a, b) => a.distance_in_m - b.distance_in_m
              );
              setStoreid(store_ids[0]?.idstore_warehouse);
            } else {
              setStoreid(
                response.data.data[0]
                  ? response.data.data[0].idstore_warehouse
                  : ""
              );
            }
            setLoader(false);
          } else {
            setStoreid("");
            setLoader(false);
          }
        });
    }
    if (event.target.checked) {
      setChecked({
        idcustomer_address: idcustomer_address,
        checkbox_index: checkbox_index,
        lat: lat,
        long: long,
      });
    } else {
      setChecked({
        idcustomer_address: 0,
        checkbox_index: null,
        lat: null,
        long: null,
      });
    }
  };
  const handleApply = (packageId) => {
    setSelectDeal(packageId);
  };
  const returnvalue = (type) => {
    if (type == "RET") {
      return "return";
    }
    if (type == "EXCH") return "exchange";
  };
  const [cart_loading, setCartLoading] = useState(false);
  useEffect(() => {
    if (cart_result || takeAddress) {
      setCartLoading(true);
      setTimeout(() => {
        setCartLoading(false);
      }, 1500);
    }
  }, [openRightDrawer, takeAddress]);

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
  const isWithinReturnDuration = (createdDate, returnDuration) => {
    const today = moment();
    const diffInDays = today.diff(moment(), "days");
    // console.log("diffInDays", diffInDays);
    return diffInDays < returnDuration;
  };

  // console.log("takeAddress",takeAddress)

  const goBack = () => {
    setTakeAddress(false);
  };

  function getCurrentDate() {
    // Create a new Date object
    const currentDate = new Date();
    // Extract day, month, and year from the Date object
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const year = currentDate.getFullYear();
    // Construct the date string in DD/MM/YYYY format
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
  const currentDate = getCurrentDate();

  const goBackPrevPage = () => {
    navigate(-1);
  };
  const RetrunPR = (membership, mrp, instance, prodcut, land, coparter) => {
    if (membership == 1) {
      let instanceSaving = mrp - instance;
     
      return Math.round(((mrp - instanceSaving) / mrp) * 100);
    }
    if (membership == 2) {
      let prodcutSaving = mrp - prodcut;
      return Math.round(((mrp - prodcutSaving) / mrp) * 100);
    }
    if (membership == 3) {
      let landSaving = mrp - land;
      return Math.round(((mrp - landSaving) / mrp) * 100);
    }
    if (membership == 4) {
      let coparterSaving = mrp - coparter;
      return Math.round(((mrp - coparterSaving) / mrp) * 100);
    }
  };
  return (
    <>
      {/* {["right"].map((anchor) => ( */}
      {/* <React.Fragment key={anchor} > */}
      <>
        {/* <div className="header-action-icon-2">
              <button
                className=" text-white text-decoration-none flex items-center "
                style={{
                  borderRadius: "9px",
                  backgroundColor: "rgb(12, 131, 31)",
                  fontSize: "17px",
                  padding: "20px 15px",
                  color: "#f5f5f5",
                  fontWeight: 800,
                  gap: 8,
                }}
                onClick={toggleDrawer(anchor, true)}
              >
                <i className="fa fa-cart-shopping" style={{ fontSize: 17 }}></i>{" "}
                {total ? total + " items" : "My Cart"}
              </button>
            </div> */}

        {/* Drawer Start  */}

        <div className="my-cart-content-parent pb-24">
          <div
            className="modal-header"
            style={{
              zIndex: 1111,
              position: "sticky",
              background: "white",
              top: 0,
              borderBottom: "unset",
            }}
          >
            <div className="flex gap-3 items-center">
              {takeAddress == false ? (
                ""
              ) : (
                <ArrowBackIcon
                  onClick={goBack}
                  className="close-btn cursor-pointer"
                />
              )}
              <h5
                className="modal-title cart-header-title FixAug"
                id="rightModalLabel"
              >
                {total ? total + " items" : "My Cart"}
              </h5>
            </div>
            <button
              type="button"
              className="cart-header-title"
              onClick={
                toggleDrawer ? toggleDrawer("right", false) : goBackPrevPage
              }
            >
              <i className="fa fa-close "></i>
            </button>
          </div>
          <>
            {takeAddress == false ? (
              <>
                {cart_loading ? (
                  <div style={{ width: 395 }}>
                    <Loader />
                  </div>
                ) : (
                  <div className="modal-body 1 ">
                    {total ? (
                      <>
          <div className="flex justify-between items-center rounded width-[80%] max-auto px-4 mx-2 bg-blue-400 text-blue-950 py-2">
            <div className="flex flex-col">
              <span className="text-xs mb-2 font-bold">Your total Saving</span>
              <span className="text-xs">Flat Instant discount applied</span>
            </div>
            <div className="text-xs flex items-center justify-center ml-4 font-bold">
            <>
              {
                fetch_cart &&
                fetch_cart.cartItems &&
                fetch_cart.cartItems.items &&
                (() => {
                  const result = fetch_cart.cartItems.items.reduce((acc, item) => {
                    acc.total_mrp += item.mrp; // Add to total_mrp
                    acc.total_instant += item.instant; // Add to total_instant
                    return acc; // Return updated accumulator object
                  }, { total_mrp: 0, total_instant: 0 }); // Initial accumulator values

                  // Final calculation after reduce
                  return Math.round((result.total_mrp - result.total_instant) * 100) / 100;
                })()
              }
               (9%)
            </>
            </div>
          </div>
                        <div className="flex flex-col shadow-lg gap-4 rounded-[15px] bg-green-50 pt-[12px] pb-[16px] "
                        >
                          <div className="flex px-2 gap-1 items-center" >
                            <div style={{ width: 48, height: 48 }}>
                              <Img src={fill} style={{ width: "100%" }} />
                            </div>
                            <div className="">
                              <h6 className="free-del-text">
                                {Dilevery_location}
                              </h6>
                              <p className="ship-text">
                                {"Shipment of " + total + " items"}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-4 px-2 11">
                            {fetch_cart &&
                              fetch_cart?.cartItems?.items &&
                              fetch_cart.cartItems.items.map((cart, index) => (
                                <>
                                <CartProdct
                                  cart={cart}
                                  isChecked={false}
                                  key={index}
                                  idmembership_plan={idmembership_plan}
                                />
                                  <span className="text-xs font-bold text-green-900"> Instant Discount of  {Math.round(((cart?.mrp ?? 0) - (cart?.instant ?? 0))*100)/100 }  will be provided in card </span> 
                                </>
                              ))}
                            {fetch_cart?.tagProds?.map((db, key) => {
                              return (
                                <CartProdct
                                  cart={db}
                                  isChecked={false}
                                  key={key}
                                  deal={true}
                                  idmembership_plan={idmembership_plan}
                                />
                              );
                            })}
                          </div>
                        
                        </div>

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
                            <> 
                            
                            <div className="px-2 shadow-lg rounded   mt-4 mb-4 py-2">
                              <h6 className="free-del-text mb-0 flex items-center"  onClick={toggleModal}>
                              <svg class="h-4 w-4 text-blue-700 mr-2"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" />  <line x1="3.6" y1="15" x2="14.15" y2="15" />  <line x1="3.6" y1="15" x2="14.15" y2="15" transform="rotate(72 12 12)" />  <line x1="3.6" y1="15" x2="14.15" y2="15" transform="rotate(144 12 12)" />  <line x1="3.6" y1="15" x2="14.15" y2="15" transform="rotate(216 12 12)" />  <line x1="3.6" y1="15" x2="14.15" y2="15" transform="rotate(288 12 12)" /></svg>
                                  Avail Exciting Deals
                              </h6>
                            </div>


                            <div className="px-2 shadow-lg rounded   mt-4 mb-4 py-2">
                              <h6 className="free-del-text mb-0 flex items-center"  onClick={toggleModal}>
                              <svg class="h-4 w-4 text-blue-700 mr-2"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" />  <line x1="3.6" y1="15" x2="14.15" y2="15" />  <line x1="3.6" y1="15" x2="14.15" y2="15" transform="rotate(72 12 12)" />  <line x1="3.6" y1="15" x2="14.15" y2="15" transform="rotate(144 12 12)" />  <line x1="3.6" y1="15" x2="14.15" y2="15" transform="rotate(216 12 12)" />  <line x1="3.6" y1="15" x2="14.15" y2="15" transform="rotate(288 12 12)" /></svg>
                                  Apply Coupon
                              </h6>
                            </div>

                            


      <div className="">
        {isOpen && (
          <div
            className="fixed inset-0 z-50 w-screen overflow-y-hidden flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            onClick={toggleModal}
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50"></div>
            <div
              className="relative flex min-h-screen items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full max-w-sm overflow-y-auto shadow-2xl bg-white ring-1 ring-gray-200 rounded p-10">
                <div className="divide-y divide-slate-100 overflow-y-auto max-h-96">
                  {/* <Nav>
                    <NavItem href="/new" isActive>New Releases</NavItem>
                    <NavItem href="/top">Top Rated</NavItem>
                    <NavItem href="/picks">Vincent’s Picks</NavItem>
                  </Nav> */}
                  <List>
                    {movies.map((movie) => (
                      <ListItem key={movie.id} movie={movie} />
                    ))}
                  </List>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
</>
                          )
                        )}

                        {/* Bill Details */}
                        <div
                          className="mt-3 shadow"
                          style={{
                            borderRadius: "15px",
                            backgroundColor: "#fff",
                            paddingLeft: 16,
                            paddingTop: 12,
                            paddingRight: 16,
                            paddingBottom: 16,
                          }}
                        >
                          <h6
                            className="free-del-text"
                            style={{ paddingBottom: 10 }}
                          >
                            Bill Details
                          </h6>

                          <div className="flex justify-between items-center">
                            <div
                              className="flex item-center gap-1 sub-title"
                              style={{ paddingBottom: 5 }}
                            >
                              <FaFileLines />
                              Item MRP(Base)
                            </div>
                            <span className="sub-title">
                              ₹
                              {fetch_cart?.total &&
                                fetch_cart?.total.total?.toFixed(2)}
                            </span>
                          </div>

                          {/* <div className="flex justify-between items-center">
                                  <div
                                    className="flex item-center gap-1 sub-title"
                                    style={{ paddingBottom: 8 }}
                                  >
                                    Product Discount
                                  </div>
                                  <div className="flex gap-1">
                                    <span
                                      className="sub-title"
                                      style={{ color: "rgb(37 111 239 / 1)" }}
                                    >
                                      ₹
                                      {fetch_cart?.total &&
                                        new Intl.NumberFormat("en-US", {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2,
                                        }).format(fetch_cart?.total.discount)}
                                    </span>
                                  </div>
                                </div> */}

                          <div className="flex justify-between items-center">
                            <div
                              className="flex item-center gap-1 sub-title"
                              style={{ paddingBottom: 8 }}
                            >
                              <BiSolidOffer /> Coupon discount
                            </div>
                            <div className="flex gap-1">
                              <span
                                className="sub-title"
                                style={{ color: "rgb(37 111 239 / 1)" }}
                              >
                                ₹
                                {fetch_cart?.total &&
                                  new Intl.NumberFormat("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(fetch_cart?.total?.cdiscount)}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                                <div
                                  className="flex item-center gap-1 sub-title"
                                  style={{ paddingBottom: 8 }}
                                >
                                  <BiSolidOffer /> Flat Discount{" "}
                                  <span
                                    style={{
                                      color: "rgb(37 111 239 / 1)",
                                    }}
                                  >
                                    (
                                    {RetrunPR(
                                      1,
                                      fetch_cart?.total?.total,
                                      fetch_cart?.total?.discount,
                                      fetch_cart?.total?.product,
                                      fetch_cart?.total?.land,
                                      fetch_cart?.total?.copartner
                                    )}
                                    %)
                                  </span>
                                </div>
                                <div className="flex gap-1">
                                  <span
                                    className="sub-title"
                                    style={{
                                      color: "rgb(37 111 239 / 1)",
                                    }}
                                  >
                                    ₹{" "}
                                    {new Intl.NumberFormat("en-US", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }).format(fetch_cart?.total?.discount)}
                                  </span>
                                </div>
                              </div>
                          {idmembership_plan != 4 &&
                          idmembership_plan != 3 &&
                          idmembership_plan != 2 ? (
                            <>
                             
                              <div className="flex justify-between items-center">
                                <div
                                  className="flex item-center gap-1 sub-title"
                                  style={{ paddingBottom: 8 }}
                                >
                                  <MdCardMembership /> 
                                  {
                                    idmembership_plan != 4 &&
                                    idmembership_plan != 3 &&
                                    idmembership_plan != 2 ?"Discount Type":"Membership Name"
                                  }
                                  
                                </div>
                                <div className="flex gap-1">
                                  <span
                                    className="sub-title"
                                    style={{
                                      color: "rgb(37 111 239 / 1)",
                                    }}
                                  >
                                    {returnMebershipname(idmembership_plan)}
                                  </span>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex justify-between items-center">
                                <div
                                  className="flex item-center gap-1 sub-title"
                                  style={{ paddingBottom: 8 }}
                                >
                                  <BiSolidOffer />Cashback in wallet{" "}
                                  <span
                                    style={{
                                      color: "rgb(37 111 239 / 1)",
                                    }}
                                  >

                                    {
                                      RetrunPR(
                                        idmembership_plan,
                                        fetch_cart?.total?.total,
                                        fetch_cart?.total?.discount,
                                        fetch_cart?.total?.product,
                                        fetch_cart?.total?.land,
                                        fetch_cart?.total?.copartner
                                      )!==0&&(<>(
                                        {RetrunPR(
                                          idmembership_plan,
                                          fetch_cart?.total?.total,
                                          fetch_cart?.total?.discount,
                                          fetch_cart?.total?.product,
                                          fetch_cart?.total?.land,
                                          fetch_cart?.total?.copartner
                                        )}
                                        %)</>)
                                    }
                                  </span>
                                </div>
                                <div className="flex gap-1">
                                  {/* <span
                                          className="sub-title"
                                          style={{
                                            color: "rgb(37 111 239 / 1)",
                                          }}
                                        >
                                          ₹
                                          {fetch_cart?.total &&
                                            new Intl.NumberFormat("en-US", {
                                              minimumFractionDigits: 2,
                                              maximumFractionDigits: 2,
                                            }).format(
                                              fetch_cart?.total.discount
                                            )}
                                        </span> */}

                                  {idmembership_plan == 2 && (
                                    <span
                                      className="sub-title"
                                      style={{
                                        color: "rgb(37 111 239 / 1)",
                                      }}
                                    >
                                      ₹{" "}
                                      {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }).format(fetch_cart?.total?.product)}
                                    </span>
                                  )}
                                  {idmembership_plan == 3 && (
                                    <span
                                      className="sub-title"
                                      style={{
                                        color: "rgb(37 111 239 / 1)",
                                      }}
                                    >
                                      ₹{" "}
                                      {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }).format(fetch_cart?.total?.land)}
                                    </span>
                                  )}
                                  {idmembership_plan == 4 && (
                                    <span
                                      className="sub-title"
                                      style={{
                                        color: "rgb(37 111 239 / 1)",
                                      }}
                                    >
                                      ₹{" "}
                                      {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }).format(fetch_cart?.total?.copartner)}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <div
                                  className="flex item-center gap-1 sub-title"
                                  style={{ paddingBottom: 8 }}
                                >
                                  <MdCardMembership /> Membership Name
                                </div>
                                <div className="flex gap-1">
                                  <span
                                    className="sub-title"
                                    style={{
                                      color: "rgb(37 111 239 / 1)",
                                    }}
                                  >
                                    {returnMebershipname(idmembership_plan)}
                                  </span>
                                </div>
                              </div>
                            </>
                          )}

                          <div className="flex justify-between">
                            <h6 className="free-del-text2">Grands Total</h6>
                            <h6 className="free-del-text2">
                              {idmembership_plan && idmembership_plan == 1 ? (
                                <>
                                  ₹{" "}
                                  {total &&
                                    fetch_cart?.total &&
                                    new Intl.NumberFormat("en-US", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }).format(fetch_cart?.total?.grand)}
                                </>
                              ) : (
                                <>
                                  ₹{" "}
                                  {total &&
                                    fetch_cart?.total &&
                                    new Intl.NumberFormat("en-US", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }).format(fetch_cart?.total?.grand)}
                                </>
                              )}
                            </h6>
                          </div>

                          {idmembership_plan && idmembership_plan >= 2 && (
                            <div className="flex justify-between items-center">
                              <div
                                className="flex item-center gap-1 sub-title"
                                style={{
                                  paddingBottom: 0,
                                  color: "#0c831f",
                                }}
                              >
                                Extra cashbak will be credited in wallet
                              </div>
                            </div>
                          )}
                          {idmembership_plan && idmembership_plan === 1 && (
                            <>
                            <div className="flex justify-between items-center">
                              <div
                                className="flex item-center gap-1 sub-title"
                                style={{
                                  paddingBottom: 0,
                                  color: "#0c831f",
                                }}
                              >
                                Flat Discount will be provided
                              </div>
                            </div>
                            </>
                          )}
                          {idmembership_plan && idmembership_plan >= 2 && (
                            <div className="flex justify-between items-center cart-saving-root">
                              <div className="flex flex-col">
                                <span className="cart-saving-title">
                                Your total savings1
                                </span>
                                <span className="cart-saving-sub-title">
                                  {/* {returnMebershipname(idmembership_plan)}{" "} */}
                                  Flat Discount and cashback both
                                </span>
                              </div>
                              <div className="cart-saving-title">
                                {idmembership_plan == 1 && (
                                  <span className="cart-saving-title">
                                    ₹{" "}
                                    {new Intl.NumberFormat("en-US", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }).format(fetch_cart?.total?.discount)}
                                  </span>
                                )}
                                {idmembership_plan == 2 && (
                                  <span className="cart-saving-title">
                                    ₹{" "}
                                    {new Intl.NumberFormat("en-US", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }).format(fetch_cart?.total?.product+fetch_cart?.total?.discount)}
                                  </span>
                                )}
                                {idmembership_plan == 3 && (
                                  <span className="cart-saving-title">
                                    ₹{" "}
                                    {new Intl.NumberFormat("en-US", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }).format(fetch_cart?.total?.land+fetch_cart?.total?.discount)}
                                  </span>
                                )}
                                {idmembership_plan == 4 && (
                                  <span className="cart-saving-title">
                                    ₹{" "}
                                    {new Intl.NumberFormat("en-US", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }).format(fetch_cart?.total?.copartner+fetch_cart?.total?.discount)}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        {fetch_cart &&
                        fetch_cart?.cartItems?.items &&
                        fetch_cart?.cartItems?.items.length == 1 ? (
                          <>
                            {fetch_cart?.cartItems?.items[0].has_return_rule ===
                              "Y" &&
                            isWithinReturnDuration(
                              fetch_cart?.cartItems?.items[0]?.created_at,
                              fetch_cart?.cartItems?.items[0]?.return_duration
                            ) ? (
                              <>
                                <div
                                  className="mt-3 shadow-xl"
                                  style={{
                                    borderRadius: "15px",
                                    backgroundColor: "#fff",
                                    paddingLeft: 16,
                                    paddingTop: 12,
                                    paddingRight: 16,
                                    paddingBottom: 16,
                                  }}
                                >
                                  <h6 className="free-del-text">
                                    Cancellation Policy
                                  </h6>
                                  <p className="ship-text">
                                    This item will be{" "}
                                    {returnvalue(
                                      fetch_cart?.cartItems?.items[0]
                                        ?.return_type
                                    )}{" "}
                                    within duration of{" "}
                                    {
                                      fetch_cart?.cartItems?.items[0]
                                        ?.return_duration
                                    }{" "}
                                    day
                                  </p>
                                </div>
                              </>
                            ) : (
                              <div
                                className="mt-3 shadow">
                                <h6 className="free-del-text">Cancellation Policy1</h6>
                                <p className="ship-text">
                                Our cancellation and return policies vary depending on the product. Please review <a href={"/refund"} target="_blank">Cancellation Policy</a> for listed each product in your cart for accurate information.
                                </p>  
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="mt-2 rounded shadow p-3" >
                            <h6 className="font-bold">
                              Cancellation Policy
                            </h6>
                            <p className="text-sm pl-2">
                                Our cancellation and return policies vary depending on the product. Please review <a href={"/refund"} target="_blank">Cancellation Policy</a> for listed each product in your cart for accurate information.
                                </p>
                          </div>
                        )}
                      </>
                    ) : (
                      <EmptyCart />
                    )}
                  </div>
                )}
              </>
            ) : (
              <>
                {cart_loading ? (
                  <div style={{ width: 395 }}>
                    <Loader />
                  </div>
                ) : (
                  <div
                    className="modal-body 2"
                    style={{ background: "rgb(245, 247, 253)" }}
                  >
                    <div
                      className="flex justify-between p-3 pl-0 items-center gap-6 px-0"
                      style={{ paddingLeft: 0 }}
                    >
                      <div className=" pl-0">
                        {/* <p>Please Select Address</p> */}
                        <p className="text-sm leading-4">
                          Please select your delivery address
                        </p>
                      </div>
                      <div className=" rl-0 address-cart">
                        <AddressModel />
                      </div>
                      {/* {!storeid && isChecked?.idcustomer_address ? (
                              <div className="col-lg-12 rl-0">
                                <span style={{ fontSize: 12, color: "red" }}>
                                  {" "}
                                  We can't deliver at this address. Please
                                  select another
                                </span>
                              </div>
                            ) : (
                              ""
                            )} */}
                    </div>
                    {addressData && addressData.data?.length > 0 ? (
                      <div className="row">
                        <>
                          {addressData.data?.map((address, index) => {
                            return (
                              <div className="col-md-12" key={index}>
                                <div
                                  className="flex items-start gap-3 py-2"
                                  style={{ borderTop: "1px solid #eee" }}
                                >
                                  <div className="col-md-1">
                                    <input
                                      className="cursor-pointer"
                                      type="checkbox"
                                      checked={
                                        isChecked.checkbox_index == index
                                          ? true
                                          : false
                                      }
                                      onChange={(event) =>
                                        handleCheckboxChange(
                                          event,
                                          address.idcustomer_address,
                                          index,
                                          address.lat,
                                          address.long
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="col-md-9">
                                    <div className="card-body ">
                                      <h5 className="text-sm font-semibold mb-0">
                                        {address.tag}
                                      </h5>
                                      <address className="mb-0 text-xs">
                                        {address.name}, <br />
                                        {address.address}, {address.landmark},{" "}
                                        {address.pincode}
                                        <br />
                                        {address.phone}
                                      </address>
                                    </div>
                                  </div>
                                  <div
                                    className="col-md-2"
                                    // style={{ marginTop: "30px" }}
                                  >
                                    <AddressModel address={address} />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      </div>
                    ) : (
                      <div className="row">
                        <div
                          className="col-lg-12"
                          style={{ textAlign: "center" }}
                        >
                          <h5>You have no saved addresses</h5>
                          <p>Tell us where you want your orders delivered</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </>

          {/* Modal Footer  */}
          <div
            className="modal-footer"
            style={{
              zIndex: 5001,
              // position: "sticky",
              position: "fixed",
              bottom: "0px",
              minHeight: "94px",
              background: "white",
              width: "-webkit-fill-available",
              minWidth: "-moz-available",
            }}
          >
            {!storeid && isChecked?.idcustomer_address ? (
              <div className="col-lg-12 rl-0">
                <span className="items-center text-red-600 text-[12px] ml-2">
                  We can't deliver at this address. Please select another
                </span>
              </div>
            ) : (
              ""
            )}
            {!cart_loading && (
              <div className="cart-btn">
                {total > 0 && fetch_cart?.total && (
                  <div className="cart-total">
                    {idmembership_plan === 1 ? (
                      <span className="total-btn-price">
                        ₹
                        {new Intl.NumberFormat("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(fetch_cart?.total.grand)}
                      </span>
                    ) : (
                      <span className="total-btn-price">
                        ₹
                        {new Intl.NumberFormat("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(fetch_cart?.total.grand)}
                      </span>
                    )}

                    <span className="total-btn-title">TOTAL</span>
                  </div>
                )}
                {token == undefined ? (
                  <>
                    {token == undefined && total === 0 ? (
                      <div
                        className="cart-checkout total-btn-process"
                        onClick={() => ClickCheckout(anchor)}
                      >
                        Start Shopping
                        <i className="fa fa-angle-right"></i>
                      </div>
                    ) : (
                      <div
                        className="cart-checkout total-btn-process"
                        onClick={(e) => onLoginOpenModal(anchor)}
                      >
                        Login to proceed <i className="fa fa-angle-right"></i>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {takeAddress == false ? (
                      <div
                        className="add-cart add-cart-2 text-right"
                        onClick={() => ClickCheckout(anchor)}
                      >
                        <span
                          className="button text-decoration-none btn-m"
                          style={{ width: "100%", fontWeight: 600 }}
                        >
                          {total ? "Proceed" : "Start Shopping"}
                        </span>
                      </div>
                    ) : (
                      <>
                        {isLoader ? (
                          <div style={{ padding: 15 }}>
                            <BeatLoader color="white" size={10} />
                          </div>
                        ) : (
                          <>
                            {isChecked?.idcustomer_address && storeid ? (
                              <Link
                                className="add-cart add-cart-2 text-right"
                                to={"/checkout"}
                                state={{
                                  cart_id: cart_id,
                                  idstore: sendstoreid,
                                  discountAmount: "",
                                  discountPercentage: "",
                                  coupon: "",
                                  selectedNonGenPkgId: "",
                                  iddelivery_slots: 1,
                                  idcustomer_address:
                                    isChecked?.idcustomer_address,
                                  isAppliedDynFxDis: "",
                                }}
                              >
                                <span
                                  className="button text-decoration-none btn-m"
                                  style={{
                                    width: "100%",
                                    fontWeight: 600,
                                  }}
                                >
                                  Proceed To Pay
                                </span>
                              </Link>
                            ) : (
                              <div className="add-cart add-cart-2 text-right">
                                <span
                                  className="button text-decoration-none btn-m"
                                  style={{
                                    width: "100%",
                                    fontWeight: 600,
                                    color: "#ffffff82",
                                    cursor: "not-allowed",
                                  }}
                                >
                                  Select Address
                                </span>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <LoginModel open={loginOpen} onCloseModal={onLoginCloseModal} />

        {/* <AlertModal
              is_show={IsOpen}
              data={{ statusCode: 0 }}
              outtime="3000"
              Msg="test modal"
            /> */}
      </>
      {/* </React.Fragment> */}
      {/* ))} */}
    </>
  );
}
