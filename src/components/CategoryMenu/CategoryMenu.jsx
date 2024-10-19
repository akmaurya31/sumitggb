import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import React, { useEffect, useState } from "react";
import "./CategoryMenu.scss";

import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import { logout } from "Actions/loginotp/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const CategoryMenu = ({
  toggleDrawer,
  isTokenExpired,
  setIsTokenExpired,
  openRightDrawer,
  setOpenRightDrawer,
}) => {
  const { name } = useParams();

  const data = useSelector((state) => state.DashboardReducer.dashboardData);

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
      // console.log("enter");
      toggleDrawer("right", false);
    }
  }, [verify_result]);
  // Bottom Drawer
  const [openBottomDrawer, setOpenBottomDrawer] = React.useState(false);
  const [isLogout, setLogout] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [isActive, setActive] = useState("");

  const dispatch = useDispatch();

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

  const path = window.location.search;

// console.log("path", path)
// console.log("path data?.data?.menuList", data?.data?.menuList)

const queryString = path;

// Method 1: Using split()
const parts = queryString.split('=');
const stringAfterEqualsSign = parts.length > 1 ? parts[1] : '';

// console.log(stringAfterEqualsSign); // Output: "Breakfast-Foods"

// Method 2: Using substring()
const index = queryString.indexOf('=');
const pathName = index !== -1 ? queryString.substring(index + 1) : '';

// console.log("path pathName", pathName?.replace(/-/g, ' '));

  return (
    <>
      <div
        className={`content-right-drawer h-screen ${toggleDrawer == false && "active"
          }`}
      >
        <div className="flex items-center gap-4 px-3 pt-3">
          <WestRoundedIcon
            onClick={toggleDrawer("right", false)}
            className="close-btn"
          />
        </div>

        <div className="menu-link flex flex-col items-start gap-3 h-[93vh] overflow-y-auto pt-2 pb-6">
          {data?.data?.menuList?.map((mn, key) => {
            // console.log("path mn", mn.name + ' =====' + pathName)
            return (
              <div key={key} className={mn.name == pathName.replace(/-/g, ' ') ? "active" : ''}>
                <Link
             
                  to={{
                    pathname: "/products",
                    search:
                      "category=" + mn.name.replace(/\s+/g, "-"),
                  }}
                  state={{
                    value: mn.idcategory,
                    type: "category",
                    customavi:"avi126",
                  }}
                  className="no-underline block text-left"
                >
                  <div className="cat-itm">{mn?.name}</div>
                </Link>
              </div>
            );
          })}
        </div>

      </div>

    </>
  );
};

export default CategoryMenu;
