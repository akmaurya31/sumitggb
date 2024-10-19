import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { IconButton } from "@mui/material";
import axios from "axios";
import { Img } from "components";
// import AlertModal2 from "components/Alert/alert2";
import LandingPageHeader from "components/LandingPageHeader";
import { Loader } from "components/Loader";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import "./Order.scss";
import AlertModal2 from "components/Alert/alert2";
import Breadcrumb from "components/Breadcrumb";
import { FormatDateTime } from "components/DateTimeFormate";

const OrderDetail = () => {
  const { order_id } = useParams();
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [modalObject, setModalObject] = useState([]);
  const [order_detail, setOrderDetail] = useState([]);
  const [customerAddress, setCustomerAddress] = useState([]);
  const [order_loading, setOrderLoading] = useState(false);
  const [storeAddress, setStoreAddress] = useState();
  const [quantityValues, setQuantityValues] = useState({});
  const [yousave, setYouSave] = useState({});


  const useParams1 = useParams();
  const location = useLocation();
  var value = location.state ? location.state.value : null;
  var coupon_discount = location?.state?.coupon_discount;

 

  // const [warehouseData] = useState(
  //   useSelector((state) => state?.WarehouseReducer)
  // );

  const token = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.access_token
  );
  const token_date = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.expires_at
  );
  const { warehouseData } = useSelector((state) => state?.WarehouseReducer);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [isLoading, setLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [totalSaving, setTotalSaving] = useState(0);

  const navigation = useNavigate();
  const modalClose = () => {
    setTimeout(() => {
      setOpen(false);
      navigation("/profile/orders");
    }, 800);
  };
  const SingleOrderGet = async (endpoint, token, id) => {
    setOrderLoading(true);
    try {
      const config = {
        headers: {},
      };

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await axios.get(`${BASE_URL}/${endpoint}/${id}`, config);

      setModalObject(response?.data?.data);

      let totals = {
        save: 0,
        gst: 0,
        total_price: 0,
        mrp: 0,
      };
      
      totals = response?.data?.data.reduce(
        (accumulator, item) => {
          accumulator.mrp +=item.unit_mrp*item.quantity || 0;
          accumulator.save += item.discount || 0; // Save total
          accumulator.gst += (item.total_cgst || 0) + (item.total_sgst || 0); // GST total
          accumulator.total_price += item.total_price || 0; // Total price
          return accumulator; // Accumulator ko return karna zaroori hai
        },
        { save: 0, gst: 0, total_price: 0,mrp:0 } // Initial value as object
      );

      setYouSave(totals);



      // console.log("dfsfs",response)
      setOrderLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const SingleOrderDetailGet = async (endpoint, token, id) => {
    try {
      const config = {
        headers: {},
      };

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await axios.get(`${BASE_URL}/${endpoint}/${id}`, config);
      setCustomerAddress(response?.data?.customerAddress)
      setOrderDetail(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
    // navigation("/profile/orders");
  };
  useEffect(() => {
    if (token === undefined && token_date === undefined) {
      setIsTokenExpired(true);
    } else {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      setIsTokenExpired(token_date < currentTimestamp);
      {
        SingleOrderGet("api/get-order-dtl", token, order_id);
        // SingleOrderDetailGet("api/get-order-detail", token, order_id);
      }
    }
  }, [isTokenExpired, order_id]);

  const getStoreAddress = async (id) => {
    if (id !== undefined) {
      const storeAddress = await warehouseData?.data?.find(
        (fl) => fl.idstore_warehouse === id
      );
      setStoreAddress(storeAddress);
    }
  };
  useMemo(() => {
    getStoreAddress(order_detail?.idstore_warehouse);
  }, [order_detail?.idstore_warehouse]);
  console.log("storeAddress", storeAddress);
  const returnMebershipValue = (id, prod, land, copartner, instant) => {
    if (id == 2) {
      return prod?.toFixed(2);
    } else if (id == 3) {
      return land?.toFixed(2);
    } else if (id == 4) {
      return copartner?.toFixed(2);
    } else {
      return instant?.toFixed(2);
    }
  };
  const returnMebershipname = (id) => {
    if (id == 2) {
      return "Wish Basket - Product";
    } else if (id == 3) {
      return "Wish Basket - land";
    } else if (id == 4) {
      return "Wish Basket - copartner";
    } else {
      return "instant discount";
    }
  };
  const returnMebershipSave = (id, order, prod, land, copartner, instant) => {
    if (id == 2) {
      return order - prod;
    } else if (id == 3) {
      return order - land;
    } else if (id == 4) {
      return order - copartner;
    } else {
      return order - instant;
    }
  };

 

  const [selectedQuantities, setSelectedQuantities] = useState(
    Array(modalObject?.length).fill(null)
  );
  const [checkedItems, setCheckedItems] = useState(
    Array(modalObject?.length).fill(false)
  );
  const [selectAll, setSelectAll] = useState(false);
 
  const isWithinReturnDuration = (createdDate, returnDuration) => {
    const today = moment();
    const diffInDays = today.diff(moment(createdDate), "days");
    // console.log("diffInDays", diffInDays);
    return diffInDays < returnDuration;
  };

  useEffect(() => {
    if (order_detail?.idmembership_plan == 1) {
      setTotalSaving(order_detail?.total_discount);
    } else if (order_detail?.idmembership_plan == 2) {
      setTotalSaving(order_detail?.product_discount);
    } else if (order_detail?.idmembership_plan == 3) {
      setTotalSaving(order_detail?.land_discount);
    } else if (order_detail?.idmembership_plan == 4) {
      setTotalSaving(order_detail?.copartner_discount);
    } else {
      setTotalSaving(0);
    }
  }, [order_detail]);

  const returnMebershipPR = (id, order, prod, land, copartner, instant) => {
    if (id == 2) {
      return Math.round(((order - prod) / order) * 100);
    } else if (id == 3) {
      return Math.round(((order - land) / order) * 100);
    } else if (id == 4) {
      return Math.round(((order - copartner) / order) * 100);
    } else {
      return Math.round(((order - instant) / order) * 100);
    }
  };
  const returnTotalPr = (total, saving) => {
    const savePrice = total - saving;
    return Math.round(((total - savePrice) / total) * 100);
  };

  const isAllSelectVisible = () => {
    const isFilter = modalObject?.filter(
      (tp) =>
        tp?.has_return_rule === "Y" &&
        isWithinReturnDuration(tp?.created_at, tp?.return_duration) &&
        tp?.status === 1
    );
    if (isFilter?.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleQuantityChange = (index, quantity) => {
    if (quantity <= 0 || quantity > modalObject[index]?.quantity) {
      return; // Prevent negative, zero, or exceeding original quantity
    }
    setQuantityValues((prevValues) => ({
      ...prevValues,
      [index]: quantity,
    }));
  };
   
  // Function to render quantity-based text box
  const renderQuantityTextBox = (index, quantity) => {
    const initialValue =
      quantityValues[index] !== undefined
        ? quantityValues[index]
        : checkedItems[index]
        ? modalObject[index]?.quantity || 1
        : "";
    if (checkedItems[index]) {
      return (
        <input
          type="number"
          value={initialValue}
          onChange={(e) =>
            handleQuantityChange(index, parseInt(e.target.value))
          }
          min="1"
          max={modalObject[index]?.quantity || ""}
          style={{ width: 90, height: 23 }}
        />
      );
    }
    return null;
  };

  return (
    <>
      <LandingPageHeader />

      <main className="main pages order-detail">
        <div className="container-fluid">
          <Breadcrumb sublink={""} activepage={"Order Detail"} />
        </div>
        {order_loading ? (
          <Loader />
        ) : (
          <div className="container-fluid">
            <div
              className="page-content sm:pb-14"
              style={{
                minHeight: 200,
                maxWidth: 1050,
                margin: "0px auto",
              }}
            >
              <Link className="sm:hidden" to="/profile/orders">
                <IconButton>
                  <FaLongArrowAltLeft style={{ color: "black" }} />
                </IconButton>
              </Link>
              <div
                className="sm:p-[8px] p-[20px] pt-[10px] mb-9"
                style={{
                  // padding: 20,
                  // paddingTop: 10,
                  boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="pb-3">
                  <div className="flex justify-start  items-start flex-col border-bottom-1">
                    <div className="flex justify-between w-full sm:pb-[0] pt-2 pb-3">
                      <span className="rigth-text-modal sm:text-xs text-sm font-medium">
                        <b>
                          Order Id :  
                          GGB000{modalObject && modalObject[0]?.idcustomer_order}
                        </b>
                      </span>
                      <span className="rigth-text-modal sm:text-xs text-sm font-medium">
                        <b>
                          Order Date : {FormatDateTime({text:value})}
                          {/* {moment(
                            modalObject && modalObject[0]?.created_at
                          ).format("DD/MM/YYYY")} */}
                        </b>
                      </span>
                    </div>
                    <div className="flex justify-start  items-start flex-col border-bottom-1 w-full">
                      {/* <div className="order-title">Address</div> */}
                      <div className="w-full">
                        {order_detail?.name && (
                          <div className="flex justify-between w-full mt-1 hover:bg-gray-100">
                            <span className="left-text-modal">Name</span>
                            <span className="rigth-text-modal">
                              {order_detail?.name}
                            </span>
                          </div>
                        )}
                        {order_detail?.email && (
                          <div className="flex justify-between w-full mt-1 hover:bg-gray-100">
                            <span className="left-text-modal">Email</span>
                            <span className="rigth-text-modal">
                              {order_detail?.email}
                            </span>
                          </div>
                        )}
                        {order_detail?.contact && (
                          <div className="flex justify-between w-full mt-1 hover:bg-gray-100">
                            <span className="left-text-modal">Contact No</span>
                            <span className="rigth-text-modal">
                              {order_detail?.contact}
                            </span>
                          </div>
                        )}
                        {order_detail?.address && (
                          <div className="flex justify-between w-full mt-1 hover:bg-gray-100">
                            <span className="left-text-modal">Address</span>
                            <span className="rigth-text-modal">
                              {order_detail?.address}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* For Gird  */}
                    <div className="sm:overflow-y-auto md:overflow-y-auto max-w-full w-full">
                      <div className="min-w-[730px]">
                        {/* New Detail In Table  */}
                        <table className="mb-0 product-detail-table w-full">
                          <thead>
                            <tr>
                              <th className="text-center">
                                {isAllSelectVisible() ? (
                                  <>
                                  </>
                                ) : (
                                  <input
                                    className="opacity-0 cursor-not-allowed bg-slate-400"
                                    type="checkbox"
                                    disabled
                                  />
                                )}
                              </th>
                              <th>Product Detail</th>
                              <th>GST (Rs)</th>
                              <th>You Save (Rs / PR)</th>
                              <th>You Pay (Rs)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {modalObject
                              ? modalObject?.map((tp, index) => {
                                  return (
                                    <tr
                                      // className={`${index % 2 == 0
                                      //   ? "package-offer-card2"
                                      //   : "package-offer-card3"
                                      //   } 11flex 11items-center grid grid-cols-12 sm:gap-3 gap-1 `}
                                      style={{
                                        padding: 5,
                                        opacity: tp?.status === 0 ? 0.5 : 1,
                                        cursor:
                                          tp?.status === 0
                                            ? "not-allowed"
                                            : "default",
                                      }}
                                    >
                                      <td className="text-center">
                                         <></>
                                      </td>
                                      <td>
                                        <div className="flex items-center gap-3">
                                          <div
                                            style={{ width: 65, height: 65 }}
                                          >
                                          <Img
                                            className="default-img"
                                            src={
                                              process.env.REACT_APP_PRODUCTS_URL + tp.barcode + ".jpg"
                                            }
                                            alt={tp?.description}
                                            style={{
                                              width: "100%",
                                              height: "100%",
                                            }}
                                          />
                                          </div>
                                          <div>
                                            <span style={{ fontSize: 14 }}>
                                              {tp?.prod_name?.length > 24
                                                ? tp?.prod_name?.slice(0, 24) +
                                                  "..."
                                                : tp?.prod_name}
                                            </span>

                                            <div
                                              style={{
                                                fontSize: "14px",
                                                color: "rgb(126, 123, 123)",
                                                display: "flex",
                                                gap: 3,
                                              }}
                                            >
                                              Quantity:&nbsp;
                                              {tp?.has_return_rule === "Y" &&
                                              isWithinReturnDuration(
                                                tp?.created_at,
                                                tp?.return_duration
                                              ) ? (
                                                <>
                                                  {renderQuantityTextBox(
                                                    index,
                                                    tp?.quantity
                                                  )
                                                    ? renderQuantityTextBox(
                                                        index,
                                                        tp?.quantity
                                                      )
                                                    : tp?.quantity}
                                                </>
                                              ) : (
                                                tp?.quantity
                                              )}
                                            </div>
                                            {tp?.unit_mrp.toFixed(2) ===
                                            returnMebershipValue(
                                              order_detail?.idmembership_plan,
                                              tp?.product_discount,
                                              tp?.land_discount,
                                              tp?.copartner_discount,
                                              tp?.unit_selling_price
                                            ) ? (
                                              <div
                                                className="flex items-center"
                                                style={{ gap: 10 }}
                                              >
                                                <span
                                                  style={{
                                                    fontSize: "14px",
                                                    color: "black",
                                                  }}
                                                >
                                                  ₹{tp?.unit_mrp?.toFixed(2)}
                                                </span>
                                                <div className="discount-label-warapper">
                                                  <div className="dicount-label t491">
                                                    {returnMebershipname(
                                                      order_detail?.idmembership_plan
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            ) : (
                                              <div
                                                className="flex items-center"
                                                style={{ gap: 10 }}
                                              >
                                                <span
                                                  style={{
                                                    fontSize: "14px",
                                                    color: "rgb(126, 123, 123)",
                                                    textDecoration:
                                                      "line-through",
                                                  }}
                                                >
                                                  ₹{tp?.unit_mrp?.toFixed(2)}
                                                </span>
                                                <div className="discount-label-warapper">
                                                  <span
                                                    style={{
                                                      fontSize: "14px",
                                                      color: "black",
                                                    }}
                                                  >
                                                    ₹
                                                    {returnMebershipValue(
                                                      order_detail?.idmembership_plan,
                                                      tp?.product_discount,
                                                      tp?.land_discount,
                                                      tp?.copartner_discount,
                                                      tp?.unit_selling_price
                                                    )}
                                                  </span>
                                                  <div className="dicount-label t529">
                                                    {returnMebershipname(
                                                      order_detail?.idmembership_plan
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </td>
                                      {/* GST (Rs) */}
                                      <td>
                                        <div className="flex  flex-col w-[120px] gap-[5px]">
                                          <span
                                            style={{
                                              fontSize: "12px",
                                              color: "rgb(126, 123, 123)",
                                            }}
                                          >
                                            CGST:&nbsp;₹
                                            {tp?.total_cgst?.toFixed(2)}
                                          </span>
                                          <span
                                            style={{
                                              fontSize: "12px",
                                              color: "rgb(126, 123, 123)",
                                            }}
                                          >
                                            SGST:&nbsp;₹
                                            {tp?.total_sgst?.toFixed(2)}
                                          </span>
                                        </div>
                                      </td>
                                      {/* You Save (Rs / PR) */}
                                      <td>
                                        {returnMebershipSave(
                                          order_detail?.idmembership_plan,
                                          tp?.unit_mrp,
                                          tp?.product_discount,
                                          tp?.land_discount,
                                          tp?.copartner_discount,
                                          tp?.unit_selling_price
                                        ) === 0 ? (
                                          <div className="11sm:col-span-6 col-span-3 sm:pt-2">
                                            <div
                                              style={{ width: 150, gap: 5 }}
                                              className="flex items-center sm:text-xs text-base"
                                            >
                                              <b>No Discount</b>
                                            </div>
                                          </div>
                                        ) : (
                                          <div className="11sm:col-span-6 col-span-3 sm:pt-2">
                                            <div
                                              style={{ width: 150, gap: 5 }}
                                              className="flex items-center sm:text-xs text-[14px]"
                                            >
                                              <b>
                                                {" "}
                                                ₹
                                                {returnMebershipSave(
                                                  order_detail?.idmembership_plan,
                                                  tp?.unit_mrp,
                                                  tp?.product_discount,
                                                  tp?.land_discount,
                                                  tp?.copartner_discount,
                                                  tp?.unit_selling_price
                                                ).toFixed(2)}
                                              </b>
                                              <b>×</b>
                                              <b>{tp?.quantity}</b>
                                              <b>=</b>
                                              <b>
                                                {(
                                                  returnMebershipSave(
                                                    order_detail?.idmembership_plan,
                                                    tp?.unit_mrp,
                                                    tp?.product_discount,
                                                    tp?.land_discount,
                                                    tp?.copartner_discount,
                                                    tp?.unit_selling_price
                                                  ) * tp?.quantity
                                                ).toFixed(2)}
                                              </b>
                                              ({" "}
                                              <b>
                                                {" "}
                                                {returnMebershipPR(
                                                  order_detail?.idmembership_plan,
                                                  tp?.unit_mrp,
                                                  tp?.product_discount,
                                                  tp?.land_discount,
                                                  tp?.copartner_discount,
                                                  tp?.unit_selling_price
                                                )}
                                                %
                                              </b>
                                              )
                                            </div>
                                          </div>
                                        )}
                                      </td>
                                      {/* You Pay (Rs) */}
                                      <td>
                                        <div className="11sm:col-span-6 col-span-2 sm:pt-2">
                                          {order_detail?.idmembership_plan ==
                                          1 ? (
                                            <div
                                              style={{ width: 150, gap: 5 }}
                                              className="flex items-center sm:text-xs text-[14px]"
                                            >
                                              <b>
                                                {tp?.unit_selling_price?.toFixed(
                                                  2
                                                )}
                                              </b>
                                              <b>×</b>
                                              <b>{tp?.quantity}</b>
                                              <b>=</b>
                                              <b>
                                                {tp?.total_price?.toFixed(2)}
                                              </b>
                                            </div>
                                          ) : (
                                            <div
                                              style={{ width: 150, gap: 5 }}
                                              className="flex items-center sm:text-xs text-[14px]"
                                            >
                                              <b>{returnMebershipValue(
                                                      order_detail?.idmembership_plan,
                                                      tp?.product_discount,
                                                      tp?.land_discount,
                                                      tp?.copartner_discount,
                                                      tp?.unit_selling_price
                                                    )}</b>
                                              <b>×</b>
                                              <b>{tp?.quantity}</b>
                                              <b>=</b>
                                              <b>
                                                {tp?.total_price?.toFixed(2)}
                                              </b>
                                            </div>
                                          )}

                                          {tp?.status === 0 && (
                                            <div
                                              style={{
                                                marginTop: "0.5rem",
                                                // textAlign: "right",
                                                color: "red",
                                              }}
                                            >
                                              {tp?.remark}
                                            </div>
                                          )}
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })
                              : null}

                            <tr>
                              <td></td>
                              <td></td>
                              <td
                                style={{
                                  color: "rgb(126, 123, 123)",
                                }}
                              >

                                {JSON.stringify()}

                                 ₹{yousave.gst?.toFixed(2)}
                                 
                              </td>
                              <td>
                                 <b>₹{yousave.save?.toFixed(2)}</b>
                              </td>
                              <td>
                                <b>₹{yousave?.total_price?.toFixed(2)}</b>                                 
                              </td>
                            </tr>
                            {modalObject && (
                              <tr>
                                <td colSpan={5}>
                                  <div className="flex justify-between items-center gap-2 w-full">
                                    <div className="flex items-center gap-2">
                                      <span className="left-text-modal font-[20px]">
                                        {modalObject.length}
                                      </span>
                                      <span className="rigth-text-modal  font-[20px]">
                                       Items in this order
                                      </span>
                                     
                                    </div>

                                    <div>
                                      <></>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-start  items-start flex-col border-bottom-1 w-full">

                  <div className="order-title">Bill Details</div>

                    <div className="flex justify-between w-full mt-1 hover:bg-gray-100">
                      <span className="left-text-modal">Item mrp(Base)</span>
                      <span className="rigth-text-modal">
                        <b className="my-aviClass"> ₹ {yousave?.mrp?.toFixed(2)} </b>
                        </span>
                    </div>
                    <div className="flex justify-between w-full mt-1 hover:bg-gray-100">
                      <span className="left-text-modal">Coupon discount</span>
                      <span className="rigth-text-modal">
                        <b className="my-aviClass"> ₹ {coupon_discount?.toFixed(2)} </b>
                        </span>
                    </div>
                    <div className="flex justify-between w-full mt-1 hover:bg-gray-100">
                      <span className="left-text-modal">Flat & Package Discount</span>
                      <span className="rigth-text-modal">
                        <b className="my-aviClass">₹ {yousave?.save?.toFixed(2)} </b>
                        </span>
                    </div>

                    <div className="flex justify-between w-full mt-1 hover:bg-gray-100">
                      <span className="left-text-modal">Cashback in Wallet</span>
                      <span className="rigth-text-modal">
                        <b className="my-aviClass"> ₹{location?.state?.CashbackinWallet?.toFixed(2)} </b>
                        </span>
                    </div>

                   
                      <div className="flex justify-between w-full mt-1 hover:bg-gray-100">
                        <span className="left-text-modal">Membership Name</span>
                        <span className="rigth-text-modal">
                          {returnMebershipname(location?.state?.idmembership_plan)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between w-full mt-1 hover:bg-gray-100">
                        <span
                          className="left-text-modal"
                          style={{
                            fontWeight: "bold",
                            color: "rgb(49, 134, 22)",
                          }}
                        >
                          Bill Total   
                        </span>
                        <span
                          className="rigth-text-modal"
                          style={{
                            fontWeight: "bold",
                            color: "rgb(49, 134, 22)",
                          }}
                        >
                          ₹{location?.state?.total_price?.toFixed(2)}
                        </span>
                      </div>

                    {/* <div className="order-title">Order Details</div> */}
                    

                    
                  </div>
                  
                  <div className="flex justify-start  items-start flex-col mt-2 ">
                    <div className="w-full">
                      <div className="flex justify-between w-full mt-1 hover:bg-gray-100"></div>
                    
                      <div className="flex justify-between w-full mt-1 hover:bg-gray-100">
                        <span className="left-text-modal">Payment Mode</span>
                        <span className="rigth-text-modal">
                          Paid by {location?.state?.pay_mode?.charAt(0).toUpperCase()+location?.state?.pay_mode?.slice(1).toLowerCase()}
                        </span>
                      </div>

                      <div className="flex justify-between w-full mt-1 hover:bg-gray-100">
                        <span className="left-text-modal">Deliver To</span>
                        <span className="rigth-text-modal">
                        <div className="w-full">
                      
                          <div className="flex justify-between w-full mt-1 hover:bg-gray-100">
                            <span className="rigth-text-modal">
                              {location?.state?.address}
                            </span>
                          </div>
                         </div>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <AlertModal2 isOpen={isOpen} onClose={modalClose}>
        <div style={{ width: 400, minHeight: 120, maxWidth: "100%" }}>
          <div className="pt-3">
            <div className="flex flex-col items-center">
              <CheckCircleOutlineOutlinedIcon
                style={{ fontSize: 115, color: "rgb(12, 131, 31)" }}
              />
              <p className="text-md text-center">
                Your Item successfully canceled
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 mt-3">
              <button
                className="button-upgrade flex items-center justify-center"
                onClick={modalClose}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </AlertModal2>
      {/* <LandingPageFooter /> */}
    </>
  );
};
export default OrderDetail;
