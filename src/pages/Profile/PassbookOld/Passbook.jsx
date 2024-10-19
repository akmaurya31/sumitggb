import { Link, useLocation } from "react-router-dom";
import CardTitle from "../CardTitle";
import "./Passbook.scss";
import { FaWallet } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MyOrderGet } from "Actions/myoder/action";
import AlertModal2 from "components/Alert/alert2";
import { updateMembershipPost } from "Actions/loginotp/action";
import { BeatLoader } from "react-spinners";
import AlertModal from "components/Alert";
import { Loader } from "components/Loader";
import { fetchPassbookData } from "Actions/passbook/action";
import moment from "moment";
import { NoDataFound } from "components/Cards";
import { FormatDateTime, TimeIn12HourFormat } from "components/DateTimeFormate";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const Passbook = ({ currentmembership }) => {
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [isMemberConfrm, setConfrm] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [alertmembership, setAlertmembership] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const [memberData, setMemberData] = useState();
  const token = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.access_token
  );
  const token_date = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.expires_at
  );

  const { passbook, passbook_loading } = useSelector(
    (state) => state?.PassbookReducer
  );
  const msg = useSelector((state) => state.LoginOtpVerifyReducer?.msg);
  useEffect(() => {
    if (token === undefined && token_date === undefined) {
      setIsTokenExpired(true);
    } else {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      setIsTokenExpired(token_date < currentTimestamp);
      dispatch(fetchPassbookData(token));
    }
  }, [isTokenExpired, token, token_date, location]);
  const checkSaveValue = (id, order, instant, product, land, copartner) => {
    if (id == 2) {
      return product;
    } else if (id == 3) {
      return land;
    } else if (id == 4) {
      return copartner;
    } else {
      if (id == 1) {
        return instant;
      } else {
        return 0;
      }
    }
  };
  const returnTransectionValue = (
    id,

    instant,
    product,
    land,
    copartner
  ) => {
    // console.log("id", id, "order", product, copartner, land);
    if (id == 2) {
      return {
        title: "Product Wish Basket Cashback Credit in your Wallet",
        price: product,
      };
    } else if (id == 3) {
      return {
        title: "Land Wish Basket Cashback Credit in your Wallet",
        price: land,
      };
    } else if (id == 4) {
      return {
        title: "Co-Partner Wish Basket Cashback Credit in your Wallet",
        price: copartner,
      };
    }
  };
  const pageSize = 5; // Number of orders per page
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastOrder = currentPage * pageSize;
  const indexOfFirstOrder = indexOfLastOrder - pageSize;
  const reversedOrderData = passbook?.data?.data?.slice()?.reverse();
  const currentOrders = reversedOrderData?.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  // console.log("reversedOrderData",reversedOrderData)
  // ============================

  // ============================

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openModal = (data) => {
    setConfrm(true);
    setMemberData(data);
  };
  const onMembershipClick = async () => {
    await setLoading(true);
    await setAlertmembership(false);
    if (memberData) {
      if (token === undefined && token_date === undefined) {
        setIsTokenExpired(true);
      } else {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        setIsTokenExpired(token_date < currentTimestamp);
        await dispatch(
          updateMembershipPost(token, "api/change-membership", memberData)
        );

        await setLoading(false);
        await setConfrm(false);
        await setAlertmembership(true);
        await dispatch(fetchPassbookData(token));
      }
    } else {
      alert("try after sometime");
    }
  };

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        scroll: "smooth",
      });
    };

    scrollToTop();

    return () => { };
  }, [passbook_loading]);

  const { order_result, order_loading } = useSelector(
    (state) => state?.MyOrderListReducer
  );

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let totalPriceSum = 0;
    order_result?.data?.forEach((item) => {
      totalPriceSum += item.total_price;
    });
    setTotalPrice(totalPriceSum);
  }, [order_result?.data]);


  return (
    <div className="card passbookpage">
      {passbook_loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <CardTitle title="Lifetime Membership Savings" />
          <div className="card-body">
            <div className=" grid grid-cols-12 gap-3 sm:relative sm:top-0  sticky top-[127px] pt-1 pb-2 bg-white-A700 shadow-sm z-10">
              <div className="sm:col-span-12 col-span-3 flex items-end">
                <div className="sm:grid-cols-2 sm:w-full flex gap-2 w-full">
                  <div className="wallte-div flex flex-col gap-2 items-center justify-start mb-0 w-full    bg-clip-border p-6 bg-violet-600 border-1 border-violet-300 border-dashed">
                    <span className="text-[#318616] font-semibold text-xs mb-1">
                      Wallet Amount
                    </span>
                    <div className=" flex flex-col items-center mb-0">
                      <FaWallet style={{ fontSize: 25 }} />
                      {/* &nbsp; */}
                      <span className="text-sm" style={{ marginTop: "2px" }}>
                        ₹{passbook && Math.round(passbook?.data?.total_amount?.toFixed(2))}
                      </span>
                    </div>
                  </div>
                  <div className="wallte-div flex flex-col gap-2 items-center justify-start mb-0 w-full    bg-clip-border p-6 bg-violet-600 border-1 border-violet-300 border-dashed">
                    <span className="text-[#318616] font-semibold text-xs mb-1">
                      Total Purchas
                    </span>
                    <div className=" flex flex-col items-center mb-0">
                      <AddShoppingCartIcon style={{ fontSize: 25 }} />
                      {/* &nbsp; */}
                      <span className="text-sm" style={{ marginTop: "2px" }}>
                        ₹{totalPrice && Math.round(totalPrice.toFixed(2))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-12 col-span-9">
                <div className=" grid grid-cols-12 total_membership sm:mb-0 ">
                  <div className="item-discount sm:col-span-6 col-span-3 gap-[8px] sm:mb-2 flex flex-col justify-between">
                    <h5
                      className="sm:mx-"
                      style={{
                        fontWeight: "bold",
                        color:
                          passbook?.data?.memebership_id == 1
                            ? "rgb(12, 131, 31)"
                            : "black",
                      }}
                    >
                      Instant Discount
                    </h5>
                    <div
                      className={
                        passbook?.data?.memebership_id == 1
                          ? "box active"
                          : "box"
                      }
                    >
                      <h6 className="text-sm font-semibold mb-2">
                        ₹
                        {passbook && Math.round(passbook?.data?.data
                          ?.reduce((sum, order) => sum + order.instant_dis, 0)
                          .toFixed(2))}
                      </h6>
                      <div className="text-xs my-2">Already Used</div>

                      {/* {passbook?.data?.memebership_id == 1 ? (
                        <button
                          className="box active mt-2"
                          style={{
                            paddingTop: 5,
                            paddingBottom: 5,
                            fontSize: 12,
                            background: "#0C831F",
                            color: "white",
                          }}
                        >
                          Active
                        </button>
                      ) : (
                        <button
                          className="box active mt-2"
                          style={{
                            paddingTop: 5,
                            paddingBottom: 5,
                            fontSize: 12,
                          }}
                          onClick={() =>
                            openModal({
                              idmembership_plan: 1,
                              membership_name: "Instant wish Basket Discount",
                            })
                          }
                        >
                          Subscribe
                        </button>
                      )} */}
                    </div>
                  </div>
                  <div className="item-discount sm:col-span-6 col-span-3 gap-[8px] sm:mb-2 flex flex-col justify-between">
                    <h5
                      className="sm:mx-"
                      style={{
                        fontWeight: "bold",
                        color:
                          passbook?.data?.memebership_id == 2
                            ? "rgb(12, 131, 31)"
                            : "black",
                      }}
                    >
                      Product Cashback
                    </h5>
                    <div
                      className={
                        passbook?.data?.memebership_id == 2
                          ? "box active"
                          : "box"
                      }
                    >

                      <h6 className="text-sm font-semibold mb-0">
                        ₹
                        {passbook && Math.round(passbook?.data?.data
                          ?.reduce((sum, order) => sum + order.product_dis, 0)
                          .toFixed(2))}
                      </h6>

                      {passbook?.data?.memebership_id == 2 ? (
                        <button
                          className="box active mt-2"
                          style={{
                            paddingTop: 5,
                            paddingBottom: 5,
                            fontSize: 12,
                            background: "#0C831F",
                            color: "white",
                          }}
                        >
                          Active
                        </button>
                      ) : (
                        <button
                          className="box active mt-2"
                          style={{
                            paddingTop: 5,
                            paddingBottom: 5,
                            fontSize: 12,
                          }}
                          onClick={() =>
                            openModal({
                              idmembership_plan: 2,
                              membership_name: "Product wish Basket Discount",
                            })
                          }
                        >
                          Subscribe
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="item-discount sm:col-span-6 col-span-3 gap-[8px] sm:mb-2 flex flex-col justify-between">
                    <h5
                      className="sm:mx-4 mx-[7px]"
                      style={{
                        fontWeight: "bold",
                        color:
                          passbook?.data?.memebership_id == 3
                            ? "rgb(12, 131, 31)"
                            : "black",
                      }}
                    >
                      Land Cashback
                    </h5>
                    <div
                      className={
                        passbook?.data?.memebership_id == 3
                          ? "box active"
                          : "box"
                      }
                    >

                      <h6 className="text-sm font-semibold mb-0">
                        ₹
                        {passbook && Math.round(passbook?.data?.data
                          ?.reduce((sum, order) => sum + order.land_dis, 0)
                          .toFixed(2))}
                      </h6>

                      {passbook?.data?.memebership_id == 3 ? (
                        <button
                          className="box active mt-2"
                          style={{
                            paddingTop: 5,
                            paddingBottom: 5,
                            fontSize: 12,
                            background: "#0C831F",
                            color: "white",
                          }}
                        >
                          Active
                        </button>
                      ) : (
                        <button
                          className="box active mt-2"
                          style={{
                            paddingTop: 5,
                            paddingBottom: 5,
                            fontSize: 12,
                          }}
                          onClick={() =>
                            openModal({
                              idmembership_plan: 3,
                              membership_name: "Land wish Basket Discount",
                            })
                          }
                        >
                          Subscribe
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="item-discount sm:col-span-6 col-span-3 gap-[8px] sm:mb-2 flex flex-col justify-between">
                    <h5
                      className="sm:mx-"
                      style={{
                        fontWeight: "bold",
                        color:
                          passbook?.data?.memebership_id == 4
                            ? "rgb(12, 131, 31)"
                            : "black",
                      }}
                    >
                      Co-Partner Cashback
                    </h5>
                    <div
                      className={
                        passbook?.data?.memebership_id == 4
                          ? "box active"
                          : "box"
                      }
                    >

                      <h6 className="text-sm font-semibold mb-0">
                        ₹
                        {passbook && Math.round(passbook?.data?.data
                          ?.reduce((sum, order) => sum + order.copartner_dis, 0)
                          .toFixed(2))}
                      </h6>

                      <div>
                        {passbook?.data?.memebership_id == 4 ? (
                          <button
                            className="box active mt-2"
                            style={{
                              paddingTop: 5,
                              paddingBottom: 5,
                              fontSize: 12,
                              background: "#0C831F",
                              color: "white",
                            }}
                          >
                            Active
                          </button>
                        ) : (
                          <button
                            className="box active mt-2"
                            style={{
                              paddingTop: 5,
                              paddingBottom: 5,
                              fontSize: 12,
                            }}
                            onClick={() =>
                              openModal({
                                idmembership_plan: 4,
                                membership_name:
                                  "Co-Partner Wish Basket Discount",
                              })
                            }
                          >
                            Subscribe
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <br />
            {/* order history */}
            <div className="11border-t-[1px] border-b-[1px] border-solid border-[#0000002d]  pb-6 my-2">
              {console.log("order_result?.data", order_result?.data)}

              <CardTitle
                title={`My Orders ${order_result && order_result?.data?.length > 0
                    ? "(" + order_result?.data?.length + ")"
                    : ""
                  }`}
              />

              {order_result && order_result?.data?.length == 0 ? (
                <NoDataFound title="No Order Available" />
              ) : (
                <>
                  <div className="tableview-parent mb-6">
                    <div className="order-detail">
                      <div className="order-cards grid grid-cols-12 gap-1 px-3 py-2">
                        {/* Head  */}
                        {[
                          { title: "Order Id", col: 2 },
                          { title: "Order Date", col: 2 },
                          { title: "Order Amount", col: 2 },
                          { title: "Instant", col: 1 },
                          { title: "Product", col: 1 },
                          { title: "Land", col: 1 },
                          { title: "Co-Partner", col: 1 },
                          { title: "You Paid", col: 1 },
                          { title: "Saved", col: 1 },
                        ].map((db) => (
                          <div className={`head-style col-span-${db.col}`}>
                            <h6>{db.title}</h6>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="order-detail" style={{ maxHeight: 240 }}>
                      {currentOrders?.map((or, index) => {
                        // console.log("or ==== ",or)
                        return (
                          <div
                            className="order-card grid grid-cols-12 gap-1 mb-2 mx-[1px]"
                            style={{
                              border:
                                index % 2 == 0 ? "1px solid #0c831f" : "unset",
                              boxShadow: index % 2 == 0 && "unset",
                            }}
                          >
                            <div className="col-span-2">
                              <Link
                                to={`/order-detail/${or?.idcustomer_order}`}
                              >
                                GGB000{or?.idcustomer_order}
                              </Link>
                            </div>
                            {/* Order Date time */}
                            <div className="col-span-2">
                              <span>
                                {" "}
                                {FormatDateTime({ text: or?.created_at })}
                              </span>
                            </div>
                            {/* Order Amount */}
                            <div className="col-span-2">
                              {or?.total_price.toFixed(2)}
                            </div>
                            {/* Instant */}
                            <div
                              className={
                                passbook?.data?.memebership_id == 1
                                  ? "active col-span-1"
                                  : "col-span-1"
                              }
                            >
                              {or?.instant_dis == null
                                ? 0
                                : or?.instant_dis.toFixed(2)}
                            </div>
                            {/* Product */}
                            <div
                              className={
                                passbook?.data?.memebership_id == 2
                                  ? "active col-span-1"
                                  : "col-span-1"
                              }
                            >
                              {or?.product_dis == null
                                ? 0
                                : or?.product_dis.toFixed(2)}
                            </div>
                            {/* Land */}
                            <div
                              className={
                                passbook?.data?.memebership_id == 3
                                  ? "active col-span-1"
                                  : "col-span-1"
                              }
                            >
                              {or?.land_dis == null
                                ? 0
                                : or?.land_dis.toFixed(2)}
                            </div>
                            {/* CoPartner */}
                            <div
                              className={
                                passbook?.data?.memebership_id == 4
                                  ? "active col-span-1"
                                  : " col-span-1"
                              }
                            >
                              {or?.copartner_dis == null
                                ? 0
                                : or?.copartner_dis.toFixed(2)}
                            </div>
                            <div className="col-span-1">
                              {or?.total_price.toFixed(2)}
                            </div>
                            <div>
                              {checkSaveValue(
                                passbook?.data?.memebership_id,
                                or?.total_price,
                                or?.instant_dis,
                                or?.product_dis,
                                or?.land_dis,
                                or?.copartner_dis
                              ).toFixed(2)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pagination */}
                  <ul className="pagination flex justify-center">
                    {Array.from({
                      length: Math.ceil(
                        passbook?.data?.data?.length / pageSize
                      ),
                    }).map((_, index) => (
                      <li
                        key={index}
                        className={`page-item ${index + 1 === currentPage ? "active" : ""
                          }`}
                      >
                        <button
                          onClick={() => paginate(index + 1)}
                          className="page-link"
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <br />
            {/* Passbook Transaction */}

            <div className="">
              <CardTitle title="Wallet History" />

              <div className="transection-history tableview-parent mb-6">
                <div
                  className="order-detail flex flex-col gap-2 pl- pr-2"
                  style={{ maxHeight: 240 }}
                >
                  {reversedOrderData?.length == 0 ? (
                    <NoDataFound title="Wallet History Not Found" />
                  ) : (
                    <>
                      {reversedOrderData?.map((or, index) => {
                        // console.log("or", or)

                        return (
                          <>
                            {or?.membership_id !== 1 && (
                              <div className="offer-cuppon">
                                <div className="offer-items">
                                  <div>
                                    <h6 className="title">
                                      {
                                        returnTransectionValue(
                                          or?.membership_id,
                                          or?.instant_dis,
                                          or?.product_dis,
                                          or?.land_dis,
                                          or?.copartner_dis
                                        )?.title
                                      }
                                    </h6>
                                    <div className="flex sm:flex-col sm:items-start items-center gap-2 order-no">
                                      <span>
                                        Order No :{" "}
                                        <Link
                                          to={`/order-detail/${or?.idcustomer_order}`}
                                        >
                                          GGB000{or?.idcustomer_order}
                                        </Link>
                                      </span>
                                      {/* <span>
                                    Order Date :{" "}
                                    {moment(or?.created_at).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </span> */}
                                      {/* {console.log("or?.created_at",or?.created_at)} */}
                                      <span>
                                        Order Date :{" "}
                                        {FormatDateTime({
                                          text: or?.created_at,
                                        })}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="btn-offer-wrp flex-wrap justify-end">
                                    <div className="amount">
                                      + ₹
                                      {returnTransectionValue(
                                        or?.membership_id,
                                        or?.instant_dis,
                                        or?.product_dis,
                                        or?.land_dis,
                                        or?.copartner_dis
                                      )?.price?.toFixed(2)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <AlertModal2
        isOpen={isMemberConfrm}
        onClose={() => setConfrm(false)}
        title={"Subscribe Membership"}
      >
        <div style={{ width: 450, minHeight: 100 }}>
          <div className="pt-3">
            <p className="text-md">
              Do You really want to subscribe your membership? New membership
              discounts will be applied on next orders,previous orders will be
              same as old membership
            </p>
            <div className="flex items-center justify-end gap-2">
              {/* <button className="button-normal">Cancel</button> */}
              {isLoading ? (
                <button className="button-upgrade flex items-center justify-center">
                  <BeatLoader size={7} color="rgb(49, 134, 22)" />
                </button>
              ) : (
                <button
                  className="button-upgrade flex items-center justify-center"
                  onClick={onMembershipClick}
                >
                  Subscribe
                </button>
              )}
            </div>
          </div>
        </div>
      </AlertModal2>
      {alertmembership ? (
        <>
          <AlertModal
            is_show={alertmembership}
            data={currentmembership}
            Msg={msg}
          />
        </>
      ) : null}
    </div>
  );
};

export default Passbook;
