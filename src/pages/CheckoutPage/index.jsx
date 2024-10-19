import { ConfirmedOrder, Order, Slots } from "Actions/myoder/action";
import { Img } from "components";
import Breadcrumb from "components/Breadcrumb";
import { CartProdct } from "components/Cart/CartProduct";
import { ErrorMessage } from "components/ErrorMessage";
import LandingPageFooter from "components/LandingPageFooter";
import LandingPageHeader from "components/LandingPageHeader";
import { ButtonLoader, Loader } from "components/Loader";
import { AddressModel } from "pages/Profile/AddressModel";
import { useEffect, useState } from "react";
import useRazorpay from "react-razorpay";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "styles/imgs/logo/logo.png";
import CheckoutAccordion from "./CheckoutAccordion/CheckoutAccordion";
import "./CheckoutPage.scss";
import { BiSolidOffer } from "react-icons/bi";
import { FaFileLines } from "react-icons/fa6";
import { MdCardMembership } from "react-icons/md";
import "react-multi-carousel/lib/styles.css";
import fill from "../../styles/imgs/fill.png";

import "../../components/Cart/Cart.scss";

import Other from "../../styles/imgs/logo/Other.svg";
import nonvegicon from "../../styles/imgs/logo/nonvegicon.svg";
import vegicon from "../../styles/imgs/logo/vegicon.svg";

