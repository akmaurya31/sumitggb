import React, { useState } from "react";
import { Img } from "components";
import banner9 from "../../styles/imgs/banner/banner-9.png";
import iconLocation from "../../styles/imgs/theme/icons/icon-location.svg";
import iconContact from "../../styles/imgs/theme/icons/icon-contact.svg";
import iconEmail2 from "../../styles/imgs/theme/icons/icon-email-2.svg";
import iconClock from "../../styles/imgs/theme/icons/icon-clock.svg";
import phoneCall from "../../styles/imgs/theme/icons/phone-call.svg";
import iconFacebookWhite from "../../styles/imgs/theme/icons/icon-facebook-white.svg";
import iconTwitterWhite from "../../styles/imgs/theme/icons/icon-twitter-white.svg";
import iconInstagramWhite from "../../styles/imgs/theme/icons/icon-instagram-white.svg";
import iconPinterestWhite from "../../styles/imgs/theme/icons/icon-pinterest-white.svg";
import iconYoutubeWhite from "../../styles/imgs/theme/icons/icon-youtube-white.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDashboardData } from "Actions/dashboard/action";
import "./LandingPageFooter.scss";
import appstore from "../../../src/assets/images/appstore.webp";
import googleplay from "../../../src/assets/images/googleplay.webp";
import CopyableText from "components/CopyableText";

