import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { fetchAllAddressData } from "Actions/address/action";
import { FetchCartPost } from "Actions/cart/action";
import { CleanOrder } from "Actions/myoder/action";
import axios from "axios";
import { Img } from "components";
import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Other from "../../styles/imgs/logo/Other.svg";
import nonvegicon from "../../styles/imgs/logo/nonvegicon.svg";
import vegicon from "../../styles/imgs/logo/vegicon.svg";
import "./Cart.scss";

import moment from "moment";
import CartContent from "./CartContent";

export default function Cart({}) {
  const [openRightDrawer, setOpenRightDrawer] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const { package_data, package_loading, error, package_id } = useSelector(
    (state) => state.PackageReducer
  );
  const [takeAddress, setTakeAddress] = useState(false);
  const { Coupon_data, Coupon_loading } = useSelector(
    (state) => state?.CouponReducer
  );
  const [selectDeal, setSelectDeal] = useState(package_id);
  const [storeid, setStoreid] = useState("");
  const [isLoader, setLoader] = useState(false);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setTakeAddress(false);
    setOpenRightDrawer({ ...openRightDrawer, [anchor]: open });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = useSelector(
    (state) => state.WarehouseReducer?.warehouseData
  );
  useEffect(() => {
    if (id && id.length > 0) {
      setStoreid(id&&id?.length>0&&id[0]?.idstore_warehouse);
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

  // console.log("fetch_cart", fetch_cart.tagProds);

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
    if (fetch_cart?.total?.total) {
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
    if (cart_id && openRightDrawer?.right && id) {
      let cart_object = {
        cart_id: cart_id,
        idstore: storeid,
        discountAmount: 0,
        discountPercentage: 0,
        coupon: "",
        selectedNonGenPkgId: selectDeal ? selectDeal : package_id,
        isAppliedDynFxDis: 0,
      };
      dispatch(FetchCartPost("api/get-cart", cart_object, token));
    }
  }, [openRightDrawer, cart_result, selectDeal, id]);
  const { membership_name, idmembership_plan } = useSelector(
    (state) => state.LoginOtpVerifyReducer?.currentmembership
  );

  const thumbnailSettings = {
    responsive: {
      superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 2.1 },
      desktop: { breakpoint: { max: 3000, min: 1024 }, items: 2.1 },
      // tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
      // mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
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
      return "Instant - Wish Basket";
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

  return (
    <>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <>
            <div className="header-action-icon-2">
              <button
                className=" text-white text-decoration-none flex items-center min-w-28 text-xs lg:text-base"
                style={{
                  borderRadius: "9px",
                  backgroundColor: "rgb(12, 131, 31)",
                  // fontSize: "17px",
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
            </div>

            {/* Drawer Start  */}
            <SwipeableDrawer
              className="mycart-drawer-custom-style"
              id="mycart-drawer"
              anchor={anchor}
              open={openRightDrawer[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              <CartContent
                anchor={anchor}
                toggleDrawer={toggleDrawer}
                setOpenRightDrawer={setOpenRightDrawer}
                openRightDrawer={openRightDrawer}
              />
            </SwipeableDrawer>
          </>
        </React.Fragment>
      ))}
    </>
  );
}
