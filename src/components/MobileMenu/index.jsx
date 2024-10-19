import React from "react";
import { Link } from "react-router-dom";
import { Button, Img, Text,Input } from "components";
import logo from "../../styles/imgs/logo/logo.png";
import iconFacebookWhite from "../../styles/imgs/theme/icons/icon-facebook-white.svg";
import iconInstagramWhite from "../../styles/imgs/theme/icons/icon-instagram-white.svg";
import iconPinterestWhite from "../../styles/imgs/theme/icons/icon-pinterest-white.svg";
import iconTwitterWhite from "../../styles/imgs/theme/icons/icon-twitter-white.svg";
import iconYoutubeWhite from "../../styles/imgs/theme/icons/icon-youtube-white.svg";

const MobileMenu = (props) => {
    return (
        <div className="mobile-header-active mobile-header-wrapper-style">
        <div className="mobile-header-wrapper-inner">
          <div className="mobile-header-top">
            <div className="mobile-header-logo">
              <Link to="/">
                <Img src={logo} alt="logo" />
              </Link>
            </div>

            <div className="mobile-menu-close close-style-wrap close-style-position-inherit">
              <Button className="close-style search-close">
                <i className="icon-top"></i>
                <i className="icon-bottom"></i>
              </Button>
            </div>
          </div>
          <div className="mobile-header-content-area">
            <div className="mobile-search search-style-2 mobile-header-border">
              <form action="#">
                <Input type="text" placeholder="Search for items…" />
                <button type="submit">
                  <i className="fi-rs-search"></i>
                </button>
              </form>
            </div>
            <div className="mobile-menu-wrap mobile-header-border">
              {/*  mobile menu start  */}
              <nav>
                <ul className="mobile-menu font-heading">
                  <li className="menu-item-has-children">
                    <Link to="/">Home</Link>
                    <ul className="dropdown">
                      <li>
                        <Link to="/">Home 1</Link>
                      </li>
                      <li>
                        <Link to="/">Home 2</Link>
                      </li>
                      <li>
                        <Link to="/">Home 3</Link>
                      </li>
                      <li>
                        <Link to="/">Home 4</Link>
                      </li>
                      <li>
                        <Link to="/">Home 5</Link>
                      </li>
                      <li>
                        <Link to="/">Home 6</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item-has-children">
                    <Link to="shop-grid-right.html">shop</Link>
                    <ul className="dropdown">
                      <li>
                        <Link to="shop-grid-right.html">
                          Shop Grid – Right Sidebar
                        </Link>
                      </li>
                      <li>
                        <Link to="shop-grid-left.html">
                          Shop Grid – Left Sidebar
                        </Link>
                      </li>
                      <li>
                        <Link to="shop-list-right.html">
                          Shop List – Right Sidebar
                        </Link>
                      </li>
                      <li>
                        <Link to="shop-list-left.html">
                          Shop List – Left Sidebar
                        </Link>
                      </li>
                      <li>
                        <Link to="shop-fullwidth.html">Shop - Wide</Link>
                      </li>
                      <li className="menu-item-has-children">
                        <Link to="#">Single Product</Link>
                        <ul className="dropdown">
                          <li>
                            <Link to="products">Product – Right Sidebar</Link>
                          </li>
                          <li>
                            <Link to="shop-product-left.html">
                              Product – Left Sidebar
                            </Link>
                          </li>
                          <li>
                            <Link to="shop-product-full.html">
                              Product – No sidebar
                            </Link>
                          </li>
                          <li>
                            <Link to="shop-product-vendor.html">
                              Product – Vendor Infor
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link to="shop-filter.html">Shop – Filter</Link>
                      </li>
                      <li>
                        <Link to="shop-wishlist.html">Shop – Wishlist</Link>
                      </li>
                      <li>
                        <Link to="shop-cart.html">Shop – Cart</Link>
                      </li>
                      <li>
                        <Link to="checkout">Shop – Checkout</Link>
                      </li>
                      <li>
                        <Link to="shop-compare.html">Shop – Compare</Link>
                      </li>
                      <li className="menu-item-has-children">
                        <Link to="#">Shop Invoice</Link>
                        <ul className="dropdown">
                          <li>
                            <Link to="shop-invoice-1.html">Shop Invoice 1</Link>
                          </li>
                          <li>
                            <Link to="shop-invoice-2.html">Shop Invoice 2</Link>
                          </li>
                          <li>
                            <Link to="shop-invoice-3.html">Shop Invoice 3</Link>
                          </li>
                          <li>
                            <Link to="shop-invoice-4.html">Shop Invoice 4</Link>
                          </li>
                          <li>
                            <Link to="shop-invoice-5.html">Shop Invoice 5</Link>
                          </li>
                          <li>
                            <Link to="shop-invoice-6.html">Shop Invoice 6</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item-has-children">
                    <Link to="#">Vendors</Link>
                    <ul className="dropdown">
                      <li>
                        <Link to="vendors-grid.html">Vendors Grid</Link>
                      </li>
                      <li>
                        <Link to="vendors-list.html">Vendors List</Link>
                      </li>
                      <li>
                        <Link to="vendor-details-1.html">
                          Vendor Details 01
                        </Link>
                      </li>
                      <li>
                        <Link to="vendor-details-2.html">
                          Vendor Details 02
                        </Link>
                      </li>
                      <li>
                        <Link to="vendor-dashboard.html">Vendor Dashboard</Link>
                      </li>
                      <li>
                        <Link to="vendor-guide.html">Vendor Guide</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item-has-children">
                    <Link to="#">Mega menu</Link>
                    <ul className="dropdown">
                      <li className="menu-item-has-children">
                        <Link to="#">Women's Fashion</Link>
                        <ul className="dropdown">
                          <li>
                            <Link to="products">Dresses</Link>
                          </li>
                          <li>
                            <Link to="products">Blouses & Shirts</Link>
                          </li>
                          <li>
                            <Link to="products">Hoodies & Sweatshirts</Link>
                          </li>
                          <li>
                            <Link to="products">Women's Sets</Link>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children">
                        <Link to="#">Men's Fashion</Link>
                        <ul className="dropdown">
                          <li>
                            <Link to="products">Jackets</Link>
                          </li>
                          <li>
                            <Link to="products">Casual Faux Leather</Link>
                          </li>
                          <li>
                            <Link to="products">Genuine Leather</Link>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children">
                        <Link to="#">Technology</Link>
                        <ul className="dropdown">
                          <li>
                            <Link to="products">Gaming Laptops</Link>
                          </li>
                          <li>
                            <Link to="products">Ultraslim Laptops</Link>
                          </li>
                          <li>
                            <Link to="products">Tablets</Link>
                          </li>
                          <li>
                            <Link to="products">Laptop Accessories</Link>
                          </li>
                          <li>
                            <Link to="products">Tablet Accessories</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item-has-children">
                    <Link to="blog-category-fullwidth.html">Blog</Link>
                    <ul className="dropdown">
                      <li>
                        <Link to="blog-category-grid.html">
                          Blog Category Grid
                        </Link>
                      </li>
                      <li>
                        <Link to="blog-category-list.html">
                          Blog Category List
                        </Link>
                      </li>
                      <li>
                        <Link to="blog-category-big.html">
                          Blog Category Big
                        </Link>
                      </li>
                      <li>
                        <Link to="blog-category-fullwidth.html">
                          Blog Category Wide
                        </Link>
                      </li>
                      <li className="menu-item-has-children">
                        <Link to="#">Single Product Layout</Link>
                        <ul className="dropdown">
                          <li>
                            <Link to="blog-post-left.html">Left Sidebar</Link>
                          </li>
                          <li>
                            <Link to="blog-post-right.html">Right Sidebar</Link>
                          </li>
                          <li>
                            <Link to="blog-post-fullwidth.html">
                              No Sidebar
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item-has-children">
                    <Link to="#">Pages</Link>
                    <ul className="dropdown">
                      <li>
                        <Link to="aboutus">About Us</Link>
                      </li>
                      <li>
                        <Link to="contactpage">Contact</Link>
                      </li>
                      <li>
                        <Link to="page-account.html">My Account</Link>
                      </li>
                      <li>
                        <Link to="page-login.html">Login</Link>
                      </li>
                      <li>
                        <Link to="page-register.html">Register</Link>
                      </li>
                      <li>
                        <Link to="page-forgot-password.html">
                          Forgot password
                        </Link>
                      </li>
                      <li>
                        <Link to="page-reset-password.html">
                          Reset password
                        </Link>
                      </li>
                      <li>
                        <Link to="page-purchase-guide.html">
                          Purchase Guide
                        </Link>
                      </li>
                      <li>
                        <Link to="privacypolicy">Privacy Policy</Link>
                      </li>
                      <li>
                        <Link to="term">Terms of Service</Link>
                      </li>
                      <li>
                        <Link to="error">404 Page</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item-has-children">
                    <Link to="#">Language</Link>
                    <ul className="dropdown">
                      <li>
                        <Link to="#">English</Link>
                      </li>
                      <li>
                        <Link to="#">French</Link>
                      </li>
                      <li>
                        <Link to="#">German</Link>
                      </li>
                      <li>
                        <Link to="#">Spanish</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
              {/* <!-- mobile menu end --> */}
            </div>
            <div className="mobile-header-info-wrap">
              <div className="single-mobile-header-info">
                <Link to="page-contact.html">
                  <i className="fi-rs-marker"></i> Our location{" "}
                </Link>
              </div>
              <div className="single-mobile-header-info">
                <Link to="page-login.html">
                  <i className="fi-rs-user"></i>Log In / Sign Up{" "}
                </Link>
              </div>
              <div className="single-mobile-header-info">
                <Link to="#">
                  <i className="fi-rs-headphones"></i>(+01) - 2345 - 6789{" "}
                </Link>
              </div>
            </div>
            <div className="mobile-social-icon mb-50">
              <h6 className="mb-15">Follow Us</h6>
              <Link to="#">
                <Img src={iconFacebookWhite} alt="" />
              </Link>
              <Link to="#">
                <Img src={iconTwitterWhite} alt="" />
              </Link>
              <Link to="#">
                <Img src={iconInstagramWhite} alt="" />
              </Link>
              <Link to="#">
                <Img src={iconPinterestWhite} alt="" />
              </Link>
              <Link to="#">
                <Img src={iconYoutubeWhite} alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
};

export default MobileMenu;
