import { fetchDashboardData } from "Actions/dashboard/action";
import { Img, Input } from "components";
import Cart from "components/Cart";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../styles/imgs/logo/logo.png";
import iconUser from "../../styles/imgs/theme/icons/icon-user.svg";
import { productSearchGet } from "Actions/products/action";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// import ReactGoogleAutocomplete from "react-google-autocomplete";
const SearchHeader = (props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get("q");
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [visible, setVisible] = useState(true);
  const [searchValue, setSearchValue] = useState(searchParam);
  const [openRightDrawerMyCart, setOpenRightDrawerMyCart] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const dispatch = useDispatch();
  const data = useSelector((state) => state.DashboardReducer.dashboardData);
  const { search_history } = useSelector((state) => state.SearchListReducer);
  const navigate = useNavigate();
  const token = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.access_token
  );
  const token_date = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.expires_at
  );
  const id = useSelector(
    (state) => state.WarehouseReducer?.warehouseData
  );
  console.log("id", id);
  useEffect(() => {
    dispatch(fetchDashboardData());
  }, []);

  useEffect(() => {
    if (token === undefined && token_date === undefined) {
      setIsTokenExpired(true);
    } else {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      // console.log(token_date < currentTimestamp);
      setIsTokenExpired(token_date < currentTimestamp);
    }
  }, [isTokenExpired, token, token_date]);

  const onChangeSearch = (e) => {
    if (e === "") {
      setSearchValue(e);
      // navigate(`/s/`);
      dispatch(
        productSearchGet(
          "api/find-products",
          search_history ? search_history : "atta",
          token,
          id?.idstore_warehouse
        )
      );
    } else {
      if (e?.length % 2 == 0) {
        // navigate(`/s/?q=${e}`);
      }
        setSearchValue(e);
    }
  };

  useEffect(() => {
    if (searchParam !== null) {
      
      dispatch(
        productSearchGet(
          "api/find-products",
          searchParam,
          token,
          id && id.length>0&&id[0]?.idstore_warehouse
        )
      );
    } else {
      dispatch(
        productSearchGet(
          "api/find-products",
          search_history ? search_history : "atta",
          token,
          id && id.length>0&&id[0]?.idstore_warehouse
        )
      );
    }
  }, [location, searchParam]);
  // console.log("location", searchParam);

  const goBack = () => {
      navigate('/');
    // navigate(-1);
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchValue !== null && searchValue !== "") {
        navigate(`/s/?q=${searchValue}`);
      } else {
        // navigate(`/s/`);
      }
    }, 2000);

    return () => clearTimeout(delaySearch);
  }, [searchValue, navigate]);

  // console.log("location",location.pathname)
  return (
    <>
      <header className={"header-style-1"}>
        {/* <div className="mobile-promotion">
          <span>
            Grand opening, <strong>up to 15%</strong> off all items. Only{" "}
            <strong>3 days</strong> left
          </span>
        </div> */}

        <div className="header-middle header-middle-ptb-1 d-none ">
          <div className="container-fluid">
            <div className="header-wrap">
              <div className="logo logo-width-1">
                <Link to="/">
                  <Img src={logo} alt="logo" />
                </Link>
              </div>
              <div className="header-right">
                <div id="l-sec">
                  {id === undefined ? (
                    <Link to="#" className="location">
                      <h6>Delievery not Avalible</h6>
                    </Link>
                  ) : (
                    <Link to="#" className="location">
                      <h6>Delievery in 30 minutes</h6>
                      <span style={{ fontSize: "13px" }}>
                        {" "}
                        C-37, 1st Floor Parag{" "}
                      </span>
                    </Link>
                  )}
                </div>
                <div className="search-style-3">
                  <form action="#">
                    <Input id="search" type="text" />
                  </form>
                </div>
                <div className="header-action-right">
                  <div className="header-action-2">
                    <div className="search-location">
                      <form action="#">
                        <select className="select-active">
                          <option>Your Location</option>
                          <option>Alabama</option>
                          <option>Alaska</option>
                          <option>Arizona</option>
                          <option>Delaware</option>
                          <option>Florida</option>
                          <option>Georgia</option>
                          <option>Hawaii</option>
                          <option>Indiana</option>
                          <option>Maryland</option>
                          <option>Nevada</option>
                          <option>New Jersey</option>
                          <option>New Mexico</option>
                          <option>New York</option>
                        </select>
                      </form>
                    </div>
                    <div className="header-action-icon-2">
                      <Link to="#" className="loginmod">
                        Login
                      </Link>
                    </div>
                    <div className="header-action-icon-2">
                      <Link to="page-account.html">
                        <Img className="svgInject" alt="Nest" src={iconUser} />
                      </Link>
                      <Link to="page-account.html">
                        <span className="lable ml-0"></span>
                      </Link>
                      <div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
                        <ul>
                          <li>
                            <Link to="profile">
                              <i className="fi fi-rs-user mr-10"></i>My Account
                            </Link>
                          </li>

                          <li>
                            <Link to="index">
                              <i className="fi fi-rs-sign-out mr-10"></i>Log out
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="header-action-icon-2">
                      <Link
                        to="#"
                        className=" text-white "
                        data-bs-toggle="modal"
                        data-bs-target="#rightModal"
                        style={{
                          borderRadius: "5px",
                          backgroundColor: "rgb(12, 131, 31)",
                          fontSize: "13px",
                          padding: "15px 10px 15px 10px",
                        }}
                      >
                        <i
                          className="fa fa-cart-shopping"
                          style={{ color: "#f5f5f5" }}
                        ></i>{" "}
                        My Cart
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sticky-header sticky-bar 11 " style={{ zIndex: 11 }}>
          <div
            className="header-bottom header-bottom-bg-color header-bottom-bg-color  mb-10 p-1"
            // style={headerStyle}
            // style={{ zIndex: 1111 }}
          >
            <div className="container-fluid">
              <div className="mobile-view">
                <div className="search-box-mobile">
                  <ArrowBackIcon onClick={goBack} className="close-btn" />
                  <Input
                    id="marquee"
                    type="text"
                    value={searchValue}
                    onChange={onChangeSearch}
                    placeholder="Search for atta dal and more"
                  />
                </div>
              </div>

              <div className="header-wrap header-space-between position-relative">
                <div className="header-nav d-none d-lg-flex">
                  <div className="logo logo-width-1">
                    <Link to="/">
                      <Img src={logo} alt="logo" />
                    </Link>
                  </div>
                  <div className="header-devider"></div>
                </div>

                <div
                  className={`header-right   ${location.pathname == "/s/" ? 'search-full-width' : ''}`}
                  style={{ width: "88.25%", gap: 10 }}
                >
                  <div
                    className="desktop-view search-style-search"
                    style={{ marginBottom: 0, width: "100%" }}
                  >
                    <div
                      action="#"
                      className="input-style-test"
                      style={{ width: "100%" }}
                    >
                      <Input
                        id="marquee"
                        type="text"
                        value={searchValue}
                        onChange={onChangeSearch}
                        placeholder="Search for atta dal and more"
                      />
                    </div>
                  </div>

                  <div className="header-action-right">
                    <div className="header-action-2 gap-4">
                      <Cart openRightDrawer={openRightDrawerMyCart} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* <MobileMenu/> */}
    </>
  );
};

SearchHeader.defaultProps = {};

export default SearchHeader;
