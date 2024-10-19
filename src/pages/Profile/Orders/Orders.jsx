import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CardTitle from "../CardTitle";
import "./Orders.scss";
import { Loader } from "components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { MyOrderGet } from "Actions/myoder/action";
import moment from "moment";
import { NoDataFound } from "components/Cards";
import { FormatDateTime } from "components/DateTimeFormate";
import Pagination from "./Pagination";

const Orders = () => {
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const token = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.access_token
  );
  const token_date = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.expires_at
  );
  const { order_result, order_loading } = useSelector(
    (state) => state?.MyOrderListReducer
  );
  useEffect(() => {
    if (token === undefined && token_date === undefined) {
      setIsTokenExpired(true);
    } else {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      setIsTokenExpired(token_date < currentTimestamp);
      dispatch(MyOrderGet("api/myy-order", token, "", ""));
    }
  }, [isTokenExpired, token, token_date, location.pathname]);
  const pageSize = 5; // Number of orders per page
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastOrder = currentPage * pageSize;
  const indexOfFirstOrder = indexOfLastOrder - pageSize;
  const reversedOrderData = order_result?.data?.slice()?.reverse();


  //  let currentOrders = reversedOrderData?.slice(
  //   indexOfFirstOrder,
  //   indexOfLastOrder
  // );


  let currentOrders = reversedOrderData?.sort((a, b) => b.idcustomer_order - a.idcustomer_order);

  currentOrders = currentOrders?.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // const activePath = window.location.pathname;
  // const NaviOrderDetail = () => {
  //   navigate("/categories")
  //   localStorage.setItem("order", activePath == "/" ? "" : activePath)
  // }

  // console.log("currentOrders?.length",order_result?.data?.length)
  return (
    <div className="card orderpage">
      <CardTitle
        title={`My Orders ${
          order_result && order_result?.data?.length > 0
            ? "(" + order_result?.data?.length + ")"
            : ""
        }`}
      />

      {currentOrders?.length == 0 ? (
        <NoDataFound title="No Order Available" />
      ) : (
        <div className="card-body" style={{ paddingLeft: 0 }}>
          <div
            className={`table-responsive mb-8 ${
              order_loading ? "h-auto" : "sm:h-auto h-[18rem]"
            }`}
            // style={{ height: order_loading ? "auto" : 360 }}
          >
            <table className="table">
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Order Type</th>
                  <th>Store Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {order_loading ? (
                <tr>
                  <td colSpan={6}>
                    <div className="flex items-center justify-center w-full">
                      <Loader />
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {currentOrders?.length == 0 ? (
                    <tr>
                      <td colSpan={5}>
                        <div className="text-center !text-xl font-semibold !text-gray-400">
                          Order Not Found
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tbody style={{ fontSize: "14px", opacity: 0.8 }}>
                      <>
                        {currentOrders?.map((or) => {
                          return (
                            <>
                              {or?.total_price == 0 &&
                              or?.total_quantity == 0 ? (
                                <tr key={or?.idcustomer_order}>
                                  <td>
                                    <Link
                                      to={`/order-detail/${or?.idcustomer_order}`}
                                      props={or?.created_at}
                                    >
                                      GGB000{or?.idcustomer_order}
                                     
                                    </Link>
                                  </td>
                                  <td>
                                    {moment(or?.created_at).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </td>
                                  <td>Cancelled</td>
                                  <td>
                                    ₹{or?.total_price.toFixed(2)} for{" "}
                                    {or?.total_quantity} item
                                  </td>
                                  <td>
                                    {or?.is_pos == 1
                                      ? "Take Away"
                                      : or?.is_pos == 0
                                      ? "Home Delivery"
                                      : ""}
                                  </td>
                                  <td>{or?.address}</td>
                                  <td>
                                    <div className="flex flex-wrap gap-2">
                                      <Link
                                        to={`/order-detail/${or?.idcustomer_order}`}
                                        className="btn btn-outline-primary "
                                        attr={`${or?.idcustomer_order}`}
                                      >
                                        Order Details
                                      </Link>
                                      {/* <Link
                        to={`#`}
                        className="btn btn-outline-secondary"
                      >
                        Track Order
                      </Link> */}
                                    </div>
                                  </td>
                                </tr>
                              ) : (
                                <tr key={or?.idcustomer_order}>
                                  <td>
                                    <Link
                                      to={`/order-detail/${or?.idcustomer_order}`}
                                      state={{ value:or?.created_at,coupon_discount:or?.coupon_discount, 
                                        flatPackage:or?.copartner_discount, 
                                        CashbackinWallet:or?.wallet_amount,
                    idmembership_plan:or?.idmembership_plan,                                          
                    total_price:or?.total_price,   
                    pay_mode:or?.pay_mode,    
                    address:or?.address,  type: "ssd" }}
                                    >
                                      GGB000{or?.idcustomer_order}
                                    </Link>
                                  </td>
                                  <td>
                                    {/* {moment(or?.created_at).format(
                                      "DD/MM/YYYY"
                                    )} */}
                                    {FormatDateTime({text: or?.created_at})}
                                  </td>
                                  <td>
                                    {or?.status == 1
                                      ? "Completed"
                                      : "Processing"}
                                  </td>
                                  <td>
                                    ₹{or?.total_price.toFixed(2)} for{" "}
                                    {or?.total_quantity} item
                                  </td>
                                  <td>
                                    {or?.is_pos == 1
                                      ? "Take Away"
                                      : or?.is_pos == 0
                                      ? "Home Delivery"
                                      : ""}
                                  </td>
                                  <td className="address">{or?.address}</td>
                                  <td>
                                    <div className="flex flex-wrap gap-2">
                                      <Link
                                        to={`/order-detail/${or?.idcustomer_order}`}
                                        className="btn btn-outline-primary "
                                        state={{ value:or?.created_at,coupon_discount:or?.coupon_discount, 
                                        flatPackage:or?.copartner_discount, 
                                        CashbackinWallet:or?.wallet_amount,
                    idmembership_plan:or?.idmembership_plan,                                          
                    total_price:or?.total_price,   
                    pay_mode:or?.pay_mode,    
                    address:or?.address,  type: "ssd" }}
                                      >
                                        Order Details
                                      </Link>
                                      {/* <Link
                        to={`#`}
                        className="btn btn-outline-secondary"
                      >
                        Track Order
                      </Link> */}
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </>
                          );
                        })}
                      </>
                    </tbody>
                  )}
                </>
              )}
            </table>
          </div>
          {/* Pagination */}
          {/* <Pagination totalPages={order_result?.data?.length} pageSize={100} /> */}

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(order_result?.data?.length / pageSize)} 
            pageSize={pageSize}
            paginate={paginate}
           />

          {/* <span>hishdfis</span> */}
          {/* <ul className="pagination flex justify-center">
            {Array.from({
              length: Math.ceil(order_result?.data?.length / pageSize),
            }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  index + 1 === currentPage ? "active" : ""
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
          </ul> */}
          
        </div>
      )}
    </div>
  );
};

export default Orders;
