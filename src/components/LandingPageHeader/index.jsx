import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import WalletIcon from "@mui/icons-material/Wallet";
import { fetchCouponData } from "Actions/coupon/action";
import { fetchDashboardData } from "Actions/dashboard/action";
import { storeDileverySlots } from "Actions/location/action";
import { logout } from "Actions/loginotp/action";
import { Slots } from "Actions/myoder/action";
import { fetchPackageData } from "Actions/package/action";
import NotFoundImage from "assets/images/notFound.png";
import { Img, Input, Text } from "components";
import Cart from "components/Cart";
import DrawerBottom from "components/DrawerBottom/DrawerBottom";
import DrawerRight from "components/DrawerRight/DrawerRight";
import { PageLoader } from "components/PageLoader";
import ViewCartButton from "components/ViewCartButton";
import React, { useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-responsive-modal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../styles/imgs/logo/logo.png";
import iconUser from "../../styles/imgs/theme/icons/icon-user.svg";
import ContentBottomDrawer from "./ContentBottomDrawer/ContentBottomDrawer";
import ContentRightDrawer from "./ContentRightDrawer/ContentRightDrawer";
import "./LandingPageHeader.scss";
import LocationComponent from "./LocationButton";
import { LoginModel } from "./LoginModel";
import MapWithAutocomplete from "./MapAutoComplete";
import MenuListComposition from "./MoreOption";
import "./marquee.css";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
// import Mheader from "./Mheader";



const LandingPageHeader = (props) => {
  const { activepage } = props;
  const [open, setOpen] = React.useState(false);
  const [loginOpen, setloginOpen] = useState(false);
  const [tclass, setTclass] = useState("");
  const [tclass1, setTclass1] = useState("");



  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth <= 480);
  // console.log(isMobile,isSmallMobile,"isSmallMobileisSmallMobileisSmallMobile22");
  useEffect(() => {
    const handleResize = () => {
      const smallMobile = window.innerWidth <= 480;
      setIsSmallMobile(smallMobile);
      if (smallMobile) {
        setTclass("");
        setTclass1("marquee  xs:w-[350px] w-[380px]");
      } else {
        setTclass("md:w-[35%] mx-auto sm:w-[100%] md:ml-5 sm:ml-0 sm:pl-0 sm:my-2 flex items-center justify-center md:pl-[30px]"); // Set your desired class for larger screens
        setTclass1("marquee  xs:w-[350px] w-[500px]");
      }
    };

    // Set initial class
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Run this effect once on mount


  const [isTokenExpired, setIsTokenExpired] = useState(false);

  const [isVisible, setIsVisible] = useState(true);
  const handleClose = () => {
    setIsVisible(false); // Hide the banner
  };

  const [location1, setLocation] = useState("location loading...");
  const [isNotFound, setNotFound] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [loadingLogout, setLoading] = useState(false);
  const { loading } = useSelector((state) => state.DashboardReducer);
  const { slots, slots_loading } = useSelector((state) => state.Slots);
  const cat = useSelector(
    (state) => state?.DashboardReducer?.dashboardData?.data?.menuList
  );
  const [placeholders, setPlaceholders] = useState([
    {
      name: "milk",
    },
    {
      name: "Baby Care",
    },
    {
      name: "Breakfast Foods",
    },
    {
      name: "Personal Care",
    },
  ]);

  useEffect(() => {
    if (!loading && cat) {
      setPlaceholders(cat);
    }
  }, [loading, cat]);
  useEffect(() => {
    // Rotate placeholders
    const intervalId = setInterval(() => {
      setPlaceholders((prevPlaceholders) => [
        ...prevPlaceholders.slice(1),
        prevPlaceholders[0],
      ]);
    }, 1500); // Change the duration as needed

    return () => clearInterval(intervalId);
  }, []);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.DashboardReducer.dashboardData);

  let location = useSelector((state) => state.LocationReducer.location);
  const navigate = useNavigate();

  const token = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.access_token
  );
  const token_date = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.expires_at
  );
  const storeids = useSelector(
    (state) => state.WarehouseReducer?.warehouseData
  );
  // console.log("storeids", storeids);
  const [id, setStoreid] = useState("");

  useEffect(() => {
    if (storeids) {
      if (storeids?.length > 0) {
        setOpen(false);
      } else {
        setStoreid(null);
        setOpen(false);
      }
    }
  }, [storeids]);
  const { Dilevery_location } = useSelector((state) => state.DeliveryReducer);
  const locationPath = useLocation();
  useEffect(() => {
    if (storeids && storeids.length>0) {
      setOpen(false);
      setNotFound(false);
    }
  }, [storeids, location1, location]);

  useEffect(() => {
    // Check if token and token_date are undefined
    if (token === undefined && token_date === undefined) {
      setIsTokenExpired(true);
    }
  
    // Set idstore_warehouse to 3 if storeids is not available or empty
    const storeId = storeids[0]?.idstore_warehouse
    if(storeId===false || storeId<0){
        location="";
    } 
  
    // // If idstore_warehouse is undefined, set it to 3
    // if (storeId === undefined) {
    //   // Store ID will already be 3 if storeids is not available or empty
    //   storeId = 3;
    // }
  
    // Dispatch actions with storeId
    dispatch(
      fetchPackageData(null, "api/get-packages", storeId)
    );
    dispatch(
      fetchCouponData("api/get-coupons", null, storeId)
    );
    dispatch(Slots(null, storeId));
  
  
    // Handle token expiration logic
    if (token === undefined && token_date === undefined) {
      setIsTokenExpired(true);
      dispatch(fetchDashboardData(null, storeId));
    } else {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      setIsTokenExpired(token_date < currentTimestamp);
      dispatch(fetchDashboardData(token, storeId));
    }
  }, [isTokenExpired, token, token_date, storeids, location1, location]);
  
  

  useEffect(() => {
    if (location === null) {
      setOpen(true);
    } else {
      if (storeids&&storeids?.length > 0) {
       
        setOpen(false);
      } else {
        setStoreid(null);
        setOpen(false);
      }
    }
  }, [location, storeids, location1]);
  const logoutUser = () => {
    setLoading(true);
    dispatch(logout());
    setIsTokenExpired(true);
    navigate("/", { replace: true });
    setTimeout(() => {
      setLoading(false);
    }, 1800);
  };

  const SearchClick = () => {
    const search = "search=" + searchValue;

    navigate(`/products`, {
      replace: true,
      search,
      state: { type: "search", value: searchValue },
    });
  };
  const onChangeSearch = (e) => {
    setSearchValue(e);
  };
  const handleEnterKeyPressSearch = (event) => {
    if (event.key === "Enter") {
      setTimeout(() => {
        SearchClick();
      }, 500);
    }
  };

  // Bottom Drawer
  const [openBottomDrawer, setOpenBottomDrawer] = React.useState(false);

  const toggleDrawerBottom = (newOpen) => () => {
    setOpenBottomDrawer(newOpen);
  };

  // Right Drawer
  const [openRightDrawer, setOpenRightDrawer] = React.useState({
    right: false,
  });

  const toggleDrawerRight = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenRightDrawer({ ...openRightDrawer, [anchor]: open });
  };
  const onCloseModal = () => setloginOpen(false);

  // console.log("openRightDrawer",openRightDrawer)

  // My Cart
  const [openRightDrawerMyCart, setOpenRightDrawerMyCart] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const goBack = () => {
    navigate(-1);
  };
 
  
  const isWithinTimeRange = () => {
    const currentTime = moment();
    const currentDate = moment().format('YYYY-MM-DD');
    const isCurrentDate=slots?.some((dt)=>dt.date==currentDate)
    const slotsForCurrentDate = slots?.find(item => item.date === currentDate);
    const futureSlots = slotsForCurrentDate?.slots?.filter(slot => moment(slot.start, 'h:mm a').isAfter(currentTime));
    // console.log("futureSlots",isCurrentDate)

    if(!isCurrentDate){
      //"No Delivery Slots Available For Today"
      dispatch(storeDileverySlots("Delievery Not Available"));
    }
    else{
     
      const startTime = moment(slotsForCurrentDate.slots[0].end, 'h:mm a');
    
    // Calculate the difference
    const diff = moment.duration(startTime.diff(currentTime));
    const hours = Math.floor(diff.asHours());
    if(hours===0){
      dispatch(storeDileverySlots(`Earliest delivery in 30 minutes`));
    }
    else{
      dispatch(storeDileverySlots(`Earliest delivery in ${hours} hour`));
    }
      
    }
    // if (currentTime >= 10 && currentTime <= 19) {
    //   dispatch(storeDileverySlots("Earliest delivery in one hour"));
    //   return "Earliest delivery in one hour";
    // } else {
    //   dispatch(storeDileverySlots("Next-day delivery available"));
    //   return "Next-day delivery available";
    // }
  };

  
  useEffect(() => {
    if(storeids && storeids.length>0){
      isWithinTimeRange();
    }
  }, [storeids,location,location1,slots_loading]);

  // View Cart button
  const { cart_result, cart_id, fetch_cart } = useSelector(
    (state) => state.CartReducer
  );
  const total = cart_result?.length
    ? cart_result.reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity,
        0
      )
    : 0;

  // ====================
  const path = window.location.search;
  const queryString = path;
  const parts = queryString.split("=");
  const stringAfterEqualsSign = parts.length > 1 ? parts[1] : "";
  const index = queryString.indexOf("=");
  const path1 = index !== -1 ? queryString.substring(index + 1) : "";
  const pathName = path1?.replace(/-/g, " ");
  // console.log("path pathName", pathName?.replace(/-/g, ' '));

  const NaviProfile = () => {
    navigate("/mycart");
  };
 
  // console.log("location",locationPath.pathname )


  return (
    <>
      {loadingLogout ? (
        <PageLoader />
      ) : (
        <>
          <header className={"header-style-1"}>
            <div className="mobile-promotion"></div>           

            <div className="sticky-header sticky-bar" style={{ zIndex: 11111 }}>
           { isVisible && (

            <div className="w-full bg-[#328616] relative top-0 z-[2147483647] hidden sm:block pb-2" role="dialog" aria-label="App promotion banner">
            <div className="grid grid-cols-[9%,61%,30%]">
              {/* Close Button Section */}
              <div className="mt-[1.5em] ml-[0.8em]">
                <div className="flex justify-center">
                  <div className="flex p-[0.2em]" role="button" tabIndex="0" aria-label="Close banner" onClick={handleClose}>
                    <svg className="rounded-full w-[1.8em] h-[1.8em] p-[0.2em] bg-transparent" viewBox="0 0 24 24" fill="none">
                      <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="rgba(0, 0, 0, 1)"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* App Promotion Section */}
              <div className="flex justify-start">
                <div className="ml-[0.5em] mt-[1em]">
                  <div className="flex flex-col items-start">
                    <div className="flex justify-center">
                      <img className="w-[2.8em] h-[2.8em] min-w-[2.8em] min-h-[2.8em] bg-[#fff] p-1 rounded-md" src={logo} alt="App logo" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center w-full p-[0.6em]">
                  <div className="overflow-hidden max-h-[15em]">
                    <div className="my-[0.2em] mx-[1em]">
                      <div className="text-left">
                        <span role="heading" aria-level="2" className="font-poppins text-[14px] font-medium text-white capitalize leading-[120%] whitespace-pre-wrap break-words">
                        सोच बदलो दुकान बदलो
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button Section */}
              <div className="mt-[1em] mr-[1em]">
                <div className="flex justify-center w-full">
                  <div className="border-transparent rounded-[1em] bg-black h-[1.7em] flex items-center justify-center w-full">
                    <a href="https://play.google.com/store/apps/details?id=com.ghargharbazaar.ggbagent&hl=hi" target="_blank" rel="noopener noreferrer">
                      <button className="text-white text-[14px] p-2 font-poppins font-medium bg-transparent h-full w-full m-2 border-transparent">
                        Use App
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            </div>
                      )}
              
{/* Mheader */}

<div className="mb-10 p-1 bg-[#fff] sm:bg-[#f19c64]" style={{ zIndex: 11111 }} >
    
<div className="w-full">
  <div className="flex md:flex-nowrap sm:flex-wrap ml-5">
    {/* Logo Section */}
    <div className="w-[35%] max-w-[200px] sm:hidden md:block">
      <div className="logo" style={{ paddingRight: "2rem" }}>
        <Link to="/">
          <Img src={logo} alt="logo" />
        </Link>
      </div>
    </div>

    {/* Location Section */}

    <div className="sm:w-[80%] md:w-[25%]  flex items-center justify-center ">
      <div id="l-sec" 
       onClick={() => {
        if (window.innerWidth < 640) { 
          // console.log(window.innerWidth," toggleDrawerBottom window.innerWidthwindow.innerWidthwindow.innerWidth"); // sm screen size in Tailwind is below 640px
          toggleDrawerBottom(true)();  // Trigger this on small screens only
        } else {
          // console.log(window.innerWidth,"setOpen window.innerWidthwindow.innerWidthwindow.innerWidth");
          setOpen(true);  // For larger screens
        }
      }} 
      className=" flex flex-col">
        <Link to="#" className="location no-underline">
          {slots_loading ? (
            <Skeleton />
          ) : (
            <h6 className="text-black text-base">
              {Dilevery_location || "Delivery Not Available on this location"}
            </h6>
          )}
          
          <p className="flex items-center text-sm text-black">
            {location?.length > 40
              ? location.slice(0, 40) + "..."
              : location || "Select Location"}
            <AiFillCaretDown />
          </p>
        </Link>
      </div>
    </div>

    <div class="hidden sm:flex sm:w-[20%] ml-auto pr-2 items-center justify-end">
      <div
                          onClick={toggleDrawerRight("right", true)}
                          className="user-icon"
                        >
                          <AccountCircleOutlinedIcon className="w-8 h-8" />
                        </div></div>

    {/* Search Section */}
    <div className={tclass}>
      <div className="search-style-3 w-full flex mx-auto items-center justify-center "  style={{ marginBottom: 0 }}>
        <div className="input-style-test">
          <Link to="/s/">
            <Input
              id="marquee"
              type="text"
              value={searchValue}
              className={tclass1}
              wrapClassName="input-container"
              onChange={onChangeSearch}
              onKeyDown={handleEnterKeyPressSearch}
            />
            <label htmlFor="username" className="label">
              Search "{placeholders[0]?.name}"
            </label>
          </Link>
        </div>
      </div>
    </div>

    <div className="w-[20%]  sm:hidden  pt-2    ">
      <div className="header-action-right">
        <div className="header-action-2 gap-4">
          {isTokenExpired ? (
            <div className="header-action-icon-2">
              <Text className="loginmod text-decoration-none" onClick={() => setloginOpen(true)}>
                <button>Login</button>
              </Text>
              <LoginModel open={loginOpen} onCloseModal={onCloseModal} />
            </div>
          ) : (
            <div className="header-action-icon-2">
              <Img className="svgInject" alt="Nest" src={iconUser} />
              <span className="label ml-0"></span>
              <div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
                <ul className="pl-0">
                  {[
                    { title: "My Account", link: "/profile/account", icon: <AccountCircleOutlinedIcon /> },
                    { title: "Passbook", link: "/profile/passbook", icon: <WalletIcon /> },
                    { title: "Order", link: "/profile/orders", icon: <ListAltOutlinedIcon /> },
                  ].map((db, key) => (
                    <li key={key}>
                      <button onClick={() => navigate(db.link)} className="link text-decoration-none">
                        {db.icon}
                        {db.title}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button className="link text-decoration-none" onClick={() => logoutUser()}>
                      <PowerSettingsNewIcon />
                      Log out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {locationPath.pathname !== "/checkout" && (
            <Cart
              openRightDrawer={openRightDrawerMyCart}
              setOpenRightDrawer={setOpenRightDrawerMyCart}
            />
          )}
        </div>
      </div>
    </div>

    
  </div>
</div>
 
              </div>

 {/* <Mheader/> */}
 

                  {/* Bottom Drawer Open onclick Header Address  */}
                    <DrawerBottom
                        id="drawer-bottom"
                        toggleDrawer={toggleDrawerBottom}
                        openBottomDrawer={openBottomDrawer}
                        content={
                          <ContentBottomDrawer
                            toggleDrawer={toggleDrawerBottom}
                          />
                        }
                      />

                    {/* Right Drawer Open onclick Header User Icon  */}
                    <DrawerRight
                      toggleDrawer={toggleDrawerRight}
                      openRightDrawer={openRightDrawer}
                      content={
                        <ContentRightDrawer
                          toggleDrawer={toggleDrawerRight}
                          isTokenExpired={isTokenExpired}
                          setIsTokenExpired={setIsTokenExpired}
                          openRightDrawer={openRightDrawer}
                          setOpenRightDrawer={setOpenRightDrawer}
                        />
                      }
                    />




              {locationPath.pathname === "/" ? null : (
                <>
                  <div className="desktop-view">
                    <div className="cat-hader">
                      <div className="cat-contaner flex gap-2">
                        {data?.data?.menuList?.slice(0, 7).map((mn, key) => {
                          // console.log("pathName == mn?.name", pathName + " == " + mn?.name)
                          // console.log("pathName == mn?.name", pathName == mn?.name)
                          return (
                            <>
                              <Link
                                key={key}
                                to={{
                                  pathname: "/products",
                                  search:
                                    "category=" + mn.name.replace(/\s+/g, "-"),
                                }}
                                state={{
                                  value: mn.idcategory,
                                  type: "category",
                                  customavi:"avi508",
                                }}
                                className={`"no-underline" `}
                              >
                                <div
                                  className={`${
                                    pathName == mn?.name
                                      ? "cat-itm active text-green-600"
                                      : "cat-itm"
                                  }`}
                                >
                                  {mn?.name}
                                </div>
                              </Link>
                            </>
                          );
                        })}
                        <MenuListComposition
                          pathName={pathName}
                          data={data?.data?.menuList?.slice(
                            8,
                            data?.data?.menuList?.length
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </header>
          {/* <MobileMenu/> */}
          <div className="modal-root-dilog">
            <Modal
              open={open}
              onClose={() => {
                setOpen(false);
                setNotFound(false);
              }}
              classNames={{
                modal: "customModal",
              }}
            >
              <div>
  {location?.length > 1 ? (
       <>
       <span className="text-sm text-blod">Change Location</span>
       </>
     ):(
      <> <h6 className="mb-3 text-xs">Welcome to                  
      <span className="text-green-900 font-bold ml-1"> GharGharBazaar</span></h6>

      <div className="my-2">
      <div className="flex mb-2">
        <div className="w-10 h-12">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
        </div>
        <div className="ml-4 text-sm please-provide-your">
           Please provide your delivery location to see <br/>products at nearby store
        </div>
      </div>
    </div>
    </>
     )}

    <div className="my-2">
        <div className="flex">
                  <LocationComponent
                    setLocation={setLocation}
                    setOpen={setOpen}
                    setNotFound={setNotFound}
                    setMobileLoading={() => {}}
                    // setLoadingLocation={()=>{}}
                  />
                  <div className="flex items-center" >
                    <div style={{ color: "#bbb" }}>-</div>
                    <div
                      style={{
                        color: "#7E7E7E",
                        fontSize: 11,
                        fontWeight: 700,
                        borderRadius: "100%",
                        border: "1px solid #bbb",
                        marginLeft: "0px",
                        width: 32,
                        height: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      OR
                    </div>
                    <div>
                      <div style={{ color: "#bbb" }}>-</div>
                    </div>
                  </div>
                  <MapWithAutocomplete
                    setLocation={setLocation}
                    setNotFound={setNotFound}
                    setOpen={setOpen}
                  />
                </div>
                {id == undefined && isNotFound && (
                  <>
                  {/* <div className="flex flex-col items-center justify-center mt-4">
                    <Img src={NotFoundImage} style={{ width: "27%" }} />
                        <input
                          type="text"
                          placeholder="Enter a location3"
                          className="form-control"
                          style={{ borderRadius: "12px",  border: "1px solid #504960", height: 43 }}
                        />
                  </div> */}
                  </>
                )}
              </div>
          </div>
            </Modal>
            {locationPath.pathname === "/" ? null : (
              <>
              </>
            )}
          </div>
          <ViewCartButton />
        </>
      )}
    </>
  );
};

LandingPageHeader.defaultProps = {};

export default LandingPageHeader;
