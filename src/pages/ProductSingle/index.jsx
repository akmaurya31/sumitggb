import Ghar1 from "assets/images/Ghar_1.png";
import Ghar2 from "assets/images/Ghar_2.png";
import { Img } from "components";
import LandingPageFooter from "components/LandingPageFooter";
import LandingPageHeader from "components/LandingPageHeader";
import { AiOutlineCaretRight } from "react-icons/ai";
import { FaTag } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
// import author3 from "../../styles/imgs/blog/author-3.png";
import { AddCartPost, RemoveCartPost } from "Actions/cart/action";
import { updateMembershipPost } from "Actions/loginotp/action";
import { productSingleDataGet } from "Actions/products/action";
import AlertModal2 from "components/Alert/alert2";
import Breadcrumb from "components/Breadcrumb";
import { PageSection } from "components/LandingPageCard/PageSection";
import { LoginModel } from "components/LandingPageHeader/LoginModel";
import { ButtonLoader, Loader } from "components/Loader";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import no_image from "../../assets/images/no-image.jpeg";
import "./ProductSingle.scss";
import { WhyCard } from "./WhyCard";

import ImageMagnifiers from "components/ImageMagnifiers";
import { ReturnPR, ReturnPRBadge } from "components/ReturnPRBadge";

const ProductSinglePage = (props) => {
  const dispatch = useDispatch();
  var prd_quantity = 0;
  var [quantity, setQuantity] = useState(0);
  const [buttonLogin, setLoding] = useState(false);
  const [loginOpen, setloginOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [changeData, setChange] = useState();
  const [isMemberConfrm, setConfrm] = useState(false);

  const storeids = useSelector(
    (state) => state.WarehouseReducer?.warehouseData
  );

  // const storeid = store_id &&store_id?.length>0&& store_id[0]?.idstore_warehouse;
  const storeid = storeids[0]?.idstore_warehouse

  const token = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.access_token
  );
  const { idmembership_plan } = useSelector(
    (state) => state.LoginOtpVerifyReducer?.currentmembership
  );
  const { verify_loading, msg } = useSelector(
    (state) => state.LoginOtpVerifyReducer
  );
  const { id } = useParams();
  const onLoginCloseModal = () => setloginOpen(false);
  const [membershipModal, setMemberShip] = useState(false);

  const openModal = (data) => {
    if (token) {
      setConfrm(true);
      setChange(data);
    } else {
      setloginOpen(true);
      setConfrm(false);
    }
  };
  // useEffect(() => {
  //   setMemberShip(true);
  // }, [msg]);
  
  useEffect(() => {
    if(token){
      dispatch(productSingleDataGet("api/product-details", token,storeid, id))
    }
    else{
      dispatch(productSingleDataGet("api/product-details", null,storeid, id))
    }
  
   
  }, [id]);
  const { product_result, product_loading } = useSelector(
    (state) => state?.SingleProductReducer
  );
  var { cart_result, cart_id } = useSelector((state) => state.CartReducer);
  let prd = '';
  let item_id=""
  if (product_result && product_result.data && product_result.data.length > 0) {
     prd = product_result.data[0];
     item_id = prd?.batches
        ? prd?.batches[0]?.idproduct_master || prd?.idproduct_master
        : prd?.idproduct_master;

    // Checking if cart_result is available before iterating over it
    if (cart_result) {
        cart_result.forEach((cartItem) => {
            const cart_item_id = cartItem?.idproduct_master;
            if (cart_item_id === item_id) {
                prd_quantity = cartItem.quantity;
            }
        });
    }
}
const isCartAdd=cart_result?.some((cr)=>cr.idproduct_master===prd.idproduct_master)
  useEffect(() => {
    setQuantity(prd_quantity);
    setLoding(false);
  }, [product_loading, cart_result]);

  const idproduct_batch = prd?.batches
    ? prd?.batches[0]?.idproduct_batch
      ? prd?.batches[0]?.idproduct_master
      : 0
    : 0;
  var newCart = [];
  const addtocart = (is_quantity_update) => {
    setLoding(true);
    quantity = is_quantity_update == "minus" ? quantity - 1 : quantity + 1;
    var cart_data = [];
    if (cart_result && cart_result.length) {
      if (is_quantity_update == "minus" || is_quantity_update == "plus") {
        if (quantity > 0) {
          cart_data = cart_result.map((cartItem) => {
            const cart_item_id = cartItem?.batches[0]?.idproduct_master
              ? cartItem?.batches[0]?.idproduct_master
              : cartItem.idproduct_master;
            return cart_item_id === item_id
              ? { ...cartItem, quantity: quantity }
              : cartItem;
          });
        } else {
          cart_data = cart_result.filter((item) => {
            const cart_filter_item_id = item?.batches[0]?.idproduct_master
              ? item?.batches[0]?.idproduct_master
              : item.idproduct_master;
            return cart_filter_item_id !== item_id;
          });
        }
      } else {
        newCart = {
          ...prd,
          quantity: quantity,
          idproduct_batch: idproduct_batch,
          idproduct_master: item_id,
        };
        cart_data = [...cart_result, newCart];
      }
    } else {
      newCart = {
        ...prd,
        quantity: quantity,
        idproduct_batch: idproduct_batch,
        idproduct_master: item_id,
      };
      cart_data = [...cart_result, newCart];
    }
    if (quantity > 0) {
      dispatch(
        AddCartPost(
          "api/add-to-cart",
          {
            cart_id:
              cart_id == null ? Math.floor(Math.random() * 1000) + "_Web" : cart_id,
            idstore: storeid,
            idproduct_master: prd.idproduct_master,
            idinventory: prd.idinventory,
            qty: quantity,
          },
          cart_data,
          token
        )
      );
    } else {
      dispatch(
        RemoveCartPost(
          "api/remove-from-cart",
          {
            cart_id:
              cart_id == null ? Math.floor(Math.random() * 1000) + "_Web" : cart_id,
            idstore: storeid,
            idproduct_master: prd.idproduct_master,
          },
          cart_data,
          token
        )
      );
    }
  };
  const changePlan = (plan) => {
    // console.log("change Plan" + plan);
    if (token) {
      setLoading(true);
      dispatch(
        updateMembershipPost(token, "api/change-membership", {
          idmembership_plan: plan,
        })
      );
      setTimeout(() => {
        setLoading(false);
      }, 500);
      setConfrm(false);
      setMemberShip(true);
    } else {
      setloginOpen(true);
      setConfrm(false);
    }
  };

  const membershipData = [
    // {
    //   title: "Instant Discount",
    //   price: product_result?.data[0]?.sellingPriceForInstantDisc,
    //   off: Math.round(
    //     ((product_result?.data[0]?.mrp -
    //       product_result?.data[0]?.sellingPriceForInstantDisc) /
    //       product_result?.data[0]?.mrp) *
    //     100
    //   ),
    //   plan: 1,
    // },
    {
      title: "Product Cashback",
      price: product_result && product_result.data && product_result.data.length > 0&&(product_result?.data[0]?.instant-product_result?.data[0]?.product).toFixed(2),
      off: product_result && product_result.data && product_result.data.length > 0&&Math.round(
        ((product_result?.data[0]?.instant - product_result?.data[0]?.product) /
          product_result?.data[0]?.instant) *
        100
      ),
      plan: 2,
    },
    {
      title: "Land Cashback",
      price: product_result && product_result.data && product_result.data.length > 0&&(product_result?.data[0]?.instant-product_result?.data[0]?.land).toFixed(2),
      off: product_result && product_result.data && product_result.data.length > 0&&Math.round(
        ((product_result?.data[0]?.instant - product_result?.data[0]?.land) /
          product_result?.data[0]?.instant) *
        100
      ),
      plan: 3,
    },
    {
      title: "Co-partner Cashback",
      price: product_result && product_result.data && product_result.data.length > 0&&(product_result?.data[0]?.instant-product_result?.data[0]?.copartner).toFixed(2),
      off: product_result && product_result.data && product_result.data.length > 0&&Math.round(
        ((product_result?.data[0]?.instant - product_result?.data[0]?.copartner) /
          product_result?.data[0]?.instant) *
        100
      ),
      plan: 4,
    },
  ];

  // console.log("product_result", product_result);
  // const rizoom = {
  //   // width: 400,
  //   // height: 550,
  //   zoomWidth: 40,
  //   zoomHeight: 40,
  //   img: `${process.env.REACT_APP_PRODUCTS_URL}${product_result?.data[0]?.barcode}.jpg`,
  //   zoomSrc: `${process.env.REACT_APP_PRODUCTS_URL}${product_result?.data[0]?.barcode}.jpg`,
  //   scale: 0.5,
  // };

  // Image Dimension

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [imgError, setError] = useState(false);

  const getImageDimensions = (url) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height });
    };
  };

  // Call the function to get dimensions when the component mounts or imageUrl changes
  useEffect(() => {
    if(product_result && product_result.data && product_result.data.length > 0){
      getImageDimensions(
        `${process.env.REACT_APP_PRODUCTS_URL}${product_result?.data[0]?.barcode}.jpg`
      );
    }
    
  }, [product_result]);

  
  return (
    <>
      <LandingPageHeader />
      <main className="main singlepage">
        <div className="container-fluid mb-30 ">
          {product_loading || verify_loading ? (
            <Loader />
          ) : (
            <>
            {
              product_result && product_result.data && product_result.data.length > 0&&<Breadcrumb
              sublink={product_result?.data[0]?.category}
              activepage={product_result?.data[0]?.prod_name}
            />
            }
              

              {product_result?.data && (
                <div className="product-detail accordion-detail sm:mt-[0px] mt-8">
                  <div className="row mb-50  ">
                    <div className="col-md-6 col-sm-12 col-xs-12 mb-md-0 mb-sm-5">
                      <div className="detail-gallery sm:pointer-events-none md:pointer-events-none h-full max-h-full">
                        {/* <!-- MAIN SLIDES --> */}
                        <Img
                            src={
                            `${process.env.REACT_APP_PRODUCTS_URL}${product_result?.data[0]?.barcode}.jpg`
                            }
                            onError={(e) => {
                              setError(true);
                              e.target.src = no_image;
                            }}
                            style={{display:'none'}}
                          />
                        {/* Image Magnifiers */}
                        {imgError ? (
                          <Img
                            src={
                            `${process.env.REACT_APP_PRODUCTS_URL}${product_result?.data[0]?.barcode}.jpg`
                            }
                            onError={(e) => {
                              setError(true);
                              e.target.src = no_image;
                            }}
                            style={{margin:'0px auto'}}
                          />
                        ) : (
                          <ImageMagnifiers
                            srcImage={`${process.env.REACT_APP_PRODUCTS_URL}${product_result?.data[0]?.barcode}.jpg`}
                          />
                        )}
                      </div>
                      {/* <!-- End Gallery --> */}
                    </div>

                    <div className="col-md-6 col-sm-12 col-xs-12">
                      <div className="detail-info pr-30 pl-30">
                        
                        <div className="price-flex-box items-start justify-start">
                          <h2 className="title-detail">
                            {product_result?.data[0]?.prod_name}
                          </h2>
                          {/* <div class="time-single">
          <img src="http://cdn.grofers.com/assets/eta-icons/15-mins.png" height="12" width="12" />
          <span>14 MINS</span>
        </div> */}
                          <div>
                            <Link
                              to={{
                                pathname: "/products",
                                search:
                                  `brand=` +
                                  product_result?.data[0]?.brand.replace(
                                    /\s+/g,
                                    "-"
                                  ),
                              }}
                              state={{
                                value: product_result?.data[0]?.idbrand,
                                type: "brand",
                              }}
                              className="view-all-link-single-page"
                            >
                              <span style={{ fontSize: 12 }}>
                                View all by :{" "}
                              </span>{" "}
                              {product_result?.data[0]?.brand}
                              <AiOutlineCaretRight style={{ fontSize: 13.5 }} />
                            </Link>
                          </div>
                          {/* customer review */}
                          {/* <div className="product-detail-rating p-0">
                            <div className="product-rate-cover text-end">
                              <div className="product-rate d-inline-block">
                                <div className="product-rating" style={{ width: "90%" }}></div>
                              </div>
                              <span className="font-small ml-5 text-muted">{" "} (32 reviews)</span>
                            </div>
                          </div> */}
                          <div
                            className="clearfix product-price-cover items-start w-full"
                            style={{ alignItems: "start" }}
                          >
                            <div className="flex flex-col">
                              <div className="flex flex-col gap-2">
                                {/* <span className="current-price " style={{ fontSize: 15, color: "#B6B6B6" , fontWeight: 600, }}>
                Available Quantity{" "}
                {product_result?.data[0]?.quantity}
              </span> */}
                                <div className="product-price primary-color float-left m-0">
                                  <span
                                    className="current-price text-brand"
                                    style={{ fontSize: 18 }}
                                  >
                                    MRP ₹
                                    {(idmembership_plan == undefined ||
                                      idmembership_plan == 1) &&
                                      product_result?.data[0]?.selling_price}
                                    {idmembership_plan == 2 &&
                                      product_result?.data[0]?.selling_price}
                                    {idmembership_plan == 3 &&
                                      product_result?.data[0]?.selling_price}
                                    {idmembership_plan == 4 &&
                                      product_result?.data[0]?.selling_price}
                                  </span>
                                  <span
                                    className="old-price font-md ml-15"
                                    style={{ fontSize: 18 }}
                                  >
                                    ₹{product_result?.data[0]?.mrp}
                                  </span>


                                  {ReturnPRBadge(
                                    idmembership_plan,
                                    product_result?.data[0]?.mrp,
                                    product_result?.data[0]?.instant,
                                    product_result?.data[0]?.product,
                                    product_result?.data[0]?.land,
                                    product_result?.data[0]?.copartner
                                  ) &&
                                    <span>&nbsp;({ReturnPR(
                                      idmembership_plan,
                                      product_result?.data[0]?.mrp,
                                      product_result?.data[0]?.instant,
                                      product_result?.data[0]?.product,
                                      product_result?.data[0]?.land,
                                      product_result?.data[0]?.copartner
                                    )

                                  }% OFF)</span>
                                }
                                </div>
                                <span
                                  className="current-price "
                                  style={{
                                    fontSize: 14,
                                    color: "black",
                                    opacity: 0.5,
                                  }}
                                >
                                  (Inclusive of all taxes)
                                </span>
                              </div>
                              <div>
                                <div
                                  className="why-shop-text mt-2 mb-2 flex items-center gap-2"
                                  style={{ fontSize: 14 }}
                                >
                                  Available offers
                                  <FaTag
                                    style={{ color: "rgb(12, 131, 31)" }}
                                  />
                                  {/* {idmembership_plan} */}
                                </div>
                              </div>
                            </div>
                            <div>
                              {quantity>0 &&isCartAdd ? (
                                <div className="add-cart">
                                  <span className="button text-decoration-none btn-sm">
                                    {buttonLogin ? (
                                      <ButtonLoader color={"white"} size={8} />
                                    ) : (
                                      <>
                                        {" "}
                                        <i
                                          className="fa-solid fa-minus mr-1"
                                          onClick={() => addtocart("minus")}
                                        ></i>
                                        {quantity}
                                        {/* &nbsp;&nbsp;{quantity}&nbsp;&nbsp; */}
                                        <i
                                          className="fa-solid fa-plus ml-1"
                                          onClick={() => addtocart("plus")}
                                        ></i>
                                      </>
                                    )}
                                  </span>
                                </div>
                              ) : (
                                <>
                                  {/* <div className="desktop-view">
                                    <span
                                      className="button text-decoration-none btn-sm"
                                      onClick={() =>
                                        addtocart(product_result.data[0])
                                      }
                                      style={{
                                        fontSize: 10,
                                        color: "rgb(12, 131, 31)",
                                        border: "1px Solid rgb(12, 131, 31)",
                                        borderRadius: 7,
                                        background: "white",
                                      }}
                                    >
                                      {buttonLogin == true ? (
                                        <ButtonLoader
                                          color={"rgb(12, 131, 31)"}
                                          size={8}
                                        />
                                      ) : (
                                        "Add"
                                      )}
                                    </span>
                                  </div> */}
                                  <div className="11mobile-view">
                                    <span
                                      className="button text-decoration-none btn-sm add-to-cart"
                                      onClick={() =>
                                        addtocart(product_result?.data[0])
                                      }
                                      style={{
                                        fontSize: 10,
                                        color: "rgb(12, 131, 31)",
                                        border: "1px Solid rgb(12, 131, 31)",
                                        borderRadius: 7,
                                        background: "white",
                                      }}
                                    >
                                      {buttonLogin == true ? (
                                        <ButtonLoader
                                          color={"white"}
                                          size={8}
                                        />
                                      ) : (
                                        "Add to cart"
                                      )}
                                    </span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="available-offers sm:grid-cols-2 grid grid-cols-3 sm:gap-2 gap-[12px] mb-2 w-full">
                            {membershipData.map((db, key) => (
                              <div
                                key={key}
                                className={` ${idmembership_plan == db.plan
                                    ? "item active flex flex-col justify-between"
                                    : "item flex flex-col justify-between"
                                  }`}
                              >
                                <div>
                                  {/*
            <FaTag style={{ color: "rgb(12, 131, 31)" }} /> */}
                                  <h3
                                    style={{
                                      color:
                                        idmembership_plan == db.plan
                                          ? "rgb(12, 131, 31)"
                                          : "black",
                                      fontWeight:
                                        idmembership_plan == db.plan
                                          ? "bold"
                                          : "400",
                                    }}
                                    className="title sm:mx-[2.3px]"
                                  >
                                    {db.title}
                                  </h3>

                                  <div className="flex gap-1 items-center justify-center">
                                    <h6
                                      className="price"
                                      style={{ color: "rgb(12, 131, 31)" }}
                                    >
                                      {/* ₹{product_result?.data[0]?.product} */}
                                      ₹{db.price}
                                    </h6>
                                    <h6 className="off-per">({db.off}% Off)</h6>
                                  </div>
                                </div>
                                <div>
                                  {idmembership_plan == db.plan && (
                                    <div
                                      className="h-[24px] lg:h-[37px] flex justify-center items-center"
                                      style={{
                                        fontSize: 10,
                                        color: "#fff",
                                        border: "1px Solid rgb(12, 131, 31)",
                                        borderRadius: 7,
                                        padding: 5,
                                        textAlign: "center",
                                        backgroundColor: "rgb(12, 131, 31)",
                                        fontWeight: 600,
                                      }}
                                    >
                                      Active
                                    </div>
                                  )}
                                  {idmembership_plan !== db.plan && (
                                    <div
                                      style={{
                                        fontSize: 10,
                                        color: "rgb(12, 131, 31)",
                                        border: "1px Solid rgb(12, 131, 31)", //
                                        borderRadius: 7,
                                        padding: 5,
                                        textAlign: "center",
                                        lineHeight: "12px",
                                      }} // onClick={()=> changePlan(db.plan)}
                                      onClick={() => openModal(db.plan)}
                                    >
                                      {token ? (
                                        <button>Subscribe</button>
                                      ) : (
                                        <button>Subscribe</button>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}

                            {/* Confirm Modal */}
                            <AlertModal2
                              isOpen={isMemberConfrm}
                              onClose={() => setConfrm(false)}
                              title={"Subscribe Membership"}
                            >
                              <div
                                style={{
                                  width: 450,
                                  minHeight: 100,
                                  maxWidth: "100%",
                                }}
                              >
                                <div className="pt-3">
                                  <p className="text-md">
                                    Do You really want to subscribe your
                                    membership? New membership discounts will be
                                    applied on next orders,previous orders will
                                    be same as old membership
                                  </p>
                                  <div className="flex items-center justify-end gap-2">
                                    {isLoading ? (
                                      <button className="button-upgrade flex items-center justify-center">
                                        <BeatLoader
                                          size={7}
                                          color="rgb(49, 134, 22)"
                                        />
                                      </button>
                                    ) : (
                                      <button
                                        className="button-upgrade flex items-center justify-center"
                                        onClick={() => changePlan(changeData)}
                                      >
                                        Subscribe
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </AlertModal2>
                            {/* membershipModal */}
                            <AlertModal2
                              isOpen={membershipModal}
                              onClose={() => setMemberShip(false)}
                              title={"Membership"}
                            >
                              <div
                                style={{
                                  width: 350,

                                  maxWidth: "100%",
                                }}
                              >
                                <div className="pt-3">
                                  <p className="text-md">{msg}</p>
                                  <div className="flex items-center justify-end gap-2">
                                    <button
                                      className="button-upgrade flex items-center justify-center"
                                      onClick={() => setMemberShip(false)}
                                    >
                                      Ok
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </AlertModal2>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="font-xs mt-2">
                            <ul className="mr-50 float-start pl-0">
                              <li className=" tab-font">
                                Description:{" "}
                                {product_result?.data[0]?.description}
                              </li>
                              <li className="">
                                Category:{" "}
                                <Link
                                  to={{
                                    pathname: "/products",
                                    search:
                                      `category=` +
                                      product_result?.data[0]?.category.replace(
                                        /\s+/g,
                                        "-"
                                      ),
                                  }}
                                  state={{
                                    value: product_result?.data[0]?.idcategory,
                                    type: "category",
                                    customavi:"avi713",
                                  }}
                                  className="text-decoration-none"
                                >
                                  <span className="text-brand">
                                    {product_result?.data[0]?.category}
                                  </span>
                                </Link>
                              </li>
                              <li className="tab-font">
                                Stock:
                                <span className="in-stock text-brand ml-5">
                                  {product_result?.data[0]?.quantity} Items In
                                  Stock
                                </span>
                              </li>
                            </ul>
                            {/* <ul className="float-start tab-font pl-0">
                              <li className="mb-5 tab-font">
                                MFG:
                                <span className="text-brand"> Jun 4.2022</span>
                              </li>
                              <li className="tab-font">
                                LIFE:{" "}
                                <span className="text-brand">70 days</span>
                              </li>
                            </ul> */}
                            {/* <ul className="float-start tab-font pl-0">
                              <li className="mb-5">
                                    SKU:{" "}
                                    <a href="#" className="text-brand">FWM15VKT</a>
                                  </li>
                                  <li className="mb-5 tab-font">
                                    Tags:{" "}
                                    <a href="#" rel="tag">Snack</a>
                                    ,{" "}
                                    <a href="#" rel="tag">Organic</a>
                                    ,{" "}
                                    <a href="#" rel="tag">Brown</a>
                                  </li>
                            </ul> */}
                          </div>
                          <div>
                            <div className="why-shop-text">
                              Why shop from Ghar Ghar Bazaar?
                            </div>
                            <div className="flex flex-col gap-3">
                              <WhyCard
                                src={Ghar1}
                                subTitle={"Superfast Delivery"}
                                subTitle2={
                                  "Get your order delivered to your doorstep at the earliest from dark stores near you."
                                }
                              />
                              <WhyCard
                                src={Ghar2}
                                subTitle={"Best Prices & Offers"}
                                subTitle2={
                                  "Best price destination with offers directly from the manufacturers."
                                }
                              />
                              <WhyCard
                                src={Ghar2}
                                subTitle={"Wide Assortment"}
                                subTitle2={
                                  "Choose from 5000+ products across food, personal care, household & other categories."
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        {/* <div className="container-fluid mb-30 ">
          <div className="row">
            <div className="col-lg-12">
              <div className="product-info">
                <div className="tab-style3">
                  <ul className="nav nav-tabs text-uppercase">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="Description-tab"
                        data-bs-toggle="tab"
                        href="#Description"
                      >
                        Description
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="Additional-info-tab"
                        data-bs-toggle="tab"
                        href="#Additional-info"
                      >
                        Additional info
                      </a>
                    </li>
                   
                  </ul>
                  <div className="tab-content shop_info_tab entry-main-content">
                    <div className="tab-pane fade show active" id="Description">
                      <div className="">
                        <p className="tab-font">
                          This Uninhibited carnally hired played in whimpered
                          dear gorilla koala depending and much yikes off far
                          quetzal goodness and from for grimaced goodness
                          unaccountably and meadowlark near unblushingly crucial
                          scallop tightly neurotic hungrily some and dear
                          furiously this apart.
                        </p>
                        <p className="tab-font">
                          Spluttered narrowly yikes left moth in yikes bowed
                          this that grizzly much hello on spoon-fed that alas
                          rethought much decently richly and wow against the
                          frequent fluidly at formidable acceptably flapped
                          besides and much circa far over the bucolically hey
                          precarious goldfinch mastodon goodness gnashed a
                          jellyfish and one however because.
                        </p>
                        <ul className="product-more-infor mt-10 mb-3">
                          <li className="tab-font">
                            <span>Type Of Packing</span> Bottle
                          </li>
                          <li className="tab-font">
                            <span>Color</span> Green, Pink, Powder Blue, Purple
                          </li>
                          <li className="tab-font">
                            <span>Quantity Per Case</span> 100ml
                          </li>
                          <li className="tab-font">
                            <span>Ethyl Alcohol</span> 70%
                          </li>
                          <li className="tab-font">
                            <span>Piece In One</span> Carton
                          </li>
                        </ul>
                        <hr className="wp-block-separator is-style-dots mb-3" />
                        <p className="tab-font">
                          Laconic overheard dear woodchuck wow this outrageously
                          taut beaver hey hello far meadowlark imitatively
                          egregiously hugged that yikes minimally unanimous
                          pouted flirtatiously as beaver beheld above forward
                          energetic across this jeepers beneficently cockily
                          less a the raucously that magic upheld far so the this
                          where crud then below after jeez enchanting drunkenly
                          more much wow callously irrespective limpet.
                        </p>
                        <h4 className="mt-20 tab-title">
                          Packaging & Delivery
                        </h4>
                        <hr className="wp-block-separator is-style-wide" />
                        <p className="tab-font">
                          Less lion goodness that euphemistically robin
                          expeditiously bluebird smugly scratched far while thus
                          cackled sheepishly rigid after due one assenting
                          regarding censorious while occasional or this more
                          crane went more as this less much amid overhung
                          anathematic because much held one exuberantly sheep
                          goodness so where rat wry well concomitantly.
                        </p>
                        <p className="tab-font">
                          Scallop or far crud plain remarkably far by thus far
                          iguana lewd precociously and and less rattlesnake
                          contrary caustic wow this near alas and next and pled
                          the yikes articulate about as less cackled dalmatian
                          in much less well jeering for the thanks blindly
                          sentimental whimpered less across objectively fanciful
                          grimaced wildly some wow and rose jeepers outgrew
                          lugubrious luridly irrationally attractively
                          dachshund.
                        </p>
                        <h4 className="mt-20 tab-title">Suggested Use</h4>
                        <hr className="wp-block-separator is-style-dots mb-3" />
                        <ul className="product-more-infor mt-10">
                          <li className="tab-font">
                            <div>Refrigeration not necessary.</div>
                          </li>
                          <li className="tab-font">
                            <div>Stir before serving</div>
                          </li>
                        </ul>
                        <h4 className="mt-20 tab-title">Other Ingredients</h4>
                        <hr className="wp-block-separator is-style-dots mb-3" />
                        <ul className="product-more-infor mt-10 w-full">
                          <li className="tab-font">
                            <div>Organic raw pecans organic raw cashews.</div>
                          </li>
                          <li className="tab-font">
                            <div>
                              This butter was produced using a LTG (Low
                              Temperature Grinding) process
                            </div>
                          </li>
                          <li className="tab-font">
                            <div>
                              Made in machinery that processes tree nuts but
                              does not process peanuts, gluten, dairy or soy
                            </div>
                          </li>
                        </ul>
                        <h4 className="mt-20 tab-title">Warnings</h4>
                        <hr className="wp-block-separator is-style-dots mb-3" />
                        <ul className="product-more-infor mt-10">
                          <li className="tab-font">
                            <div>
                              Oil separation occurs naturally. May contain
                              pieces of shell.
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="Additional-info">
                      <table className="font-md">
                        <tbody>
                          <tr className="stand-up ">
                            <th className="tab-font">Unit</th>
                            <td>
                              <p className="tab-font">
                                35″L x 24″W x 37-45″H(front to back wheel)
                              </p>
                            </td>
                          </tr>
                          <tr className="folded-wo-wheels">
                            <th className="tab-font">Shelf Life</th>
                            <td>
                              <p className="tab-font">
                                32.5″L x 18.5″W x 16.5″H
                              </p>
                            </td>
                          </tr>
                          <tr className="folded-w-wheels">
                            <th className="tab-font">Manufacturer Details</th>
                            <td>
                              <p className="tab-font">32.5″L x 24″W x 18.5″H</p>
                            </td>
                          </tr>
                          <tr className="door-pass-through">
                            <th className="tab-font">Marketed By</th>
                            <td>
                              <p className="tab-font">24</p>
                            </td>
                          </tr>
                          <tr className="frame">
                            <th className="tab-font">Frame</th>
                            <td>
                              <p className="tab-font">Aluminum</p>
                            </td>
                          </tr>
                          <tr className="weight-wo-wheels">
                            <th className="tab-font">FSSAI License</th>
                            <td>
                              <p className="tab-font">20 LBS</p>
                            </td>
                          </tr>
                          <tr className="weight-capacity">
                            <th className="tab-font">Return Policy</th>
                            <td>
                              <p className="tab-font">60 LBS</p>
                            </td>
                          </tr>
                          <tr className="width">
                            <th className="tab-font">Expiry Date</th>
                            <td>
                              <p className="tab-font">24″</p>
                            </td>
                          </tr>
                          <tr className="handle-height-ground-to-handle">
                            <th className="tab-font">Packaging Type</th>
                            <td>
                              <p className="tab-font">37-45″</p>
                            </td>
                          </tr>
                          <tr className="wheels">
                            <th className="tab-font">Seller</th>
                            <td>
                              <p className="tab-font">
                                12″ air / wide track slick tread
                              </p>
                            </td>
                          </tr>
                          <tr className="seat-back-height">
                            <th className="tab-font">Seller FSSAI</th>
                            <td>
                              <p className="tab-font">21.5″</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="tab-pane fade" id="Vendor-info">
                      <div className="vendor-logo d-flex mb-30">
                        <Img src={vendor18} alt="" />
                        <div className="vendor-name ml-15">
                          <h6>
                            <a href="vendor-details-2.html">
                              <strong>Noodles Co.</strong>
                            </a>
                          </h6>
                          <div className="product-rate-cover text-end">
                            <div className="product-rate d-inline-block">
                              <div
                                className="product-rating"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                            <span className="font-small ml-5 text-muted">
                              {" "}
                              (32 reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                      <ul className="contact-infor mb-25 flex items-start gap-1">
                        <Img src={iconLocation} alt="" />
                        <div className="flex flex-col gap-1">
                          <li className="flex items-center mb-0">
                            &nbsp;<strong>Address: </strong>&nbsp;
                            <span>
                              5171 W Campbell Ave undefined Kent, Utah 53127
                              United States
                            </span>
                          </li>
                          <li>
                            <Img
                              src="assets/imgs/theme/icons/icon-contact.svg"
                              alt=""
                            />
                            &nbsp;<strong>Contact Seller:</strong>
                            &nbsp;
                            <span>(+91) - 540-025-553</span>
                          </li>
                        </div>
                      </ul>
                      <div className="d-flex mb-15">
                        <div className="mr-30">
                          <p className="text-brand font-md font-semibold">
                            Rating
                          </p>
                          <h4 className="mb-0 font-sm">92%</h4>
                        </div>
                        <div className="mr-30">
                          <p className="text-brand font-md font-semibold">
                            Ship on time
                          </p>
                          <h4 className="mb-0 font-sm">100%</h4>
                        </div>
                        <div>
                          <p className="text-brand font-md font-semibold">
                            Chat response
                          </p>
                          <h4 className="mb-0 font-sm">89%</h4>
                        </div>
                      </div>
                      <p className="tab-font">
                        Noodles & Company is an American fast-casual restaurant
                        that offers international and American noodle dishes and
                        pasta in addition to soups and salads. Noodles & Company
                        was founded in 1995 by Aaron Kennedy and is
                        headquartered in Broomfield, Colorado. The company went
                        public in 2013 and recorded a $457 million revenue in
                        2017.In late 2018, there were 460 Noodles & Company
                        locations across 29 states and Washington, D.C.
                      </p>
                    </div>
                    <div className="tab-pane fade" id="Reviews">
                     
                      <div className="comments-area">
                        <div className="row">
                          <div className="col-lg-8">
                            <h4 className="mb-30">
                              Customer questions & answers
                            </h4>
                            <div className="comment-list">
                              <div className="single-comment justify-content-between d-flex mb-30">
                                <div className="user justify-content-between d-flex">
                                  <div className="thumb text-center">
                                    <Img src={author2} alt="" />
                                    <a
                                      href="#"
                                      className="font-heading text-brand"
                                    >
                                      Sienna
                                    </a>
                                  </div>
                                  <div className="desc">
                                    <div className="d-flex justify-content-between mb-10">
                                      <div className="d-flex align-items-center">
                                        <span className="font-xs text-muted">
                                          December 4, 2022 at 3:12 pm{" "}
                                        </span>
                                      </div>
                                      <div className="product-rate d-inline-block">
                                        <div
                                          className="product-rating"
                                          style={{ width: "100%" }}
                                        ></div>
                                      </div>
                                    </div>
                                    <p className="mb-10 tab-font">
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipisicing elit. Delectus, suscipit
                                      exercitationem accusantium obcaecati quos
                                      voluptate nesciunt facilis itaque modi
                                      commodi dignissimos sequi repudiandae
                                      minus ab deleniti totam officia id
                                      incidunt?{" "}
                                      <a
                                        href="#"
                                        className="reply font-heading text-brand"
                                      >
                                        Reply
                                      </a>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="single-comment justify-content-between d-flex mb-30">
                                <div className="user justify-content-between d-flex">
                                  <div className="thumb text-center">
                                    <Img src={author2} alt="" />
                                    <a
                                      href="#"
                                      className="font-heading text-brand"
                                    >
                                      Sienna
                                    </a>
                                  </div>
                                  <div className="desc">
                                    <div className="d-flex justify-content-between mb-10">
                                      <div className="d-flex align-items-center">
                                        <span className="font-xs text-muted">
                                          December 4, 2022 at 3:12 pm{" "}
                                        </span>
                                      </div>
                                      <div className="product-rate d-inline-block">
                                        <div
                                          className="product-rating"
                                          style={{ width: "100%" }}
                                        ></div>
                                      </div>
                                    </div>
                                    <p className="mb-10 tab-font">
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipisicing elit. Delectus, suscipit
                                      exercitationem accusantium obcaecati quos
                                      voluptate nesciunt facilis itaque modi
                                      commodi dignissimos sequi repudiandae
                                      minus ab deleniti totam officia id
                                      incidunt?{" "}
                                      <a
                                        href="#"
                                        className="reply font-heading text-brand"
                                      >
                                        Reply
                                      </a>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="single-comment justify-content-between d-flex mb-30">
                                <div className="user justify-content-between d-flex">
                                  <div className="thumb text-center">
                                    <Img src={author2} alt="" />
                                    <a
                                      href="#"
                                      className="font-heading text-brand"
                                    >
                                      Sienna
                                    </a>
                                  </div>
                                  <div className="desc">
                                    <div className="d-flex justify-content-between mb-10">
                                      <div className="d-flex align-items-center">
                                        <span className="font-xs text-muted">
                                          December 4, 2022 at 3:12 pm{" "}
                                        </span>
                                      </div>
                                      <div className="product-rate d-inline-block">
                                        <div
                                          className="product-rating"
                                          style={{ width: "100%" }}
                                        ></div>
                                      </div>
                                    </div>
                                    <p className="mb-10 tab-font">
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipisicing elit. Delectus, suscipit
                                      exercitationem accusantium obcaecati quos
                                      voluptate nesciunt facilis itaque modi
                                      commodi dignissimos sequi repudiandae
                                      minus ab deleniti totam officia id
                                      incidunt?{" "}
                                      <a
                                        href="#"
                                        className="reply font-heading text-brand"
                                      >
                                        Reply
                                      </a>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <h4 className="mb-30">Customer reviews</h4>
                            <div className="d-flex mb-30">
                              <div className="product-rate d-inline-block mr-15">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <h6>4.8 out of 5</h6>
                            </div>
                            <div className="progress">
                              <span>5 star</span>
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "50%" }}
                                ariaValuenow="50"
                                ariaValuemin="0"
                                ariaValuemax="100"
                              >
                                50%
                              </div>
                            </div>
                            <div className="progress">
                              <span>4 star</span>
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "25%" }}
                                ariaValuenow="25"
                                ariaValuemin="0"
                                ariaValuemax="100"
                              >
                                25%
                              </div>
                            </div>
                            <div className="progress">
                              <span>3 star</span>
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "45%" }}
                                ariaValuenow="45"
                                ariaValuemin="0"
                                ariaValuemax="100"
                              >
                                45%
                              </div>
                            </div>
                            <div className="progress">
                              <span>2 star</span>
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "65%" }}
                                ariaValuenow="65"
                                ariaValuemin="0"
                                ariaValuemax="100"
                              >
                                65%
                              </div>
                            </div>
                            <div className="progress mb-30">
                              <span>1 star</span>
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "85%" }}
                                ariaValuenow="85"
                                ariaValuemin="0"
                                ariaValuemax="100"
                              >
                                85%
                              </div>
                            </div>
                            <a href="#" className="font-xs text-muted">
                              How are ratings calculated?
                            </a>
                          </div>
                        </div>
                      </div>
                   
                      <div className="comment-form">
                        <h4 className="mb-15">Add a review</h4>
                        <div className="product-rate d-inline-block mb-30"></div>
                        <div className="row">
                          <div className="col-lg-8 col-md-12">
                            <form
                              className="form-contact comment_form"
                              action="#"
                              id="commentForm"
                            >
                              <div className="row">
                                <div className="col-12">
                                  <div className="form-group">
                                    <textarea
                                      className="form-control w-100"
                                      name="comment"
                                      id="comment"
                                      cols="30"
                                      rows="9"
                                      placeholder="Write Comment"
                                    ></textarea>
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <input
                                      className="form-control"
                                      name="name"
                                      id="name"
                                      type="text"
                                      placeholder="Name"
                                    />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <input
                                      className="form-control"
                                      name="email"
                                      id="email"
                                      type="email"
                                      placeholder="Email"
                                    />
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="form-group">
                                    <input
                                      className="form-control"
                                      name="website"
                                      id="website"
                                      type="text"
                                      placeholder="Website"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="form-group">
                                <button
                                  type="submit"
                                  className="button button-contactForm"
                                >
                                  Submit Review
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* {console.log(
"product_result?.data[0]?.brand_wise",
product_result?.data[0]
)} */}

        <PageSection
          productData={
            product_result &&
            product_result?.category_wise &&
            product_result?.category_wise
          }
          loading={product_loading}
          title={"People also search for"}
          isSeeall={false}
        />
        <PageSection
          productData={
            product_result &&
            product_result?.brand_wise &&
            product_result?.brand_wise
          }
          loading={product_loading}
          title={"You may also like"}
          isSeeall={false}
        />

        {/* <div className="container-fluid mb-30 ">
  <div className="row mt-60" style={{ marginBottom: "2.5rem" }}>
    <div className="col-12">
      <h2 className="section-title style-1 mb-30"> Related products </h2>
    </div>
    <div className="col-12">
      <div className="11row related-products grid gap-4">
        {Related_product.map((item, key) => (
        <div className="product-cart-wrap hover-up">
          <div className="product-img-action-wrap">
            <div className="product-img product-img-zoom">
              <a href="shop-product-right.html" tabindex="0">
                <Img className="default-img" src={item.defaultImg} alt="" />
                <Img className="hover-img" src={item.hoverImg} alt="" />
              </a>
            </div>
            <div className="product-action-1">
              <a aria-label="Quick view" className="action-btn small hover-up" data-bs-toggle="modal"
                data-bs-target="#quickViewModal">
                <i className="fi-rs-search"></i>
              </a>
              <a aria-label="Add To Wishlist" className="action-btn small hover-up" href="shop-wishlist.html"
                tabindex="0">
                <i className="fi-rs-heart"></i>
              </a>
              <a aria-label="Compare" className="action-btn small hover-up" href="shop-compare.html" tabindex="0">
                <i className="fi-rs-shuffle"></i>
              </a>
            </div>
            <div className="product-badges product-badges-position product-badges-mrg">
              <span className={item.badgeBg}>
                {item.badge}
              </span>
            </div>
          </div>
          <div className="product-content-wrap">
            <h2>
              <a href="shop-product-right.html" tabindex="0">
                {item.title}
              </a>
            </h2>
            <div className="rating-result" title="90%">
              <span> </span>
            </div>
            <div className="product-price">
              <span>${item.price}</span>
              <span className="old-price">
                ${item.oldprice}
              </span>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  </div>
</div> */}
      </main>
      <LoginModel open={loginOpen} onCloseModal={onLoginCloseModal} />
      <LandingPageFooter />
    </>
  );
};

export default ProductSinglePage;