const LandingPageFooter = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(
    (state) => state?.DashboardReducer?.dashboardData?.data
  );
  // console.log("menuList", data?.menuList);
  const menuData = data?.menuList;
  // console.log("menuData", menuData);
  // useEffect(() => {
  //   dispatch(fetchDashboardData());
  // }, []);

  const activePath = window.location.pathname;
  const SeeAllCat = () => {
    navigate("/categories")
    localStorage.setItem("seeallcat", activePath == "/" ? "" : activePath)
  }




  // =================
  const [storeid, setStoreid] = useState("");

  const id = useSelector(
    (state) => state.WarehouseReducer?.warehouseData
  );
  useEffect(() => {
    if (id && id?.length > 0) {
      setStoreid(id[0].idstore_warehouse)
    }
  }, [id]);

  //db.idstore_warehouse == storeid
   
  // console.log("dddd",id,storeid);
  // console.log("storeid", storeid)
  return (
    <div className="container-fluid mt-2">
      <footer className={props.className}>
        <footer className="main">
          <section className="newsletter mb-15 wow animate__animated animate__fadeIn">
            <div
              className="11container"
            // style={{ paddingRight: 7 }}
            >
              <div className="row">
                <div className="col-lg-12">
                  <div className="position-relative newsletter-inner">
                    <div className="newsletter-content">
                      <h2 className="mb-20 banner-text-head">
                        Stay home & get your daily <br />
                        needs from our shop
                      </h2>
                      <p className="mb-45">
                        Start You'r Daily Shopping with{" "}
                        <span className="text-brand">Ghar Ghar Bazaar</span>
                      </p>
                    </div>
                    <Img src={banner9} alt="newsletter" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className=" footer-mid">

              <div className="flex flex-wrap gap-4 justify-center sm:-ml-[50px]">

                <div className="w-[20%] sm:w-[30%]">
                  <h4 className="widget-title footer-heading-link">
                    Useful Link
                  </h4>
                  <ul className="footer-list mb-sm-5 mb-md-0 ml-2">
                    <li>
                      <Link to="/" className="text-decoration-none">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/aboutus" className="text-decoration-none">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/privacypolicy"
                        className="text-decoration-none"
                      >
                        Privacy
                      </Link>
                    </li>

                    <li>
                      <Link to="/term" className="text-decoration-none">
                        Terms
                      </Link>
                    </li>
                    <li>
                      <Link to="/refund" className="text-decoration-none">
                        Refund
                      </Link>
                    </li>
                    <li>
                      <Link to="/disclaimer" className="text-decoration-none">
                        Shipping
                      </Link>
                    </li>
                    <li>
                      <Link to="/contactpage" className="text-decoration-none">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="w-[20%] sm:w-[30%]">
                    <div className="flex items-center gap-9">
                      <h4 className="widget-title footer-heading-link">
                        Category
                      </h4>
                      <button
                        onClick={SeeAllCat}
                        style={{ color: "#0c831f" }}
                        className="seeAll text-decoration-none"
                      >
                        See All
                      </button>
                    </div>
                    <ul className="footer-list mb-sm-5 mb-md-0">
                      {menuData?.slice(0, 7).map((t, k) => {
                        return (
                          <li key={k}>
                            <Link
                              to={{
                                pathname: "/products",
                                search:
                                  `category=` + t.name.replace(/\s+/g, "-"),
                              }}
                              state={{
                                value: t.idcategory,
                                type: "category",
                                customavi:"avi285",
                              }}
                              className="text-decoration-none"
                            >
                              {t?.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                </div>

                <div className="w-[20%] sm:w-[30%]">
                 <h4 className="widget-title footer-heading-link">
                   Membership
                  </h4>
                  <ul className="footer-list mb-sm-5 mb-md-0">
                    <li>
                      <Link to="/Franchise" className="text-decoration-none">
                          Franchise
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="w-[30%] sm:w-[30%]">
                   <h4 className="widget-title footer-heading-link">
                      Contact Us
                    </h4>
                    {id && id?.map((db, index) => (db.idstore_warehouse == storeid ?
                        <ul key={index} className="contact-infor pl-0">
                          <li className="flex items-start cursor-default">
                            <Img src={iconLocation} alt="" />{" "}
                            <div className="flex">
                              <span>
                                <strong>Address: </strong> {db.address}
                              </span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <Img src={iconContact} alt="" />
                            <span className="flex items-center">
                              <strong>Call Us:&nbsp;</strong><CopyableText text={db.contact ? ' (+91) ' + db.contact : "(+91) 9129730666"} />
                            </span>
                          </li>
                          <li className="flex items-start">
                            <Img src={iconEmail2} alt="" />
                            <span>
                              <strong>Email: </strong>
                              <a href="mailto:info@ghargharbazaar.com">info@ghargharbazaar.com</a>
                            </span>
                          </li>
                          <li className="flex items-start cursor-default">
                            <Img src={iconClock} alt="" />
                            <span className="">
                              <strong>Hours: </strong>24x7
                            </span>
                          </li>
                        </ul> : ""
                    ))}
                </div>
              </div>
          </section>


          <div
            className="11container pb-30 wow animate__animated animate__fadeInUp"
            data-wow-delay="0"
          >
            <div className="row align-items-center">
              <div className="col-12 mb-30">
                <div className="footer-bottom"></div>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6">
                <p className="copyright-text">
                  © Ghar Ghar Bazaar (formerly known as A Unit of DRV Ghar Ghar Bazar Pvt. Ltd.), 2016-2023
                </p>
              </div>
              <div className="col-xl-4 col-lg-6 text-center d-none d-xl-block">
                <div className="store-sec d-lg-inline-flex">
                  <h6 className="mb-0">Download App</h6>
                  {/* <Img src={appstore} alt="store" /> */}
                  <a href="https://play.google.com/store/apps/details?id=com.ghargharbazaar.customer" target="_blank">
                    <Img src={googleplay} alt="store" style={{height:'50px'}}/>
                  </a>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 text-end d-none d-md-block">
                <div
                  className="mobile-social-icon"
                  style={{ alignItems: "center" }}
                >
                  {/* <h6 className="heading-sm-1 mb-0">Follow Us</h6> */}
                  <Link to="https://www.facebook.com/p/Ghar-Ghar-Bazaar-61556552725989/">
                    <Img src={iconFacebookWhite} alt="" />
                  </Link>
                  <Link to="#">
                    <Img src={iconTwitterWhite} alt="" />
                  </Link>
                  <Link to="https://www.instagram.com/ghargharbazaar_offical/">
                    <Img src={iconInstagramWhite} alt="" />
                  </Link>
                  <Link to="#">
                    <Img src={iconPinterestWhite} alt="" />
                  </Link>
                  <Link to="https://www.youtube.com/channel/UCueM-3uQhTnYc-SXvpYRb2g">
                    <Img src={iconYoutubeWhite} alt="" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="pb-2">
            <p className="footer-des">
              “Ghar Ghar Bazaar” is owned (formerly known as A Unit of DRV Ghar Ghar Bazar Pvt. Ltd.) and is not related, linked or interconnected in
              whatsoever manner or nature”.
            </p>
          </div>
        </footer>
        
        <div
          className="modal fade rounded-4"
          id="membershipModal"
          tabIndex="-1"
          aria-labelledby="onloadModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" style={{ textAlign: "center" }}>
                  GGB Membership
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="card-deck mb-3 text-center">
                      <div
                        className="card mb-4 box-shadow"
                        style={{ background: "red" }}
                      >
                        <div
                          className="card-header"
                          style={{ background: "red" }}
                        >
                          <h6 className="my-0 font-weight-normal text-white">
                            Instant Discount
                          </h6>
                        </div>
                        <div className="card-body">
                          <h6 className="card-title pricing-card-title text-white">
                            Rs 220.50{" "}
                            <small className="text-muted">/ Rs. 103.50</small>
                          </h6>
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "#fff",
                            }}
                          >
                            This Membership provide instant discount
                          </p>
                          {/* <button type="button" className="btn btn-sm btn-primary">Get Membership</button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="card-deck mb-3 text-center">
                      <div className="card mb-4 box-shadow">
                        <div className="card-header">
                          <h6 className="my-0 font-weight-normal ">
                            Wish basket - Product
                          </h6>
                        </div>
                        <div className="card-body">
                          <h6 className="card-title pricing-card-title">
                            Rs 220.50{" "}
                            <small className="text-muted">/ Rs. 103.50</small>
                          </h6>
                          <p style={{ fontSize: "14px", fontWeight: "600" }}>
                            This Membership provide instant discount
                          </p>
                          <button
                            type="button"
                            className="btn btn-sm btn-primary"
                          >
                            Get Membership
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="card-deck mb-3 text-center">
                      <div className="card mb-4 box-shadow">
                        <div className="card-header">
                          <h6 className="my-0 font-weight-normal ">
                            Wish basket - Land
                          </h6>
                        </div>
                        <div className="card-body">
                          <h6 className="card-title pricing-card-title">
                            Rs 220.50{" "}
                            <small className="text-muted">/ Rs. 103.50</small>
                          </h6>
                          <p style={{ fontSize: "14px", fontWeight: "600" }}>
                            This Membership provide instant discount
                          </p>
                          <button
                            type="button"
                            className="btn btn-sm btn-primary"
                          >
                            Get Membership
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="card-deck mb-3 text-center">
                      <div className="card mb-4 box-shadow">
                        <div className="card-header">
                          <h6 className="my-0 font-weight-normal ">
                            Wish basket - Co Partner
                          </h6>
                        </div>
                        <div className="card-body">
                          <h6 className="card-title pricing-card-title">
                            Rs 220.50{" "}
                            <small className="text-muted">/ Rs. 103.50</small>
                          </h6>
                          <p style={{ fontSize: "14px", fontWeight: 600 }}>
                            This Membership provide instant discount
                          </p>
                          <button
                            type="button"
                            className="btn btn-sm btn-primary"
                          >
                            Get Membership
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Quick view --> */}
        <div
          className="modal fade mleft custom-modal"
          id="locatModal"
          tabIndex="-1"
          aria-labelledby="quickViewModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog "
            style={{ width: "38%", borderRadius: "3px" }}
          >
            <div className="modal-content">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div className="modal-body">
                <div style={{ marginLeft: "50px" }}>
                  <h6 className="pb-2">Change Loation</h6>
                  <div
                    className="justify-content-center "
                    style={{
                      display: "flex",
                      fontSize: "10px",
                      fontWeight: 600,
                    }}
                  >
                    <button
                      className="btn  btn-success"
                      style={{ padding: "0px 7px 0px 7px" }}
                    >
                      Detect my location2
                    </button>
                    &nbsp; &nbsp;
                    <span>OR</span>
                    &nbsp; &nbsp;
                    <input
                      className="form-control"
                      type="text"
                      style={{
                        width: "50%",
                        borderColor: "Grey",
                        borderWidth: "1px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Quick view --> */}
        <div
          className="modal fade  custom-modal"
          id="addAddressModal"
          tabIndex="-1"
          aria-labelledby="quickViewModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog ">
            <div className="modal-content">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-5"></div>
                  <div className="col-lg-7 ">
                    <h4>Enter complete address</h4>
                    <p>
                      This allow us to find you easily and give you timely
                      delivery experience
                    </p>
                    <div className="row mb-1">
                      <div className="col-lg-4">
                        <select
                          className="form-control"
                          style={{ border: "1px solid grey", height: "40px" }}
                        >
                          <option>Mr.</option>
                          <option>Mrs.</option>
                        </select>
                      </div>
                      <div className="col-lg-8">
                        <input
                          className="form-control"
                          name=""
                          style={{ border: "1px solid grey", height: "40px" }}
                        />
                      </div>
                    </div>
                    <div className="row mb-1">
                      <div className="col-lg-12">
                        <input
                          className="form-control"
                          name=""
                          style={{ border: "1px solid grey", height: "40px" }}
                        />
                      </div>
                    </div>
                    <div className="row mb-1">
                      <div className="col-lg-12">
                        <input
                          className="form-control"
                          name=""
                          style={{ border: "1px solid grey", height: "40px" }}
                        />
                      </div>
                    </div>
                    <span>Save address as</span>
                    <ul style={{ display: "flex" }} className="addchoosehtype">
                      <li>
                        <Link to="#">Home</Link>
                      </li>
                      <li>
                        <Link to="#">Work</Link>
                      </li>
                      <li>
                        <Link to="#" id="other">
                          Other
                        </Link>
                      </li>
                    </ul>
                    <div
                      className="row mb-1 other_se"
                      style={{ display: "none" }}
                    >
                      <div className="col-lg-12">
                        <input
                          className="form-control"
                          name=""
                          style={{ border: "1px solid grey", height: "40px" }}
                        />
                      </div>
                    </div>
                    <div className="row mb-1 other_se">
                      <div className="col-lg-12">
                        <button className="btn btn-lg btn-block btn-success">
                          Save Address
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

LandingPageFooter.defaultProps = {};

export default LandingPageFooter;
