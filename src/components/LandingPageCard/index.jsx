import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScrollToTop from "react-scroll-to-top";
import petcare from "../../../src/styles/imgs/banner/Pet-Care_WEB.jpg";
import Webbanner from "../../../src/styles/imgs/banner/Webbanner-Blinkit-1.jpg";
import babycare from "../../../src/styles/imgs/banner/babycare-WEB.jpg";
import pharmacy from "../../../src/styles/imgs/banner/pharmacy-WEB.jpg";
import { CardSkeleton } from "./CardSkeleton";
import { CategorySection } from "./CategorySection";
import { FlashSection } from "./FlashSection";
import { OfferSlider } from "./OfferSlider";
import { PageSection } from "./PageSection";
// mobile view
import paan_corner from "../../assets/images/mobile/bg/paan_corner.png";
import paan_corner_blank_button from "../../assets/images/mobile/bg/paan_corner_blank_button.png";
import grocery_animation from "../../assets/video/grocery-animation_2.mp4";

import { NotfoundSearch } from "components/Search/NotFound";
import SectionTitle from "components/SectionTitle/SectionTitle";
import { TopCategory } from "components/TopCategory";
import { Link } from "react-router-dom";
import TopBanner from "assets/images/top_banner.png";
import "./LandingPageCard.scss";
import "./LandingPageCardMobile.scss";
import LazyImage from "components/LazyImage";
// import { SubCategorySection } from "./SubCategorySection";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-google-places-autocomplete";

const otherSlider = [
  { image: Webbanner },
  { image: pharmacy },
  { image: petcare },
  { image: babycare },
];

