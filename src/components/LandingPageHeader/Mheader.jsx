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

const Mheader = (props) => {
   
  const { activepage } = props;
  const [open, setOpen] = React.useState(false);
  const [loginOpen, setloginOpen] = useState(false);
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

  const location = useSelector((state) => state.LocationReducer.location);
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


  return (
    <div className="mb-10 p-1 bg-[#fff] sm:bg-[#f19c64]" style={{ zIndex: 11111 }}>
      <div className="w-full">
        <div className="flex md:flex-nowrap sm:flex-wrap ml-5">
          
          {/* Logo Section */}
          <div className="w-[25%] max-w-[200px] sm:hidden md:block">
            <div className="logo" style={{ paddingRight: "2rem" }}>
              <Link to="/">
                <Img src={logo} alt="logo" />
              </Link>
            </div>
          </div>
          
          {/* Location Section */}
          <div className="sm:w-[80%] md:w-[25%] flex items-center justify-center">
            <div id="l-sec"  className="flex flex-col">
              <Link to="#" className="location no-underline">
                {slots_loading ? (
                  <Skeleton />
                ) : (
                  <h6 className="text-black text-base">
                    {Dilevery_location || "Delivery Not Available on this location"}
                  </h6>
                )}
                <p className="flex items-center text-sm text-black">
                  {location?.length > 20
                    ? `${location.slice(0, 20)}...`
                    : location || "Select Location"}
                  <AiFillCaretDown />
                </p>
              </Link>
            </div>
          </div>

          {/* User Icon Section */}
          <div className="hidden sm:flex sm:w-[20%] ml-auto pr-2 items-center justify-end">
            <div onClick={toggleDrawerRight("right", true)} className="user-icon">
              <AccountCircleOutlinedIcon className="w-8 h-8" />
            </div>
          </div>

          <div className="md:w-[25%] mx-auto sm:w-[100%] md:ml-5 sm:ml-0 sm:pl-0 sm:my-2 flex items-center justify-center md:pl-[30px]">
            <div className="search-style-3 w-full flex mx-auto items-center justify-center" style={{ marginBottom: 0 }}>
              <div className="input-style-test">
                <Link to="/s/">
                  <Input
                    id="marquee"
                    type="text"
                    value={searchValue}
                    className="marquee xs:w-[350px] w-[380px]"
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

          {/* Action Section for Smaller Screens */}
          <div className="w-[20%] sm:hidden pt-2">
            <div className="header-action-right">
              <div className="header-action-2 gap-4">
                {isTokenExpired ? (
                  <div className="header-action-icon-2">
                    <span className="loginmod text-decoration-none" onClick={() => setloginOpen(true)}>
                      <button>Login</button>
                    </span>
                    <LoginModel open={loginOpen} onCloseModal={onCloseModal} />
                  </div>
                ) : (
                  <div className="header-action-icon-2">
                    <Img className="svgInject" alt="User Icon" src={iconUser} />
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
                          <button className="link text-decoration-none" onClick={logoutUser}>
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
  );
};

export default Mheader;
