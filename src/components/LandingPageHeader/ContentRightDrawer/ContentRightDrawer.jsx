import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import React, { useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import "./ContentRightDrawer.scss";

import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import DrawerBottom from "components/DrawerBottom/DrawerBottom";
import searchIcon from "../../../assets/images/img_search.svg";
import ContentBottomDrawer from "../ContentBottomDrawer/ContentBottomDrawer";
import { LoginMobileContent } from "./LoginMobileContent";
import { ProfileMenuLinks } from "pages/Profile/ProfileMenu";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "Actions/loginotp/action";
import AlertModal2 from "components/Alert/alert2";
import { BeatLoader } from "react-spinners";
import { SingleOrderGet } from "Actions/myoder/action";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const ContentRightDrawer = ({
  toggleDrawer,
  isTokenExpired,
  setIsTokenExpired,
  openRightDrawer,
  setOpenRightDrawer,
  id
}) => {
  const { name } = useParams();

  const navigate = useNavigate();
  const Navigate = (url) => {
    navigate(url);
  };

  const menuData = [
    { title: "Order History", icon: <LibraryBooksOutlinedIcon /> },
    { title: "Address", icon: <ContactMailOutlinedIcon /> },
    { title: "Wallet Details", icon: <AccountBalanceWalletOutlinedIcon /> },
    { title: "Logout", icon: <Person2OutlinedIcon /> },
  ];
  const { verify_result, verify_error, verify_loading } = useSelector(
    (state) => state.LoginOtpVerifyReducer
  );

  useEffect(() => {
    if (verify_result?.message === "Success") {
      toggleDrawer("right", false);
    }
  }, [verify_result]);
  // Bottom Drawer
  const [openBottomDrawer, setOpenBottomDrawer] = React.useState(false);
  const [isLogout, setLogout] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [isActive, setActive] = useState("");

  const dispatch = useDispatch();
  const location = useSelector((state) => state.LocationReducer.location);
  const { Dilevery_location } = useSelector((state) => state.DeliveryReducer);

  const toggleDrawerBottom2 = (newOpen) => () => {
    setOpenBottomDrawer(newOpen);
  };

  const OnClickMenu = (item) => {
    Navigate(item.link == "logout" ? item.link : `${item.link}`);
    setOpenRightDrawer("right", false);
    setActive(item.link);
  };

  const logoutUser = () => {
    setLogout(true);
  };
  const confirmLogout = () => {
    setLogout(false);
    dispatch(logout());
    setIsTokenExpired(true);
    setOpenRightDrawer("right", false);

    setTimeout(() => {
      setLoading(false);
      navigate("/", { replace: true });
    }, 200);
  };

  const path = window.location.pathname;

  // ======================
  const userData = useSelector(
    (state) => state.LoginOtpVerifyReducer
  );
  // console.log("userData", userData.currentmembership.membership_name)

  const returnMebershipname = (id) => {
    if (id == 2) {
      return "Wish Basket - Product";
    } else if (id == 3) {
      return "Wish Basket - land";
    } else if (id == 4) {
      return "Wish Basket - copartner";
    } else {
      return "Wish Basket - instant";
    }
  };

  return (
    <>
      {isTokenExpired == true ? (
        <>
          <LoginMobileContent
            toggleDrawer={toggleDrawer}
            setOpenRightDrawer={setOpenRightDrawer}
            openRightDrawer={openRightDrawer}
          />
        </>
      ) : (
        <div
          className={`content-right-drawer flex justify-between flex-col h-screen ${toggleDrawer == false && "active"
            }`}
        >
          <div className="">
            <div className="flex items-center gap-4 px-3 pt-3">
              <WestRoundedIcon
                onClick={toggleDrawer("right", false)}
                className="close-btn"
              />

              <div
                className=" flex justify-between items-center w-full"
                id="l-sec"
              >
                
                <div
                  onClick={toggleDrawerBottom2(true)}
                  className="location text-decoration-none w-4/5"
                >
                  {id === null ? (
                    <>
                      <h6 className="11title-head font-extrabold text-black mb-1 text-[14px]">
                        Delievery Not Available3
                      </h6>
                      <div className="flex gap-1 items-center ">
                        <p className="address-text flex items-center mb-0">
                          {location?.length > 20
                            ? location.slice(0, 20) + "..."
                            : location}
                        </p>
                        <AiFillCaretDown />
                      </div>
                    </>
                  ) : (
                    <>
                      <h6 className="11title-head font-extrabold text-black mb-1 text-[14px]">
                        {Dilevery_location}
                      </h6>
                      <div className="flex gap-1 items-center ">
                        <p className="address-text flex items-center mb-0">
                          {location?.length > 20
                            ? location.slice(0, 20) + "..."
                            : location}
                        </p>
                        <AiFillCaretDown />
                      </div>
                    </>
                  )}
                </div>

                <Link to="/s" className="user-icon">
                  <img src={searchIcon} className="w-7 h-7" />
                </Link>
              </div>
            </div>

            <div className="account-number p-3  ">
              <h5 className="font-semibold text-base mb-1 text-black capitalize ">{userData?.profile?.name ? userData?.profile?.name : "User"}</h5>
              <div className="flex gap-3 items-center font-semibold">
                <span>+91-{userData?.profile?.contact}</span>
                <span>
                  <FiberManualRecordIcon className="text-[6px]" />{" "}
                  {/* {console.log("userData", userData)} */}
                  {userData?.profile?.email ? userData?.profile?.email : "example@mail.com"}{" "}
                </span>
              </div>
              <span className="text-[#0c831f]">{returnMebershipname(userData.currentmembership.idmembership_plan)}</span>
            </div>

            <div className="info-sec">
              <p>Your Information</p>

              <div className="menu-items pb-24">
                {ProfileMenuLinks.map((item, key) => (
                  <>
                    {item.name === "Logout" ? (
                      <div className="nav-item" key={key}>
                        <button
                          className={`menu-item flex items-center gap-[12px] nav-link `}
                          id={item.link}
                          // data-bs-toggle="tab"
                          // to={"#"}
                          // role="tab"
                          // aria-controls={item.link}
                          // aria-selected="false"
                          onClick={logoutUser}
                        >
                          <span className="icon-box">{item.icon}</span>
                          <h6 className="font-medium">{item.name}</h6>
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => OnClickMenu(item)}
                        key={key}
                        className={`menu-item flex items-center gap-[12px] nav-link 
                      
                        ${isActive == item.link && " active "} 
                    `}
                      >
                        {/* {console.log("item.link",item.name)} */}
                        <span className="icon-box">{item.icon}</span>
                        <h6 className="font-medium">{item.name}</h6>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
          <AlertModal2 isOpen={isLogout} onClose={() => setLogout(false)}>
            <div style={{ width: 450, minHeight: 100, maxWidth: "100%" }}>
              <div
                className="pt-3"
                style={{ marginTop: "1rem", marginBottom: "1rem" }}
              >
                <p className="text-lg text-center">
                  Are you sure you want to logout?
                </p>
                <div className="flex items-center justify-end gap-2">
                  <button
                    className="button-normal w-full"
                    style={{ border: "unset", fontSize: 17 }}
                    onClick={() => setLogout(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="button-upgrade flex items-center justify-center w-full text-lg"
                    onClick={confirmLogout}
                    style={{ border: "unset", fontSize: 17 }}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </AlertModal2>
          <DrawerBottom
            id="drawer-bottom"
            toggleDrawer={toggleDrawerBottom2}
            openBottomDrawer={openBottomDrawer}
            content={
              <ContentBottomDrawer
                toggleDrawer={toggleDrawerBottom2}
                setOpenBottomDrawer={setOpenBottomDrawer}
              />
            }
          />
        </div>
      )}
    </>
  );
};

export default ContentRightDrawer;