const CheckoutPagePage = (props) => {
  const token2 = props.token;
  const [Razorpay] = useRazorpay();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymmentType, setPaymentType] = useState("");
  const [iddelivery_slots, setIddelivery_slots] = useState("");
  
  const [razPaystatus, setRazPaystatus] = useState({
    status: null,
    value: null,
  });
  const [totalOrderAmount, setTotalOrderAmount] = useState(0);
  const { idcustomer_address } = { ...location.state };
  // console.log(idstore);
  const { addressData } = useSelector((state) => state.AddressReducer);
  // for activate razorpay
  const { order_result, raz_order_id, message, order_loading, order_error } =
    useSelector((state) => state.Order);

  const { cart_result, cart_id, fetch_cart, cart_loading } = useSelector(
    (state) => state.CartReducer
  );
  const total = cart_result?.length
    ? cart_result.reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity,
        0
      )
    : 0;
  const { membership_name, idmembership_plan } = useSelector(
    (state) => state.LoginOtpVerifyReducer?.currentmembership
  );
  const token = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.access_token
  );

  var filterAddress =
    addressData?.data &&
    addressData.data.filter(
      (item) => item["idcustomer_address"] == idcustomer_address
    );

  useEffect(() => {
    if (idcustomer_address) {
      if (order_result?.pay_mode == "cash") {
        navigate("/order-confirmation");
      }
      if (order_result?.txn_id) {
        const options = {
          key: "rzp_test_gZjoHc7y5ZLSlk",
          amount: totalOrderAmount ? parseInt(totalOrderAmount * 100) : 21230, //parseInt(order_amount*100),
          currency: "INR",
          name: "Ghar Ghar Bazar",
          description: "Test Description",
          image: { logo },
          order_id: raz_order_id,
          method: "netbanking",
          handler: function (response) {
            dispatch(
              ConfirmedOrder("api/confirm-payment", token, {
                razorpay_signature: response.razorpay_signature,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
              })
            );
            setRazPaystatus({ status: 1, value: response });
          },
          prefill: {
            name: filterAddress[0]?.name,
            contact: filterAddress[0]?.phone,
          },
          notes: {
            address: filterAddress
              ? filterAddress[0]?.address + filterAddress[0]?.pincode
              : "",
          },
          theme: {
            color: "#3399cc",
          },
        };
        const razorpayInstance = new Razorpay(options);
        razorpayInstance.on("payment.failed", function (response) {
          setRazPaystatus({ status: 0, value: response });
        });
        razorpayInstance.open();
      }
    }
  }, [order_result, totalOrderAmount]);

  useEffect(() => {
    console.log({ message, razPaystatus });
    if (razPaystatus && idcustomer_address) {
      const { value } = { ...razPaystatus };
      if (value != null && message) {
        navigate("/order-confirmation");
      }
    }
  }, [message, razPaystatus]);

  
  const RetrunPR = (membership, mrp, instance, prodcut, land, coparter) => {
    if (membership == 1) {
      let instanceSaving = mrp - instance;
     
      return Math.round(((mrp - instanceSaving) / mrp) * 100);
    }
    if (membership == 2) {
      let prodcutSaving = mrp - prodcut;
      return Math.round(((mrp - prodcutSaving) / mrp) * 100);
    }
    if (membership == 3) {
      let landSaving = mrp - land;
      return Math.round(((mrp - landSaving) / mrp) * 100);
    }
    if (membership == 4) {
      let coparterSaving = mrp - coparter;
      return Math.round(((mrp - coparterSaving) / mrp) * 100);
    }
  };
  const handlePlaceOrder = (amount) => {
    setTotalOrderAmount(amount);
    // if (!idstore) {
    //   alert(
    //     "we can not delivered at this address please select an other address"
    //   );
    //   return false;
    // }
    if (paymmentType && iddelivery_slots) {
      dispatch(
        Order("api/place-order", token, {
          ...location.state,
          pay_mode: paymmentType,
          iddelivery_slots: iddelivery_slots,
        })
      );
    } else {
      console.log("Either Payment Mode or Slot are Not Selected");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Cart start

  const { Dilevery_location } = useSelector((state) => state.DeliveryReducer);
  const { package_data, package_loading, error, package_id } = useSelector(
    (state) => state.PackageReducer
  );

  const [selectDeal, setSelectDeal] = useState(package_id);

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
  const handleApply = (packageId) => {
    setSelectDeal(packageId);
  };
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

  const returnMebershipname = (id) => {
    if (id == 2) {
      return "Product - Wish Basket";
    } else if (id == 3) {
      return "Land - Wish Basket";
    } else if (id == 4) {
      return "Copartner - Wish Basket";
    } else {
      return "Instant Discount";
    }
  };

  const { slots, slots_loading } = useSelector((state) => state.Slots);

  // console.log("slots___", slots && slots.length);

  return (
    <>
      <LandingPageHeader />
      <main className="checkout-page main lg:mx-20">
        <div className="container-fluid">
          <Breadcrumb activepage={"Checkout"} />
        </div>
        <div className="container-fluid mb-6 mt-10">
          {cart_loading ? (
            <Loader />
          ) : (
            <div className="row">
              {order_error?.err && (
                <ErrorMessage errors={["API Error: " + order_error.err]} st />
              )}
              <div className="col-lg-8 11offset-lg-3 accordion-parent">
                <div className="sticky top-[130px]">
                  <CheckoutAccordion
                    setPaymentType={setPaymentType}
                    payment={paymmentType}
                    iddelivery_slots={iddelivery_slots}
                    setIddelivery_slots={setIddelivery_slots}
                  />
                </div>
              </div>
              <div className="col-lg-4 11offset-lg-3">
                <div className="right-side-card border cart-totals 11shadow ">
                  <div className="flex items-start justify-between">
                    {filterAddress && filterAddress[0] ? (
                      <div className="top-head">
                        <h6 className="title-head">Delivery Address</h6>
                        <p className="title-dec">
                          {filterAddress[0].tag +
                            ":" +
                            filterAddress[0].name +
                            "," +
                            filterAddress[0].address +
                            "," +
                            filterAddress[0].landmark +
                            "," +
                            filterAddress[0].pincode}
                        </p>
                      </div>
                    ) : (
                      <AddressModel />
                    )}
                  </div>
                  <div className="divider-2"></div>
                  <ul className="my-cart-heading-sec flex justify-between mb-0">
                    <li>
                      <span className="checkout-cart__title">My Cart</span>
                    </li>
                    <li>{total} Items</li>
                  </ul>
                  <div
                    className="modal-body 1 cart-in-checkout"
                    style={{ background: "rgb(245, 247, 253)" }}
                  >
                    <div
                      className=" flex flex-col gap-4 mb-[15px]"
                      style={{
                        borderRadius: "15px",
                        backgroundColor: "#fff",
                        paddingLeft: 16,
                        paddingTop: 12,
                        paddingRight: 16,
                        paddingBottom: 16,
                      }}
                    >
                      <div
                        className=""
                        style={{
                          display: "flex",
                          gap: "1rem",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ width: 48, height: 48 }}>
                          <Img src={fill} style={{ width: "100%" }} />
                        </div>
                        <div className="">
                          <h6 className="free-del-text">{Dilevery_location}</h6>
                          <p className="ship-text">
                            {"Shipment of " + total + " items"}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 max-h-[300px] overflow-y-scroll pr-2">
                        {fetch_cart &&
                          fetch_cart?.cartItems?.items &&
                          fetch_cart.cartItems.items.map((cart, index) => {
                            return (
                              <CartProdct
                                cart={cart}
                                isChecked={false}
                                key={index}
                                idmembership_plan={idmembership_plan}
                              />
                            );
                          })}
                        {fetch_cart?.tagProds?.map((db, key) => {
                          return (
                            <CartProdct
                              cart={db}
                              isChecked={false}
                              key={key}
                              deal={true}
                              idmembership_plan={idmembership_plan}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Exciting Deals */}
                    {/* {package_data?.data?.[0]?.trigger_prod?.length > 0 ?
                        <Accordion
                          style={{
                            borderRadius: "15px",
                            backgroundColor: "#fff",
                            paddingLeft: 16,
                            paddingTop: 0,
                            paddingRight: 16,
                            paddingBottom: 0,
                          }}
                        >
                          <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                          >
                            <h6 className="free-del-text mb-0">Exciting Deals</h6>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div
                              style={{
                                marginLeft: "0.35rem",
                                marginTop: "-0.75rem",
                              }}
                            >
                              <Carousel {...thumbnailSettings}>
                                {package_data?.data?.map((db, key) => {
                                  return (
                                    <span key={key}>
                                      <div>
                                        <span className="card-badge bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 text-center">
                                          {db?.name}
                                        </span>
                                      </div>
                                      {db?.trigger_prod?.map(
                                        (item, key1) => {
                                          return (
                                            <Product
                                              prd={item}
                                              key={key1}
                                              handleApply={handleApply}
                                              exiting_deal={db?.idpackage}
                                            />
                                          );
                                        }
                                      )}
                                    </span>
                                  );
                                })}
                              </Carousel>
                            </div>
                          </AccordionDetails>
                        </Accordion> :
                        package_data?.data?.[0]?.tagged_prod?.length > 0 &&
                        <Accordion style={{
                          borderRadius: "15px", backgroundColor: "#fff", paddingLeft: 16, paddingTop: 0, paddingRight: 16,
                          paddingBottom: 0,
                        }}>
                          <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                          >
                            <h6 className="free-del-text mb-0">Exciting Deals</h6>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div style={{ marginLeft: "0.35rem", marginTop: "-0.75rem", }}>
                              <Carousel {...thumbnailSettings}>
                                {package_data?.data?.map((db, key) => {
                                  return (
                                    <span key={key}>
                                      <div>
                                        <span
                                          className="card-badge bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 text-center">
                                          {db?.name}
                                        </span>
                                      </div>
                                      {db?.tagged_prod?.map(
                                        (item, key1) => {
                                          return (
                                            <div className="product-cart-wrap 11cart-width relative h-full" key={key1}>
                                              {getIcons(item)}
                                              <ProductImage
                                                prd={item}
                                                style={true}
                                                isHeight={
                                                  item?.selected_batch?.copartner == null &&
                                                  item?.selected_batch?.land == null
                                                }
                                              />
                                              <div className="product-content-wrap p-2">
                                                <div className="product-category">
                                                </div>
                                                <div style={{ height: 40 }}>
                                                  <h2>
                                                    <Link
                                                      to={`/prn/${item?.prod_name.replace(/\s+/g, "-")}/${item?.idproduct_master
                                                        }`}
                                                      className="text-decoration-none"
                                                    >
                                                      {item?.prod_name}
                                                    </Link>
                                                  </h2>
                                                </div>

                                                <div className="flex justify-between items-center">
                                                  <div className="product-price ">
                                                    <span className="block">
                                                      ₹
                                                      {new Intl.NumberFormat("en-US", {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                      }).format(item?.selling_price)}
                                                    </span>

                                                    <span className="old-price block m-0">₹{item?.mrp}</span>
                                                  </div>

                                                  <div className="product-card-bottom mt-0">
                                                    <div
                                                      className="product-price"
                                                      style={{
                                                        fontSize: "20px",
                                                        color: "#000",
                                                        fontWeight: "bolder",
                                                      }}
                                                    >

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
                                                      </div>
                                                      <div className="11add-cart add-btn">
                                                        {
                                                          (package_id != db.idpackage) ? <span
                                                            className="button text-decoration-none btn-sm"
                                                            onClick={() => handleApply(db.idpackage)}
                                                          >
                                                            Apply
                                                          </span> : <span
                                                            className="button text-decoration-none btn-sm">
                                                            Applied
                                                          </span>
                                                        }
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        }
                                      )}
                                    </span>
                                  );
                                })}
                              </Carousel>
                            </div>
                          </AccordionDetails>
                        </Accordion>} */}

                    {/* Exciting Deals */}

                    {/* Bill Details */}
                    <div
                      className="mt-3"
                      style={{
                        borderRadius: "15px",
                        backgroundColor: "#fff",
                        paddingLeft: 16,
                        paddingTop: 12,
                        paddingRight: 16,
                        paddingBottom: 16,
                      }}
                    >
                      <h6
                        className="free-del-text"
                        style={{ paddingBottom: 10 }}
                      >
                        Bill Details
                      </h6>

                      <div className="flex justify-between items-center">
                        <div
                          className="flex item-center gap-1 sub-title"
                          style={{ paddingBottom: 5 }}
                        >
                          <FaFileLines />
                          MRP
                        </div>
                        <span className="sub-title">
                          ₹
                          {fetch_cart?.total &&
                            fetch_cart?.total.total?.toFixed(2)}
                        </span>
                      </div>

                      {/* <div className="flex justify-between items-center">
                                  <div
                                    className="flex item-center gap-1 sub-title"
                                    style={{ paddingBottom: 8 }}
                                  >
                                    Product Discount
                                  </div>
                                  <div className="flex gap-1">
                                    <span
                                      className="sub-title"
                                      style={{ color: "rgb(37 111 239 / 1)" }}
                                    >
                                      ₹
                                      {fetch_cart?.total &&
                                        new Intl.NumberFormat("en-US", {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2,
                                        }).format(fetch_cart?.total.discount)}
                                    </span>
                                  </div>
                                </div> */}

                      <div className="flex justify-between items-center">
                        <div
                          className="flex item-center gap-1 sub-title"
                          style={{ paddingBottom: 8 }}
                        >
                          <BiSolidOffer /> Coupon Discount
                        </div>
                        <div className="flex gap-1">
                          <span
                            className="sub-title"
                            style={{ color: "rgb(37 111 239 / 1)" }}
                          >
                            ₹
                            {fetch_cart?.total &&
                              new Intl.NumberFormat("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(fetch_cart?.total?.cdiscount)}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                            <div
                              className="flex item-center gap-1 sub-title"
                              style={{ paddingBottom: 8 }}
                            >
                              <BiSolidOffer /> Flat Discount
                              <span
                                    style={{
                                      color: "rgb(37 111 239 / 1)",
                                    }}
                                  >
                                    (
                                    {RetrunPR(
                                      1,
                                      fetch_cart?.total?.total,
                                      fetch_cart?.total?.discount,
                                      fetch_cart?.total?.product,
                                      fetch_cart?.total?.land,
                                      fetch_cart?.total?.copartner
                                    )}
                                    %)
                                  </span>
                            </div>
                            <div className="flex gap-1">
                              <span
                                className="sub-title"
                                style={{
                                  color: "rgb(37 111 239 / 1)",
                                }}
                              >
                                ₹{" "}
                                {new Intl.NumberFormat("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(fetch_cart?.total?.discount)}
                              </span>
                            </div>
                          </div>
                      {idmembership_plan != 4 &&
                      idmembership_plan != 3 &&
                      idmembership_plan != 2 ? (
                        <>
                          
                          <div className="flex justify-between items-center">
                            <div
                              className="flex item-center gap-1 sub-title"
                              style={{ paddingBottom: 8 }}
                            >
                              <MdCardMembership /> Membership Name
                            </div>
                            <div className="flex gap-1">
                              <span
                                className="sub-title"
                                style={{
                                  color: "rgb(37 111 239 / 1)",
                                }}
                              >
                                {returnMebershipname(idmembership_plan)}
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between items-center">
                            <div
                              className="flex item-center gap-1 sub-title"
                              style={{ paddingBottom: 8 }}
                            >
                              <BiSolidOffer /> Cashback in Wallet
                              <span
                                    style={{
                                      color: "rgb(37 111 239 / 1)",
                                    }}
                                  >

                                    {
                                      RetrunPR(
                                        idmembership_plan,
                                        fetch_cart?.total?.total,
                                        fetch_cart?.total?.discount,
                                        fetch_cart?.total?.product,
                                        fetch_cart?.total?.land,
                                        fetch_cart?.total?.copartner
                                      )!==0&&(<>(
                                        {RetrunPR(
                                          idmembership_plan,
                                          fetch_cart?.total?.total,
                                          fetch_cart?.total?.discount,
                                          fetch_cart?.total?.product,
                                          fetch_cart?.total?.land,
                                          fetch_cart?.total?.copartner
                                        )}
                                        %)</>)
                                    }
                                  </span>
                            </div>
                            <div className="flex gap-1">
                              {/* <span
                                          className="sub-title"
                                          style={{
                                            color: "rgb(37 111 239 / 1)",
                                          }}
                                        >
                                          ₹
                                          {fetch_cart?.total &&
                                            new Intl.NumberFormat("en-US", {
                                              minimumFractionDigits: 2,
                                              maximumFractionDigits: 2,
                                            }).format(
                                              fetch_cart?.total.discount
                                            )}
                                        </span> */}

                              {idmembership_plan == 2 && (
                                <span
                                  className="sub-title"
                                  style={{
                                    color: "rgb(37 111 239 / 1)",
                                  }}
                                >
                                  ₹{" "}
                                  {new Intl.NumberFormat("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(fetch_cart?.total?.product)}
                                </span>
                              )}
                              {idmembership_plan == 3 && (
                                <span
                                  className="sub-title"
                                  style={{
                                    color: "rgb(37 111 239 / 1)",
                                  }}
                                >
                                  ₹{" "}
                                  {new Intl.NumberFormat("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(fetch_cart?.total?.land)}
                                </span>
                              )}
                              {idmembership_plan == 4 && (
                                <span
                                  className="sub-title"
                                  style={{
                                    color: "rgb(37 111 239 / 1)",
                                  }}
                                >
                                  ₹{" "}
                                  {new Intl.NumberFormat("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(fetch_cart?.total?.copartner)}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div
                              className="flex item-center gap-1 sub-title"
                              style={{ paddingBottom: 8 }}
                            >
                              <MdCardMembership /> Membership Name
                            </div>
                            <div className="flex gap-1">
                              <span
                                className="sub-title"
                                style={{
                                  color: "rgb(37 111 239 / 1)",
                                }}
                              >
                                {returnMebershipname(idmembership_plan)}
                              </span>
                            </div>
                          </div>
                        </>
                      )}

                      <div className="flex justify-between">
                        <h6 className="free-del-text2">Grands Total</h6>
                        <h6 className="free-del-text2">
                          {idmembership_plan && idmembership_plan == 1 ? (
                            <>
                              ₹{" "}
                              {total &&
                                fetch_cart?.total &&
                                new Intl.NumberFormat("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(fetch_cart?.total?.grand)}
                            </>
                          ) : (
                            <>
                              ₹{" "}
                              {total &&
                                fetch_cart?.total &&
                                new Intl.NumberFormat("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(fetch_cart?.total?.grand)}
                            </>
                          )}
                        </h6>
                      </div>

                      {idmembership_plan && idmembership_plan >= 2 && (
                        <div className="flex justify-between items-center">
                          <div
                            className="flex item-center gap-1 sub-title"
                            style={{
                              paddingBottom: 0,
                              color: "#0c831f",
                            }}
                          >
                            Membership Discount Will be Credited in Wallet
                          </div>
                        </div>
                      )}
                      {idmembership_plan && idmembership_plan === 1 && (
                        <div className="flex justify-between items-center">
                          <div
                            className="flex item-center gap-1 sub-title"
                            style={{
                              paddingBottom: 0,
                              color: "#0c831f",
                            }}
                          >
                            Flat Discount will be provided
                          </div>
                        </div>
                      )}
                      {idmembership_plan && idmembership_plan >= 2 && (
                        <div className="flex justify-between items-center cart-saving-root">
                          <div className="flex flex-col">
                            <span className="cart-saving-title">
                              Your membership savings
                            </span>
                            <span className="cart-saving-sub-title">
                              {returnMebershipname(idmembership_plan)} discount
                              applied
                            </span>
                          </div>
                          <div className="cart-saving-title">
                            {idmembership_plan == 1 && (
                              <span className="cart-saving-title">
                                ₹{" "}
                                {new Intl.NumberFormat("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(fetch_cart?.total?.discount)}
                              </span>
                            )}
                            {idmembership_plan == 2 && (
                              <span className="cart-saving-title">
                                ₹{" "}
                                {new Intl.NumberFormat("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(fetch_cart?.total?.product+fetch_cart?.total?.discount)}
                              </span>
                            )}
                            {idmembership_plan == 3 && (
                              <span className="cart-saving-title">
                                ₹{" "}
                                {new Intl.NumberFormat("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(fetch_cart?.total?.land+fetch_cart?.total?.discount)}
                              </span>
                            )}
                            {idmembership_plan == 4 && (
                              <span className="cart-saving-title">
                                ₹{" "}
                                {new Intl.NumberFormat("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(fetch_cart?.total?.copartner+fetch_cart?.total?.discount)}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* New Design end */}
                </div>

                <div className="payment ">
                  {/* <h4 className="mb-30" style={{ fontSize: "24px", fontWeight: '700' }}>Payment</h4>
                  <div className="payment-logo d-flex">
                    <Img className="mr-10" src={paymentPaypal} alt="" />
                    <Img className="mr-10" src={paymentVisa} alt="" />
                    <Img className="mr-10" src={paymentMaster} alt="" />
                    <Img src={paymentZapper} alt="" />
                  </div> */}
                  {slots && slots.length == 0 ? (
                    <div className="mt-3  text-red-500 text-sm font-medium bg-clip-content py-2 px-3 border-2 border-green-500 border-dashed">
                      We apologize, but due to high demand, all delivery slots
                      are currently unavailable. Please check back later for
                      updates
                    </div>
                  ) : slots && slots.length > 0 && iddelivery_slots == '' ? (
                    <div className="mt-3  text-red-500 text-sm font-medium bg-clip-content py-2 px-3 border-2 border-green-500 border-dashed">
                      Please Select Delivery Slot.
                    </div>
                  ) : paymmentType.length === 0 ? (
                    <div className="mt-3  text-red-500 text-sm font-medium bg-clip-content py-2 px-3 border-2 border-green-500 border-dashed">
                      Please Select Payment Type.
                    </div>
                  ) :
                  
                  order_loading ? (
                    <button
                      className="pay-now-btn btn btn-fill-out btn-block mt-2 "
                      disabled={true}
                    >
                      <ButtonLoader color={"black"} size={8} />
                      {/* <i className="fi-rs-sign-out ml-10"></i> */}
                    </button>
                  ) : paymmentType == "cash" ? (
                    <button
                      className="pay-now-btn btn btn-fill-out btn-block mt-2 "
                      style={{ background: "green" }}
                      onClick={() => handlePlaceOrder(fetch_cart?.total)}
                      disabled={!paymmentType || !iddelivery_slots}
                    >
                      Confirm Order
                    </button>
                  ) : (
                    <button
                      className="pay-now-btn btn btn-fill-out btn-block mt-2 "
                      style={{ background: "green" }}
                      onClick={() => handlePlaceOrder(fetch_cart?.total)}
                      disabled={!paymmentType || !iddelivery_slots}
                    >
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <LandingPageFooter />
    </>
  );
};

export default CheckoutPagePage;
