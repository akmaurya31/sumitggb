import React, { useState, useEffect, useRef } from "react";
import Product from "components/Product";
import { Img, SelectBox } from "components";
import { useLocation, useNavigate } from "react-router-dom";
import LandingPageFooter from "components/LandingPageFooter";
import LandingPageHeader from "components/LandingPageHeader";
import { BannerSlider } from "components/SlickSlider/BannerSlider";
import { useDispatch, useSelector } from "react-redux";
import { productCategoryGet, categoryGet } from "Actions/products/action";
import Cat from "styles/imgs/theme/icons/category-1.svg";
import { Loader } from "components/Loader";
import "./Products.scss";
import Breadcrumb from "components/Breadcrumb";
import no_products from "../../assets/images/no-products.jpg";

import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/material";
import { ClipLoader } from "react-spinners";

const ProductsPage = () => {
  const [allActive, setAllActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const type = location.state ? location.state.type : null;

  var value = location.state ? location.state.value : null;

  // if (!value) {
  //   navigate("/"); // specify your path
  // }
   


  var catlvl = "";
  if (type == "category") {
    catlvl = 1;
  }
  if (type == "sub_category") {
    catlvl = 2;
  }
  if (type == "sub_sub_category") {
    catlvl = 3;
  }
  if (catlvl == "") {
    console.log("category data not found");
  }
  const token = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.access_token
  );

  //const storeid = 2;
  const storeids= useSelector(
    (state) => state?.WarehouseReducer?.warehouseData
  );
  const storeid = storeids[0]?.idstore_warehouse
  
  console.log(type,"ADDDDD noimage",storeid,value,location);

  const dispatch = useDispatch();

  const dashboardData = useSelector(
    (state) => state?.DashboardReducer?.dashboardData?.data
  );

  const allImageArray = dashboardData?.menuList?.map((db, index) => {
    if (db.idcategory == value) {
      return db.image;
    }
  });
  const allImage =
    allImageArray &&
    allImageArray?.filter((item) => item !== null && item !== undefined);

  // const product_result = useSelector((state) => 
  //   { 
  //     console.log("11T 67.",state.ProductListReducer);
  //     return state.ProductListReducer.product_result; 

  //    }
  // );

  const { product_loading, dataItems, pageNo, numberOfPages, pageLength,product_result } = useSelector((state) => {
      return state.ProductListReducer   
    });

  const category_result = useSelector(
    (state) => state.CategoryListReducer.category_result?.data
  );

  const { category_loading } = useSelector(
    (state) => state?.CategoryListReducer
  );
  const { totalCount, data } = { ...product_result };
  const [products, setProduct] = useState([]);
  const [productsBrand, setProductBrand] = useState([]);
  const [sortBy, setSortBy] = useState({
    value: "Popularity",
    label: "Popularity",
  });
  const [sortByBrand, setSortByBrand] = useState({
    value: "Popularity",
    label: "Popularity",
  });

  const scrollToTopCategory = () => {
    window.scrollTo({
      top: 340,
      scroll: "smooth",
    });
  };

  const getPer = (mrp=0, instant=0) => {
    return (((mrp - instant) / mrp) * 100);
  }

  useEffect(() => {
    if (sortBy.value == "Popularity") {
      setProduct(product_result);
    }

    if (sortBy.value == "PriceLowtoHigh") {
      const sortedData = [...product_result].sort((a, b) => a.instant - b.instant);
      setProduct(sortedData);
    }

    if (sortBy.value == "PriceHightoLow") {
      const sortedData = [...product_result].sort((a, b) => b.instant - a.instant);
      setProduct(sortedData);
    }

    if (sortBy.value == "DisLowtoHigh") {
      const sortedData = [...product_result].sort((a, b) => (a.mrp -  a.instant) - (b.mrp -  b.instant));
      setProduct(sortedData);
    }

    if (sortBy.value == "DisHightoLow") {
      const sortedData = [...product_result].sort((a, b) => (b.mrp -  b.instant) - (a.mrp -  a.instant));
      setProduct(sortedData);
    } 
    if (sortBy.value == "DisLowtoHighPer") {
      const sortedData = [...product_result].sort((a, b) => getPer(a.mrp , a.instant) - getPer(b.mrp , b.instant));
      setProduct(sortedData);
    }

    if (sortBy.value == "DisHightoLowPer") {
      const sortedData = [...product_result].sort((a, b) => getPer(b.mrp ,  b.instant) - getPer(a.mrp ,  a.instant));
      setProduct(sortedData);
    }

    if (sortBy.value == "AtoZ") {
      const sortedData = [...product_result].sort((a, b) =>
        a.prod_name.localeCompare(b.prod_name)
      );
      setProduct(sortedData);
    }
  }, [product_result, sortBy]);

  useEffect(() => {
    if (sortByBrand.value == "Popularity") {
      setProductBrand(dataItems);
    }

    if (sortByBrand.value == "PriceLowtoHigh") {
      const sortedData = [...dataItems].sort((a, b) => a.mrp - b.mrp);
      setProductBrand(sortedData);
    }

    if (sortByBrand.value == "PriceHightoLow") {
      const sortedData = [...dataItems].sort((a, b) => b.mrp - a.mrp);
      setProductBrand(sortedData);
    }

    if (sortByBrand.value == "DisLowtoHigh") {
      const sortedData = [...dataItems].sort((a, b) => (a.mrp -  a.instant) - (b.mrp - b.instant));
      setProductBrand(sortedData);
    }

    if (sortBy.value == "DisHightoLow") {
      const sortedData = [...product_result].sort((a, b) => (b.mrp -  b.instant) - (a.mrp -  a.instant));
      setProduct(sortedData);
    } 
    if (sortBy.value == "DisLowtoHighPer") {
      const sortedData = [...product_result].sort((a, b) => getPer(a.mrp , a.instant) - getPer(b.mrp , b.instant));
      setProduct(sortedData);
    }

    if (sortBy.value == "DisHightoLowPer") {
      const sortedData = [...product_result].sort((a, b) => getPer(b.mrp ,  b.instant) - getPer(a.mrp ,  a.instant));
      setProduct(sortedData);
    }

    if (sortByBrand.value == "AtoZ") {
      const sortedData = [...dataItems].sort((a, b) =>
        a.prod_name.localeCompare(b.prod_name)
      );
      setProductBrand(sortedData);
    }
  }, [dataItems, sortByBrand]);

  useEffect(() => {
    setLoader(true)
    scrollToTopCategory();
    setTimeout(() => {
      setLoader(false)
    }, 2000);
  }, [sortBy])

  const category = category_result ? category_result[0] : [];
  const totalPage = Array.isArray(data) && Math.ceil(totalCount / data.length);

  const [selectCat, setSelectCat] = useState("");
  const [otherLoader, setOtherLoader] = useState(false)

  useEffect(() => {
    if (category) {
      setSelectCat(selectCat);
    } else {
      setSelectCat(category?.name);
    }
  }, [category, selectCat]);

  const SortByOption = [
    { value: "Popularity", label: "Popularity" },
    { value: "PriceLowtoHigh", label: "Price(Low to High)" },
    { value: "PriceHightoLow", label: "Price(High to Low)" },
    { value: "DisLowtoHigh", label: "Discount(Low to High)" },
    { value: "DisHightoLow", label: "Discount(High to Low)" },
    { value: "DisLowtoHighPer", label: "Discount in % (Low to High)" },
    { value: "DisHightoLowPer", label: "Discount in % (High to Low)" },
    { value: "AtoZ", label: "Name(A-Z)" },
  ];
  const handleShortByChange = (selectedOption) => {
    setSortBy(selectedOption);
  };
  const handleShortByChangeBrand = (selectedOption) => {
    setSortByBrand(selectedOption);
  };

  let subLink = "";
  let IdCategory;

  if (type == "sub_category") {
    subLink = products?.map((db) => {
      if (db.scategory == category?.name) {
        return db.category;
      }
    });
  }
  if (type == "sub_category") {
    IdCategory = products?.map((db) => {
      if (db.scategory == category?.name) {
        return db.idcategory;
      }
    });
  }

  const scrollToTopFullWindow = () => {
    window.scrollTo({
      top: 0,
      scroll: "smooth",
    });
  };
  const scrollToTop = () => {

    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };

  const [page, setPage] = useState(1);
  const [pageCate, setPageCate] = useState(1);
  const [pageBrand, setPageBrand] = useState(1);
  const [valueCate, setValueCate] = useState();
  const [isLoader, setLoader] = useState(false);

  const containerRef = useRef(null);


  useEffect(() => {
    if (page == 1) {
      setSelectCat("");
      setOtherLoader(true)
      if (category_loading === false) {
        setTimeout(() => {
          setOtherLoader(false);
        }, 1300);
      }

    }
  }, [category_loading])

  const AllCate = () => {
    setPage(1);
    getProductData(1);
    setAllActive(true);
    setSelectCat("");
    scrollToTopCategory();
  };

  useEffect(() => {
    getProductData(page);
  }, [page]);

  const getProductData = (page) => {
    setPage(page);
    setAllActive(true);

    if (page == 1) {
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
      }, 2500);
    }

    if (page == 1) {
      scrollToTopFullWindow();
      scrollToTop();
    }
    if (type == "category" && value) {
      if (page == 1) {
        if (catlvl == 1 || catlvl == 2) {
          dispatch(categoryGet("LL319","api/category-level-" + catlvl, value, token));
        }
      }
    }
    if (type == "category" && catlvl && storeid && value) {
      if (page > 0 && catlvl && storeid && value) {
        setAllActive(true);
        setPage(page);
        dispatch(
          productCategoryGet(
            "11T ko L329",
            "api/prod-list-catlvl",
            catlvl + "/" + value + `?page=${page}`,
            token,
            storeid
          )
        );
      }
    }  
  };

  useEffect(() => {
    changeCategory(valueCate, selectCat, pageCate);
  }, [pageCate]);

  const changeCategory = (value, catename, pageCate, index) => {
    if (pageCate == 1) {
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
      }, 2500);
    }

    setPageCate(pageCate);
    setSelectCat(catename);
    setAllActive(false);
    setValueCate(value);
    scrollToTopCategory();
    if (pageCate == 1) {
      scrollToTop();
    }

    if (type == "category") {
      if (pageCate > 0 && catlvl && storeid && value) {
        setPageCate(pageCate);
        dispatch(
          productCategoryGet("11T ko L369",
            "api/prod-list-catlvl",
            catlvl + 1 + "/" + value + `?page=${pageCate}`,
            token,
            storeid
          )
        );
      }

    } else {

    }
  };

  useEffect(() => {
    BrandCategory(value, token, pageBrand);
  }, [value, token, type, pageBrand]);

  const BrandCategory = (value, token, pageBrand) => {
    setPageBrand(pageBrand);
    setLoader(true);
    scrollToTopFullWindow();

    if (pageBrand > 0 && catlvl && storeid && value) {
      if (type == "brand") {
        setPageBrand(pageBrand);
        dispatch(
          productCategoryGet("11T ko L396",
            "api/prod-list-brand",
            value + `?page=${pageBrand}`,
            token,
            storeid
          )
        );
      }
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  const handleScrollEvent = (e) => {
    let endList =
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 50;

    if (endList) {
      setLoader(true);

      if (selectCat?.length > 0) {
        let newPageCate = pageCate + 1;

        if (pageLength > 49) {
          changeCategory(valueCate, selectCat, newPageCate);
        }
      } else if (allActive) {
        let newPage = page + 1;

        if (pageLength > 49) {
          getProductData(newPage);
        }
      } else if (type == "brand") {
        let newPageBrand = pageBrand + 1;

        if (pageLength > 49) {
          BrandCategory(newPageBrand);
        }
      }
    }
    setLoader(false);
  };

  let uniqueNames = {};
  let ProductsData =
    products &&
    products?.filter((item) => {
      if (!uniqueNames[item.prod_name]) {
        uniqueNames[item.prod_name] = true;
        return true;
      }
      return false;
    });

  let uniqueNamesBrand = {};
  let ProductsDataBrand =
    productsBrand &&
    productsBrand?.filter((item) => {
      if (!uniqueNamesBrand[item.prod_name]) {
        uniqueNamesBrand[item.prod_name] = true;
        return true;
      }
      return false;
    });

 

  useEffect(() => {

    if (type == "brand") {
      dispatch(
        productCategoryGet("11T ko L475","api/prod-list-brand", value, token, storeid)
      );
    } else {
      if (catlvl == 1 || catlvl == 2) {
        dispatch(categoryGet("LL481","api/category-level-" + catlvl, value, token));
      }
      setPage(1)
      if (catlvl && storeid && value) {
        dispatch(
          productCategoryGet(
            "11T ko L487",
            "api/prod-list-catlvl",
            catlvl + "/" + value,
            token,
            storeid
          )
        );
      }


      setAllActive(true)

    }
  }, [catlvl, value, token, type, location]);

  return (
    <>
      {}
      <LandingPageHeader />
      <main className="main products-page mb-[60px]">
        {otherLoader ? (
          <Loader />
        ) : (
          <>
            <div className="container-fluid  mt-[10px] pt-[50px] md:pt-[120px] xs:pt-[120px]">
              <Breadcrumb
                sublink={subLink && subLink[0]}
                idsub_category={IdCategory && IdCategory[0]}
                activepage={
                  type == "brand"
                    ? products && products[0]?.brand
                    : category?.name
                }
              />
            </div>
            {}
            <>
              <div className="11desktop-view   sm:h-64 sm:px-2 md:px-2">
                <div className="page-header mt-20 mb-50 ">
                  <div className="container-fluid px-0">
                    {}
                    {category && category.images && (
                      <BannerSlider
                        bannerData={category.images}
                        loading={category_loading}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="container-fluid mb-30 px-0 sticky top-32">
                <div
                  className="parent-sec products-container flex 11gap-2 max-w-full sm:mt-[-132px] md:mt-[-75px] mt-[-120px]"

                >
                  {}
                  {category &&
                    category?.sub_cat?.length > 0 &&
                    (catlvl == 1 || catlvl == 2) && (
                      <div className=" 11col-lg-3 category-sec primary-sidebar  sticky-sidebar">
                        <div
                          className="sidebar-widget widget-category-2 11mb-30"
                          style={{
                            position: "sticky",
                            top: "6.8rem",
                          }}
                        >
                          <div className="desktop-view">
                            <h5 className="section-title style-1 mb-3 ">
                              Category
                            </h5>
                          </div>
                          <ul className="pl-0 category-list">
                            <li
                              className={
                                allActive == true &&
                                "active cat-active m-active font-semibold"
                              }
                              onClick={AllCate}
                            >
                              <div className="list">
                                <div className="cat-img-sec">
                                  <Img
                                    src={
                                      process.env.REACT_APP_CATEGORY_URL +
                                      allImage[0]
                                    }
                                  />
                                </div>
                                <h5 className="title">All</h5>
                              </div>
                            </li>

                            {category &&
                              category.sub_cat &&
                              category.sub_cat.map((item, index) => (
                                <>
                                  {}
                                  <li
                                    key={index}

                                    className={
                                      allActive == true
                                        ? ""
                                        : selectCat == item.name
                                          ? "active cat-active m-active"
                                          : ""
                                    }
                                    onClick={() =>
                                      changeCategory(
                                        item.idsub_category,
                                        item.name,
                                        1
                                      )
                                    }
                                  >
                                    <div className="list">
                                      <div className="cat-img-sec">
                                        {" "}
                                        <Img
                                          src={
                                            item?.image &&
                                              item.image != "no-image.png"
                                              ? process.env
                                                .REACT_APP_CATEGORY_URL +
                                              item.image
                                              : Cat
                                          }
                                          alt={item?.description}
                                        />
                                      </div>
                                      <h5 className="title">{item.name}</h5>
                                    </div>
                                  </li>
                                </>
                              ))}
                          </ul>
                        </div>
                      </div>
                    )}

                  {}
                  {isLoader == true ? (
                    <Loader />
                  ) : (
                    <div

                      className={
                        catlvl == 1 || catlvl == 2
                          ? "11col-lg-9 products-sec product-cards sm:pl-[6px]"
                          : "11col-lg-12 products-sec product-cards"
                      }

                      ref={containerRef}

                    >
                      {}
                      <div className="shop-product-fillter" >
                        <div className="totall-product">

                          {type == "brand" ? (
                            <h1 className="mb-0">
                              Buy {products && products[0]?.brand} Online
                            </h1>
                          ) : selectCat ? (
                            <h1 className="mb-0">Buy {selectCat} Online</h1>
                          ) : (
                            <h1 className="mb-0">Buy {category?.name} Online</h1>
                          )}
                        </div>

                        <div className="sort-by-product-area">
                          <div className="sort-by-cover lg:mr-10">
                            <SelectBox
                              valuePrefix={"Sort by: "}
                              icon={<i className="fi-rs-apps-sort"></i>}
                              options={SortByOption}
                              handleChange={type == "brand" ? handleShortByChangeBrand : handleShortByChange}
                              defaultValue={type == "brand" ? sortByBrand : sortBy}
                              className="sort-by-style"
                            />
                          </div>
                        </div>
                      </div>

                      {}

                      <div
                        style={
                          type == "category" && ProductsData?.length > 49
                            ? { height: "82vh", overflowY: "auto", maxWidth: '100%', overflowX: 'hidden' }
                            : type == "brand" && ProductsDataBrand?.length > 49
                              ? { height: "82vh", overflowY: "auto", maxWidth: '100%', overflowX: 'hidden' }
                              : {}
                        }
                        onScroll={handleScrollEvent}
                      >
                        {type == "brand" ? (
                          ProductsDataBrand?.length ?
                            <div className="product-price-grid noleft mt-4">
                              {ProductsDataBrand && Array.isArray(ProductsDataBrand) ? (
                                ProductsDataBrand?.map((product, index) => (
                                  <div
                                    className=""
                                    key={index}
                                    onScroll={handleScrollEvent}
                                  >
                                    <Product
                                      prd={product}
                                      key={product.idproduct_master}
                                    />
                                  </div>
                                ))
                              ) : (
                                <></>
                              )}
                            </div>
                            :
                            <div className="flex flex-col mb-14 items-center justify-center 11h-36 noimage1">
                             {/* <>NoImage</> */}
                               <Img
                                src={no_products}
                                className="w-[500px] max-w-full"
                              />
                            </div>

                        ) : (
                          <>
                         
                            {ProductsData?.length ? (
                              <div
                                className={`${category && category?.sub_cat?.length > 0
                                  ? "product-price-grid"
                                  : "product-price-grid noleft"
                                  } ""`}
                              >
                                {ProductsData && Array.isArray(ProductsData) ? (
                                  ProductsData?.map((product, index) => (
                                    <div
                                      className=""
                                      key={index}
                                      onScroll={handleScrollEvent}
                                    >
                                      <Product
                                        prd={product}
                                        key={product.idproduct_master}
                                      />
                                    </div>
                                  ))
                                ) : (
                                  <></>
                                )}
                              </div>
                            ) : (
                              <div className="flex flex-col mb-14 items-center justify-center 11h-36 noimage">
                                <Img
                                  src={no_products}
                                  className="w-[500px] max-w-full"
                                />
                              </div>


                            )}
                            {product_loading && (
                              <div
                                className="flex flex-col gap-4 justify-center items-center w-full p-4 "
                                style={{ zIndex: 11111111 }}
                              >
                                <ClipLoader color="rgb(12, 131, 31)" size={40} />
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )
                  }
                </div>
              </div>
            </>
            {}
          </>
        )}
      </main>
      {}
      <LandingPageFooter />
    </>
  );
};

export default ProductsPage;