const LandingPageCard = (props) => {
  const dispatch = useDispatch();
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const data = useSelector(
    (state) => state?.DashboardReducer?.dashboardData?.data
  );
  const { loading } = useSelector((state) => state?.DashboardReducer);
  const storeids = useSelector(
    (state) => state.WarehouseReducer?.warehouseData
  );
  

  return (
    <>
        <main id="landing-page" className="main  11pt-12">
          {/* Desktop View  */}
          <div className="container-fluid desktop-view">
            {/* <PlacesAutocomplete
            apiKey="AIzaSyCC3PEezROCu62VElmRZOzDOVGPTMh2rdU"
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
          /> */}
            {/* <MapWithAutocomplete/> */}
            <div
              className="home-slide-cover max-w-full mb-8"
              style={{ marginTop: "2.7rem" }}
            >
              <div className="hero-slider-1 style-4 dot-style-1 dot-style-1-position-1">
                {/* <BannerSlider bannerData={data?.banners?.main} loading={loading} /> */}
                {loading ?
                  <div className="grid grid-cols-1  ml-2">
                    <CardSkeleton height={234} key={1} />
                  </div>
                  :
                  <Link to="#" >
                    {/* <img src={data?.banners?.main[0]?.image} className="w-full" /> */}
                    <LazyImage src={data?.banners?.main[0]?.image} className="w-full" alt="Your Image" />
                  </Link>
                }
                {/* <img src={heroimg} className="w-full" /> */}
              </div>
              <div className="slider-arrow hero-slider-1-arrow"></div>
            </div>
          </div>

          {/* Mobile View  */}
          <div className="container-fluid mobile-view mt-[70px]">
            <div className="hero-sec bg-[#ffd701]">
              {/* <img className="hero-bg" src={paan_corner} /> */}
              <div className="text-center">
                <h1 className="title mb-2 text-[#0c831f] drop-shadow-lg">Ghar Ghar Bazaar</h1>
                <h6 className="subtitle">Grocery Shopping App</h6>
                <h5 className="sub">DELIVERED IN MINUTES</h5>
              </div>

              <video width="100%" loop autoPlay="autoplay" muted>
                <source
                  // src="https://cdn.grofers.com/layout-engine/2023-09/pann-animation_0.mp4"
                  src={grocery_animation}
                  type="video/mp4"
                />
                <source src="movie.ogg" type="video/ogg" />
              </video>
              <a href="https://play.google.com/store/apps/details?id=com.ghargharbazaar.customer" target="_blank">
                <div className="download-btn shadow-md relative flex justify-center items-center bg-white w-[90%] rounded-xl mx-auto mt-6 py-2">
                  <h4 className="title 1 text-[#]">
                    Download Ghar Ghar Bazaar app
                  </h4>
                </div>
              </a>

              {/* <img className="hero-bg" src={paan_corner_bottom} /> */}
            </div>
          </div>

          <section className=" pb-2 desktop-view">
            <div className="container-fluid">
              <div className="row">
                <div
                  className="col-lg-12 col-md-12 wow animate__animated animate__fadeIn"
                  data-wow-delay=".4s"
                >
                  <div className="tab-content" id="myTabContent-1">
                    <div
                      className="tab-pane fade show active"
                      id="tab-one-1"
                      role="tabpanel"
                      aria-labelledby="tab-one-1"
                    >
                      <div className="carausel-3-columns-cover arrow-center position-relative">
                        <div
                          className="slider-arrow slider-arrow-2 carausel-3-columns-arrow"
                          id="carausel-4-columns-arrows"
                        ></div>
                        <div
                          className="carausel-3-columns carausel-arrow-center"
                          id="carausel-3-columns"
                        >
                          {loading ? (
                            <div className="grid grid-cols-3 gap-3 ml-2">
                              <CardSkeleton height={170} key={1} />
                              <CardSkeleton height={170} key={2} />
                              <CardSkeleton height={170} key={3} />
                            </div>
                          ) : (
                            <>
                              {/* <OfferSlider bannerData={data?.banners?.offer} loading={loading}/> */}
                              <div className="pl-[2px] pr-[15px]">
                                {data &&
                                  data?.banners &&
                                  data?.banners?.offer && (
                                    <OfferSlider
                                      bannerData={data?.banners?.offer}
                                      loading={loading}
                                    />
                                  )}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="popular-categories pb-2">
            <div
              className="container-fluid px-[15px] 11wow 11animate__animated 11animate__fadeIn"
            // style={{ paddingLeft: 10 }}
            >
              {/* <div className=" position-relative "> */}
              {/* <div className="carausel-10-columns" id="carausel-10-columns"> */}
              <CategorySection
                title={"Shop by category"}
                data={data?.menuList}
                loading={loading}
                url={"category"}
              />
              {/* <SlickSlider
                  data={data?.menuList}
                  loading={loading}
                ></SlickSlider> */}
              {/* </div> */}
              {/* </div> */}
            </div>
          </section>

          {/* Top Category  */}

          {data?.extra_cats.map((db, key) => {
            return (
              <section className="popular-categories pb-2" key={key}>
                <div
                  className="container-fluid px-[15px] 11wow 11animate__animated 11animate__fadeIn"
                // style={{ paddingLeft: 10 }}
                >
                  <SectionTitle title={db.category_name} />
                  <TopCategory data={db?.subcat} url={"sub_category"} />
                </div>
              </section>
            );
          })}

          {/* <PageSection
            title={"Deals of the day"}
            productData={data?.products?.dealOfDay}
            loading={loading}
          /> */}

          <section className="popular-categories">
            <div className=" wow animate__animated animate__fadeIn">
              <div className=" position-relative">
                <div className="carausel-10-columns " id="carausel-10-columns">
                  <FlashSection title={"Store based on price"} />
                </div>
              </div>
            </div>
          </section>

          <section className="popular-categories">
            <div
              className="container-fluid 11wow 11animate__animated 11animate__fadeIn"
              style={{ paddingLeft: 10 }}
            >
              <div className=" position-relative">
                <div className="carausel-10-columns" id="carausel-10-columns">
                  {/* <SubCatSection data={data?.menuList[0]?.sub_cat} loading={loading} title={'Explore Atta,Dal & Rice products'} /> */}

                  {/* <CategorySection
                  data={data?.menuList[1]?.sub_cat}
                  loading={loading}
                  title={"Explore Atta,Dal & Rice products"}
                  seeall={"/#"}
                  url={"sub_category"}
                /> */}
                </div>
              </div>
            </div>
          </section>

          <section className="popular-categories">
            <div
              className="container-fluid wow animate__animated animate__fadeIn"
            // style={{ paddingLeft: 10 }}
            >
              <div className=" position-relative">
                <div className="carausel-10-columns" id="carausel-10-columns">
                  {/* <SubCatSection data={data?.menuList[8]?.sub_cat} loading={loading} title={'Explore CARRY BAG LARGE products'} /> */}

                  {/* <CategorySection
                  data={data?.menuList[4]?.sub_cat}
                  loading={loading}
                  title={"Explore Chocolates, Ice Creams & Candies products"}
                  seeall={"/#"}
                  url={"sub_category"}
                /> */}
                </div>
              </div>
            </div>
          </section>
          <section className="popular-categories">
            <div
              className="container-fluid wow animate__animated animate__fadeIn"
            // style={{ paddingLeft: 10 }}
            >
              <div className=" position-relative">
                <div className="carausel-10-columns" id="carausel-10-columns">
                  {/* <SubCatSection data={data?.menuList[3]?.sub_cat} loading={loading} title={'Explore Beauty products'} /> */}

                  {/* <CategorySection
                  data={data?.menuList[3]?.sub_cat}
                  loading={loading}
                  title={"Explore Beauty Products"}
                  seeall={"/#"}
                  url={"sub_category"}
                /> */}
                </div>
              </div>
            </div>
          </section>
          <section className="popular-categories">
            <div
              className="container-fluid wow animate__animated animate__fadeIn"
            // style={{ paddingLeft: 10 }}
            >
              <div className=" position-relative">
                <div className="carausel-10-columns" id="carausel-10-columns">
                  {/* <BrandSection data={data?.brandList} loading={loading} title={'Shop by brands'} /> */}

                  <CategorySection
                    data={data?.brandList}
                    loading={loading}
                    title={"Shop by brands"}
                    seeall={"/brand-list"}
                    brand={true}
                    domain={process.env.REACT_APP_BRANDS_URL}
                    // domain={
                    //   "https://allwinmedico.in/ggb-api/public/ggb-api/public/brands/"
                    // }
                    url={"brand"}
                  />
                </div>
              </div>
            </div>
          </section>
          {data && data?.products && data?.products?.mostPopular && (
            <PageSection
              title={"Most Popular"}
              productData={data?.products?.mostPopular}
              loading={loading}
              isSeeall={true}
            />
          )}

          {data && data?.products && data?.products?.frequentBought && (
            <PageSection
              title={"Frequent Bought"}
              productData={data?.products?.frequentBought}
              loading={loading}
              isSeeall={true}
            />
          )}

          {data && data?.products && data?.products?.newArrival && (
            <PageSection
              title={"New Arrivals"}
              productData={data?.products?.newArrival}
              loading={loading}
              isSeeall={true}
            />
          )}

          <ScrollToTop
            smooth
            component={
              <i className="fi-rs-arrow-small-up" style={{ fontSize: 25 }}></i>
            }
          />
        </main>
    </>
  );
};

LandingPageCard.defaultProps = {
  image: "images/img_image_260x384.png",
  p286162ndaveoaklone: "2861 62nd Ave, Oakland, CA 94605",
  p3bedroom: "3 Bed Room",
  bathcounter: "1 Bath",
  sqftcounter: "1,032 sqft",
  p1bath: "Family",
  viewDetails: "View Details",
  price: "$649,900",
};

export default LandingPageCard;