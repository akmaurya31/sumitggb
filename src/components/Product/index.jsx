import { AddCartPost, RemoveCartPost } from "Actions/cart/action";
import { updateMembershipPost } from "Actions/loginotp/action";
import { Img } from "components";
import { ButtonLoader } from "components/Loader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";
import vegicon from "../../styles/imgs/logo/vegicon.svg";
import nonvegicon from "../../styles/imgs/logo/nonvegicon.svg";
import Other from "../../styles/imgs/logo/Other.svg";
import { LoginModel } from "../LandingPageHeader/LoginModel";
import "./ProductCard.scss";
import ProductImage from "./ProductImage";
import AlertModal2 from "components/Alert/alert2";
import { BeatLoader } from "react-spinners";
import BadgePro from "components/BadgePro";
import ProductMembershipCard from "components/ProductMembershipCard";
import MyModal from "components/MyModal";
import DrawerBottom from "components/DrawerBottom/DrawerBottom";
import { ReturnPR, ReturnPRBadge } from "components/ReturnPRBadge";

const Product = (props) => {
  var { prd, exiting_deal, handleApply } = { ...props };
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [loginOpen, setloginOpen] = useState(false);
  const [buttonLogin, setLoding] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isMemberConfrm, setConfrm] = useState(false);
  const [changeData, setChange] = useState();
  const [isMemberTitle, setMemberTitle] = useState('');
  const [openBottomDrawer, setOpenBottomDrawer] = useState(false);

  const token = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.access_token
  );

  const token_date = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.expires_at
  );
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const { idmembership_plan, membership_name } = useSelector(
    (state) => state.LoginOtpVerifyReducer?.currentmembership
  );
  const { msg } = useSelector((state) => state.LoginOtpVerifyReducer);
  const [isMembership, setMembership] = useState(false);
  useEffect(() => {
    if (token === undefined && token_date === undefined) {
      setIsTokenExpired(true);
    } else {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      // console.log(token_date < currentTimestamp);
      setIsTokenExpired(token_date < currentTimestamp);
    }
  }, [isTokenExpired, token, token_date]);

  const item_id = prd?.batches
    ? prd?.batches[0]?.idproduct_master
      ? prd?.batches[0]?.idproduct_master
      : prd?.idproduct_master
    : prd?.idproduct_master;
  var { cart_result, cart_id, cart_error } = useSelector(
    (state) => state.CartReducer
  );
  var [quantity, setQuantity] = useState(0);
  

  useEffect(() => {
    if (cart_result?.length > 0) {
      cart_result.map((cartItem) => {
        const cart_item_id = cartItem?.idproduct_master;
        if (cart_item_id === item_id) {
          setQuantity(cartItem.quantity);
         
        }
      
      });
    } else {
      setQuantity(0);
      
    }

    setLoding(false);
  }, [cart_result, item_id, quantity]);

  useEffect(() => {
    if (cart_error) {
      setLoding(false);
    }
  }, [cart_error]);
  useEffect(() => {
    // if error come in any cart api
    if (buttonLogin) {
      const timeoutId = setTimeout(() => {
        localStorage.clear();
        // console.log("error in api");
      }, 4000);
      return () => clearTimeout(timeoutId);
    }
  }, [buttonLogin, cart_error]);
  const storeids = useSelector(
    (state) => state?.WarehouseReducer?.warehouseData
  );
  const id = useSelector(
    (state) => state?.WarehouseReducer?.warehouseData
  );
  //const storeid = id &&id.length>0&& id[0].idstore_warehouse;
  // console.log(storeids,"storeidsstoreidsstoreids 1")
 const storeid = storeids[0]?.idstore_warehouse
 

  const onOpenModal = () => {
    setOpen(true);
  };
  const onCloseModal = () => setOpen(false);
  const idproduct_batch = prd?.batches
    ? prd?.batches[0]?.idproduct_batch
      ? prd.batches[0].idproduct_master
      : 0
    : 0;
  var newCart = [];
  const addtocart = (is_quantity_update) => {
    setLoding(true);
    quantity = is_quantity_update == "minus" ? quantity - 1 : quantity + 1;
    console.log("quantity",quantity,is_quantity_update)
    var cart_data = [];
    if (cart_result && cart_result?.length) {
      if (is_quantity_update == "minus" || is_quantity_update == "plus") {
        if (quantity > 0) {
          cart_data = cart_result.map((cartItem) => {
            const cart_item_id = cartItem.batches
              ? cartItem.batches[0]?.idproduct_master
                ? cartItem.batches[0].idproduct_master
                : cartItem.idproduct_master
              : cartItem.idproduct_master;
            return cart_item_id === item_id
              ? { ...cartItem, quantity: quantity }
              : cartItem;
          });
        } else {
          cart_data = cart_result.filter((item) => {
            const cart_filter_item_id = item.batches
              ? item.batches[0]?.idproduct_master
                ? item.batches[0].idproduct_master
                : item.idproduct_master
              : item.idproduct_master;
            return cart_filter_item_id !== item_id;
          });
        }
      } else {
        newCart = {
          ...prd,
          quantity: 1,
          idproduct_batch: idproduct_batch,
          idproduct_master: item_id,
        };
        cart_data = [...cart_result, newCart];
      }
    } else {
      newCart = {
        ...prd,
        quantity: 1,
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
              cart_id == null
                ? Date.now() + Math.floor(Math.random() * 1000) + "_Web"
                : cart_id,
            idstore: storeid,
            idproduct_master: prd.idproduct_master,
            idinventory: prd.idinventory,
            qty: quantity,
          },
          cart_data,
          token
        )
      );

      if (exiting_deal) {
        handleApply(exiting_deal);
      }
    } else {
      dispatch(
        RemoveCartPost(
          "api/remove-from-cart",
          {
            cart_id: cart_id,
            idstore: storeid,
            idproduct_master: prd.idproduct_master,
          },
          cart_data,
          token
        )
      );
      if (exiting_deal) {
        handleApply("");
      }
    }
  };
  const changePlan = (plan) => {
    // console.log("change Plan" + plan);
    dispatch(
      updateMembershipPost(token, "api/change-membership", {
        idmembership_plan: plan,
      })
    );
    setConfrm(false);
    setTimeout(() => {
      setOpen(false);
      setMembership(true);
    }, 1500);
  };

  const OkToCloseDrawer = () => {
    setMembership(false)
    setTimeout(() => {
      setOpenBottomDrawer(false);
    }, 1000);
  }

  const getMembership = (plan) => {
    setloginOpen(true);
    if (token) {
      changePlan(plan);
      // console.log("Membership" + plan);
    }
  };
  const onLoginCloseModal = () => setloginOpen(false);

  // Change Plan Modal
  const openModal = (data, title) => {
    console.log("data", data + title)
    setConfrm(true);
    setChange(data);
    setMemberTitle(title);
  };

  const ibadgeExists = "is_veg" in prd;
  const ibadgeValue = ibadgeExists ? prd.is_veg : 0;
  // console.log("prd.ibadge",ibadgeExists)
  const getIcons = () => {
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
  // const RetrunPR = (membership, mrp, instance, prodcut, land, coparter) => {
  //   if (membership == 1) {
  //     return Math.round(((mrp - instance) / mrp) * 100);
  //   }
  //   if (membership == 2) {
  //     return Math.round(((mrp - prodcut) / mrp) * 100);
  //   }
  //   if (membership == 3) {
  //     return Math.round(((mrp - land) / mrp) * 100);
  //   }
  //   if (membership == 4) {
  //     return Math.round(((mrp - coparter) / mrp) * 100);
  //   }
  // };
  // console.log("msg", msg);
  // const RetrunPRBadge = (
  //   membership,
  //   mrp,
  //   instance,
  //   prodcut,
  //   land,
  //   coparter
  // ) => {
  //   if (membership == 1) {
  //     if (mrp !== instance) {
  //       return true;
  //     }
  //   }
  //   if (membership == 2) {
  //     if (mrp !== prodcut) {
  //       return true;
  //     }
  //   }
  //   if (membership == 3) {
  //     if (mrp !== land) {
  //       return true;
  //     }
  //   }
  //   if (membership == 4) {
  //     if (mrp !== coparter) {
  //       return true;
  //     }
  //   }
  // };

  const toggleDrawerBottom = (newOpen) => () => {
    setOpenBottomDrawer(newOpen);
  };

  const isCartAdd=cart_result?.some((cr)=>cr.idproduct_master===prd.idproduct_master)

  return (
    <>
      <div className="product-cart-wrap card-style   relative    mt-4 mb-4">
        <>
          {ReturnPRBadge(
            idmembership_plan,
            prd?.mrp,
            prd?.instant,
            prd?.product,
            prd?.land,
            prd?.copartner
          ) && (
              <BadgePro
                PR={ReturnPR(
                  idmembership_plan,
                  prd?.mrp,
                  prd?.instant,
                  prd?.product,
                  prd?.land,
                  prd?.copartner
                )}
              />
            )}
        </>

        {/* <Img className="veg-icon z-10" src={vegicon} alt="" /> */}

        {getIcons()}
        <ProductImage
          prd={prd}
          style={true}
          isHeight={
            prd?.selected_batch?.copartner == null &&
            prd?.selected_batch?.land == null
          }
        />
        <div className="product-content-wrap p-2 1111 w-[100%]">
          <div className="product-category">
            {/* <a href="products.php" className="text-decoration-none">
                            <i className="fa fa-location"></i> 13 min
                        </a> */}
          </div>
          <div style={{ height: 40 }}>
            <h2>
              <Link
                to={`/prn/${prd?.prod_name.replace(/\s+/g, "-")}/${prd?.idproduct_master
                  }`}
                className="text-decoration-none"
              >
                {prd?.prod_name}
              </Link>
            </h2>
          </div>
          {/* <div className="product-rate d-inline-block">
                            <div className="product-rating" style={{ width: "80%" }}></div>
                        </div> */}
          <div style={{ paddingBottom: "0.5rem" }}>
            {prd?.selected_batch?.copartner != null &&
              prd?.selected_batch?.land != null &&
              prd?.selected_batch?.product != null && (
                <select
                  className="desktop-view form-select form-select-sm comboPack"
                  aria-label=".form-select-sm example"
                  style={{ height: "30px", width: "100%" }}
                  onClick={() => onOpenModal(prd)}
                >
                  <option>
                    View Cashback Rs&nbsp;
                    {(prd?.instant-prd?.member_price[3]?.price)?.toFixed(2)}, {(prd?.instant-prd?.member_price[2]?.price)?.toFixed(2)},{" "}
                    {(prd?.instant-prd?.member_price[1]?.price)?.toFixed(2)}
                  </option>
                </select>
              )}
          </div>

          <div style={{ paddingBottom: "0.5rem" }}>
            {prd?.selected_batch?.copartner != null &&
              prd?.selected_batch?.land != null &&
              prd?.selected_batch?.product != null && (
                <select
                  className="mobile-view form-select form-select-sm comboPack"
                  aria-label=".form-select-sm example"
                  style={{ height: "30px", width: "100%" }}
                  onClick={toggleDrawerBottom(true)}
                >
                  <option>
                    View Cashback Rs&nbsp;
                    {(prd?.instant-prd?.member_price[3]?.price)?.toFixed(2)}, {(prd?.instant-prd?.member_price[2]?.price)?.toFixed(2)},{" "}
                    {(prd?.instant-prd?.member_price[1]?.price)?.toFixed(2)}
                  </option>
                </select>
              )}
          </div>

          <div className="flex justify-between items-center relative bottom-0 11111 ">
            {ReturnPRBadge(
              idmembership_plan,
              prd?.mrp,
              prd?.selling_price,
              prd?.product,
              prd?.land,
              prd?.copartner
            ) ? (
              <>
                <div className="product-price ">
                  <span className="block">
                    ₹ {new Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(prd?.instant)}
                  </span>
                  <span className="old-price block m-0">₹{prd?.mrp}</span>
                </div>
                {/* <div className="product-price ">
                  {(idmembership_plan == undefined ||
                    idmembership_plan == 1) && (
                      <span className="block">
                        ₹
                        {new Intl.NumberFormat("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(prd?.selling_price)}
                      </span>
                    )}
                  {idmembership_plan == 2 && (
                    <span className="block">
                      ₹
                      {prd?.product
                        ? new Intl.NumberFormat("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(prd?.product)
                        : new Intl.NumberFormat("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(prd?.selling_price)}
                    </span>
                  )}
                  {idmembership_plan == 3 && (
                    <span className="block">
                      <>
                        {" "}
                        ₹
                        {prd?.land
                          ? new Intl.NumberFormat("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(prd?.land)
                          : new Intl.NumberFormat("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(prd?.selling_price)}
                      </>
                    </span>
                  )}
                  {idmembership_plan == 4 && (
                    <span className="block">
                      ₹
                      {prd?.copartner
                        ? new Intl.NumberFormat("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(prd?.copartner)
                        : new Intl.NumberFormat("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(prd?.selling_price)}
                    </span>
                  )}
                  <span className="old-price block m-0">₹{prd?.mrp}</span>
                </div> */}
              </>
            ) : (
              <div className="product-price ">
                {" "}
                <span className="block">₹{prd?.mrp}</span>
              </div>
            )}

            <div className="product-card-bottom mt-0">
              <div
                className="product-price"
                style={{
                  fontSize: "20px",
                  color: "#000",
                  fontWeight: "bolder",
                }}
              >
                {/* <i className="fa-regular fa-bookmark"></i> */}
              </div>

              <div className="product-card-bottom mt-0 11">
                <div
                  className="product-price"
                  style={{
                    fontSize: "20px",
                    color: "#000",
                    fontWeight: "bolder",
                  }}
                >
                  {/* <i className="fa-regular fa-bookmark"></i> */}
                </div>
                {/* {console.log("quantity=>",qntyObj)} */}
                
                <div className="11add-cart add-btn">
                  {quantity>0 && isCartAdd ? (
                    <span
                      className={`button text-decoration-none btn-sm ${quantity > 0 && " active "
                        }`}
                    >
                      <>
                        {buttonLogin == true ? (
                          <ButtonLoader color="rgb(12, 131, 31)" size={6} />
                        ) : (
                          <div className="flex items-center" style={{ gap: 5 }}>
                            <div>
                              <i
                                className="fa-solid fa-minus mr-1"
                                onClick={() => addtocart("minus")}
                              ></i>
                            </div>
                            <span>{quantity}</span>
                            <div>
                              <i
                                className="fa-solid fa-plus ml-1"
                                onClick={() => addtocart("plus")}
                              ></i>
                            </div>
                          </div>
                        )}
                      </>
                    </span>
                  ) : (
                    <span
                      className="button text-decoration-none btn-sm"
                      onClick={() => addtocart(prd)}
                    >
                      {/* <i className="fi-rs-shopping-cart mr-5"></i> */}
                      {buttonLogin == true ? (
                        <ButtonLoader color="rgb(12, 131, 31)" size={6} />
                      ) : (
                        "Add"
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal

        classNames={"product-modal"}
        open={open}
        onClose={onCloseModal}
        center
      >

        <ProductMembershipCard
          prd={prd && prd}
          idmembership_plan={idmembership_plan}
          item_id={item_id}
          token={token}
          isTokenExpired={isTokenExpired}
          quantity={quantity}
          addtocart={addtocart}
          openModal={openModal}
          getMembership={getMembership}
          buttonLogin={buttonLogin}
          isCartAdd={isCartAdd}
        />

        {/* <div className="flex flex-wrap sm:gap-1 gap-6"> */}
        <div className="hidden 11grid sm:grid-cols-2 md:grid-cols-2 grid-cols-4 sm:gap-1 gap-6 sm:pt-6">
          {/* Instant */}
          {prd?.selected_batch?.copartner && (
            <div
              className={`modal-product-card product-cart-wrap 11cart-width w-44 max-w-full relative flex justify-between pt-2 ${idmembership_plan == 1 && " active-package"
                }`}
            >
              <span className="card-badge text-indigo-100 bg-orange-800 text-xs me-0 px-2.5 py-0.5 11rounded dark:bg-indigo-900 dark:text-yellow-300 w-full h-7 flex items-center justify-center font-bold">
                Instant discount
              </span>
              {/* <span class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-indigo-700 rounded">Copartner discount</span> */}

              <Img className="veg-icon" src={vegicon} alt="" />
              <div style={{ marginTop: "1.2rem" }}>
                <ProductImage prd={prd} style={false} />
              </div>

              <div className="product-content-wrap p-2">
                {/* <div className="product-category">
                  <a href="/products" className="text-decoration-none">
                    <i className="fa fa-location"></i> 13 min
                  </a>
                </div> */}
                <h2>
                  <Link
                    to={{
                      pathname: "/product-single",
                      search: prd?.prod_name.replace(/\s+/g, "-"),
                    }}
                    state={{ value: item_id }}
                    className="text-decoration-none"
                  >
                    {prd?.prod_name}
                  </Link>
                </h2>
                {/* <div className="product-rate d-inline-block">
                <div className="product-rating" style={{ width: " 80%" }}></div>
              </div> */}
                <div className="flex flex-wrap items-center justify-between">
                  <div className="product-price ">
                    <span>₹{prd?.selling_price?.toFixed(2)}</span>
                    {/* <span className="old-price">₹ 245.8</span> */}
                  </div>
                  <div className="product-card-bottom">
                    <div
                      className="product-price"
                      style={{
                        fontSize: "20px",
                        color: "#000",
                        fontWeight: "bolder",
                      }}
                    ></div>
                    <div className="11add-cart add-btn ">
                      {token && isTokenExpired == false ? (
                        idmembership_plan == 1 ? (
                          quantity ? (
                            <span
                              className={`button text-decoration-none btn-sm ${quantity > 0 && " active"
                                }`}
                            >
                              <i
                                className="fa-solid fa-minus mr-1"
                                onClick={() => addtocart("minus")}
                              ></i>
                              {quantity}
                              <i
                                className="fa-solid fa-plus ml-1"
                                onClick={() => addtocart("plus")}
                              ></i>
                            </span>
                          ) : (
                            <span
                              className={`button add text-decoration-none btn-sm `}
                              onClick={() => addtocart(prd)}
                            >
                              {/* <i className="fi-rs-shopping-cart mr-5"></i> */}
                              Add
                            </span>
                          )
                        ) : (
                          <span
                            className="button change-plan text-decoration-none btn-sm change-plan-btn"
                            // onClick={() => changePlan(4)}
                            onClick={() => openModal(1)}
                          >
                            {/* <i className="fi-rs-shopping-cart mr-5"></i> */}
                            Subscribe2
                          </span>
                        )
                      ) : (
                        <span
                          className="button  text-center get-membership text-decoration-none btn-sm change-plan-btn "
                          onClick={() => getMembership(1)}
                        >
                          {/* <i className="fi-rs-shopping-cart mr-5"></i> */}
                          Subscribe
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* copartner */}
          {prd?.selected_batch?.copartner && (
            <div
              className={`modal-product-card product-cart-wrap 11cart-width w-44 max-w-full relative flex justify-between pt-2 ${idmembership_plan == 4 && " active-package"
                }`}
            >
              <span className="card-badge text-indigo-100 bg-indigo-800 text-xs me-0 px-2.5 py-0.5 11rounded dark:bg-indigo-900 dark:text-yellow-300 w-full h-7 flex items-center justify-center font-bold">
                Copartner discount
              </span>
              {/* <span class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-indigo-700 rounded">Copartner discount</span> */}

              <Img className="veg-icon" src={vegicon} alt="" />
              <div style={{ marginTop: "1.2rem" }}>
                <ProductImage prd={prd} style={false} />
              </div>

              <div className="product-content-wrap p-2">
                {/* <div className="product-category">
                  <a href="/products" className="text-decoration-none">
                    <i className="fa fa-location"></i> 13 min
                  </a>
                </div> */}
                <h2>
                  <Link
                    to={{
                      pathname: "/product-single",
                      search: prd?.prod_name.replace(/\s+/g, "-"),
                    }}
                    state={{ value: item_id }}
                    className="text-decoration-none"
                  >
                    {prd?.prod_name}
                  </Link>
                </h2>
                {/* <div className="product-rate d-inline-block">
                <div className="product-rating" style={{ width: " 80%" }}></div>
              </div> */}
                <div className="flex flex-wrap items-center justify-between">
                  <div className="product-price ">
                    <span>₹{prd?.copartner?.toFixed(2)} </span>
                    {/* <span className="old-price">₹ 245.8</span> */}
                  </div>
                  <div className="product-card-bottom">
                    <div
                      className="product-price"
                      style={{
                        fontSize: "20px",
                        color: "#000",
                        fontWeight: "bolder",
                      }}
                    ></div>
                    <div className="11add-cart add-btn ">
                      {token && isTokenExpired == false ? (
                        idmembership_plan == 4 ? (
                          quantity ? (
                            <span
                              className={`button text-decoration-none btn-sm ${quantity > 0 && " active"
                                }`}
                            >
                              <i
                                className="fa-solid fa-minus mr-1"
                                onClick={() => addtocart("minus")}
                              ></i>
                             
                              {quantity}
                              <i
                                className="fa-solid fa-plus ml-1"
                                onClick={() => addtocart("plus")}
                              ></i>
                            </span>
                          ) : (
                            <span
                              className={`button add text-decoration-none btn-sm `}
                              onClick={() => addtocart(prd)}
                            >
                              {/* <i className="fi-rs-shopping-cart mr-5"></i> */}
                              Add
                            </span>
                          )
                        ) : (
                          <span
                            className="button change-plan text-decoration-none btn-sm change-plan-btn"
                            // onClick={() => changePlan(4)}
                            onClick={() => openModal(4)}
                          >
                            {/* <i className="fi-rs-shopping-cart mr-5"></i> */}
                            Subscribe1
                          </span>
                        )
                      ) : (
                        <span
                          className="button  text-center get-membership text-decoration-none btn-sm change-plan-btn "
                          onClick={() => getMembership(4)}
                        >
                          {/* <i className="fi-rs-shopping-cart mr-5"></i> */}
                          Subscribe
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Land */}
          {prd?.selected_batch?.land && (
            <div
              className={`modal-product-card product-cart-wrap 11cart-width w-44 max-w-full relative flex justify-between pt-2 ${idmembership_plan == 3 && " active-package"
                }`}
            >
              <span className="card-badge text-green-100 bg-green-800 text-xs  me-0 px-2.5 py-0.5 11rounded dark:bg-green-900 dark:text-green-300 w-full h-7 flex items-center justify-center font-bold">
                Land discount
                {/* 15% */}
              </span>
              <Img className="veg-icon" src={vegicon} alt="" />
              <div style={{ marginTop: "1.2rem" }}>
                <ProductImage prd={prd} style={false} />
              </div>
              <div className="product-content-wrap p-2">
                {/* <div className="product-category">
                  <a href="products.php" className="text-decoration-none">
                    <i className="fa fa-location"></i> 13 min
                  </a>
                </div> */}
                <h2>
                  <Link
                    to={{
                      pathname: "/product-single",
                      search: prd?.prod_name.replace(/\s+/g, "-"),
                    }}
                    state={{ value: item_id }}
                    className="text-decoration-none"
                  >
                    {prd?.prod_name}
                  </Link>
                </h2>
                {/* <div className="product-rate d-inline-block">
                <div className="product-rating" style={{ width: " 80%" }}></div>
              </div> */}
                <div className="flex flex-wrap items-center justify-between">
                  <div className="product-price ">
                    <span>₹{prd?.land.toFixed(2)} </span>
                    {/* <span className="old-price">₹ 245.8</span> */}
                  </div>
                  <div className="product-card-bottom">
                    <div
                      className="product-price "
                      style={{
                        fontSize: "20px",
                        color: "#000",
                        fontWeight: "bolder",
                      }}
                    >
                      {/* <i className="fa-regular fa-bookmark"></i> */}
                    </div>
                    <div className="11add-cart add-btn">
                      {token && isTokenExpired == false ? (
                        idmembership_plan == 3 ? (
                          quantity ? (
                            <span
                              className={`button text-decoration-none btn-sm ${quantity > 0 && " active"
                                }`}
                            >
                              <i
                                className="fa-solid fa-minus mr-1"
                                onClick={() => addtocart("minus")}
                              ></i>
                              {quantity}
                              <i
                                className="fa-solid fa-plus ml-1"
                                onClick={() => addtocart("plus")}
                              ></i>
                            </span>
                          ) : (
                            <span
                              className={`button text-decoration-none btn-sm `}
                              onClick={() => addtocart(prd)}
                            >
                              {/* <i className="fi-rs-shopping-cart mr-5"></i> */}
                              Add
                            </span>
                          )
                        ) : (
                          <span
                            className="button text-decoration-none btn-sm change-plan-btn"
                            // onClick={() => changePlan(3)}
                            onClick={() => openModal(3)}
                          >
                            {/* <i className="fi-rs-shopping-cart mr-5"></i> */}
                            Subscribe
                          </span>
                        )
                      ) : (
                        <span
                          className="button text-center get-membership text-decoration-none btn-sm change-plan-btn"
                          onClick={() => getMembership(3)}
                        >
                          {/* <i className="fi-rs-shopping-cart mr-5"></i> */}
                          Subscribe
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* product */}
          {prd?.selected_batch?.product && (
            <div
              className={`modal-product-card product-cart-wrap 11cart-width w-44 max-w-full relative flex justify-between pt-2 ${idmembership_plan == 2 && " active-package"
                }`}
            >
              <span className="card-badge text-yellow-100 bg-yellow-800 text-xs me-0 px-2.5 py-0.5 11rounded dark:bg-yellow-900 dark:text-yellow-300 w-full h-7 flex items-center justify-center font-bold">
                Product discount
                {/* 20% */}
              </span>
              <Img className="veg-icon" src={vegicon} alt="" />
              <div style={{ marginTop: "1.2rem" }}>
                <ProductImage prd={prd} style={false} />
              </div>
              <div className="product-content-wrap p-2">
                {/* <div className="product-category">
                  <a href="/products" className="text-decoration-none">
                    <i className="fa fa-location"></i> 13 min
                  </a>
                </div> */}
                <h2>
                  <Link
                    to={{
                      pathname: "/product-single",
                      search: prd?.prod_name.replace(/\s+/g, "-"),
                    }}
                    state={{ value: item_id }}
                    className="text-decoration-none"
                  >
                    {prd?.prod_name}
                  </Link>
                </h2>
                {/* <div className="product-rate d-inline-block">
                <div className="product-rating" style={{ width: " 80%" }}></div>
              </div> */}
                <div className="flex items-center justify-between">
                  <div className="product-price ">
                    <span>₹{prd?.product?.toFixed(2)} </span>
                    {/* <span className="old-price">₹ 245.8</span> */}
                  </div>
                  <div className="product-card-bottom">
                    <div
                      className="product-price"
                      style={{
                        fontSize: "20px",
                        color: "#000",
                        fontWeight: "bolder",
                      }}
                    >
                      {/* <i className="fa-regular fa-bookmark"></i> */}
                    </div>
                    <div className="11add-cart add-btn">
                      {token && isTokenExpired == false ? (
                        idmembership_plan == 2 ? (
                          quantity ? (
                            <span
                              className={`button text-decoration-none btn-sm ${quantity > 0 && " active"
                                }`}
                            >
                              <i
                                className="fa-solid fa-minus mr-1"
                                onClick={() => addtocart("minus")}
                              ></i>
                              {quantity}
                              <i
                                className="fa-solid fa-plus ml-1"
                                onClick={() => addtocart("plus")}
                              ></i>
                            </span>
                          ) : (
                            <span
                              className={`button text-decoration-none btn-sm `}
                              onClick={() => addtocart(prd)}
                            >
                              {/* <i className="fi-rs-shopping-cart mr-5"></i> */}
                              Add
                            </span>
                          )
                        ) : (
                          <span
                            className="button text-decoration-none btn-sm change-plan-btn"
                            // onClick={() => changePlan(2)}
                            onClick={() => openModal(2)}
                          >
                            {/* <i className="fi-rs-shopping-cart mr-5"></i> */}
                            Subscribe
                          </span>
                        )
                      ) : (
                        <span
                          className="button text-center get-membership text-decoration-none btn-sm change-plan-btn"
                          onClick={() => getMembership(2)}
                        >
                          {/* <i className="fi-rs-shopping-cart mr-5"></i> */}
                          Subscribe
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>



      <LoginModel open={loginOpen} onCloseModal={onLoginCloseModal} />

      {/* Confirm Modal -Change plan */}
      <AlertModal2
        isOpen={isMemberConfrm}
        onClose={() => setConfrm(false)}
        title={'Subscribe Membership '}
        titleMember={`(${isMemberTitle})`}
        classNameTitle="sm:w-[70%]"
      >
        <div style={{ width: 450, minHeight: 100, maxWidth: "100%" }}>
          <div className="pt-3">
            <p className="text-md">
              Do You really want to subscribe your membership? New membership
              discounts will be applied on next orders,previous orders will be
              same as old membership
            </p>
            <div className="flex items-center justify-end gap-2">
              {isLoading ? (
                <button className="button-upgrade flex items-center justify-center">
                  <BeatLoader size={7} color="rgb(49, 134, 22)" />
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

      {/* membership sucess */}
      <AlertModal2
        isOpen={isMembership}
        onClose={() => setMembership(false)}
        title={"Membership"}
        style={{ paddingTop: 0 }}
      >
        <div
          style={{
            width: 350,

            maxWidth: "100%",
          }}
        >
          <div className="pt-3 11">
            <p className="text-md"><span className="text-green-700 ">{isMemberTitle}</span>{` membership set successfully`}</p>
            {/* <p className="text-md">{msg}</p> */}
            <div className="flex items-center justify-end gap-2">
              <button
                className="button-upgrade flex items-center justify-center"
                // onClick={() => setMembership(false)}
                onClick={OkToCloseDrawer}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </AlertModal2>

      <DrawerBottom
        id="drawer-bottom-membership"
        toggleDrawer={toggleDrawerBottom}
        openBottomDrawer={openBottomDrawer}
        content={
          <ProductMembershipCard
            prd={prd && prd}
            idmembership_plan={idmembership_plan}
            item_id={item_id}
            token={token}
            isTokenExpired={isTokenExpired}
            quantity={quantity}
            addtocart={addtocart}
            openModal={openModal}
            getMembership={getMembership}
            toggleDrawerBottom={toggleDrawerBottom}
            buttonLogin={buttonLogin}
          isCartAdd={isCartAdd}
          />
        }
      />
    </>
  );
};

export default Product;