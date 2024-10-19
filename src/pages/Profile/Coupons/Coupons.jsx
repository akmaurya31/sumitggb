import { fetchCouponData } from "Actions/coupon/action";
import CardTitle from "../CardTitle";
import "./Coupons.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "components/Loader";
import moment from "moment";
import { CouponCard, NoDataFound } from "components/Cards";

const Coupons = ({ }) => {
  const { Coupon_data, Coupon_loading } = useSelector(
    (state) => state?.CouponReducer
  );

  return (
    <div className="card">
      <CardTitle title="Coupons" />
      {Coupon_data && Coupon_data?.data?.length == 0 || Coupon_data == null ?
        <NoDataFound title="No Coupon Available" /> :

        <div className="card-body" style={{ paddingLeft: 0 }}>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 11flex flex-col gap-3">
            {Coupon_loading ? (
              <Loader />
            ) : (
              <>
                {Coupon_data &&
                  Coupon_data?.data &&
                  Coupon_data?.data?.map((coupon) => {
                    return (
                      <>
                        <CouponCard coupon={coupon} />
                        {/* <div className="offer-cuppon">
                        <div className="offer-items">
                          <div>
                            <h6 className="text-base">
                              <b>{coupon?.name}</b>
                            </h6>
                            <span>
                              <b>{coupon?.discount_percentage}% off</b>
                            </span>
                          </div>
                          <div>
                            <b>Maximum Amount ₹{coupon?.uptomax_amount}</b>
                          </div>
                          <div className="btn-offer-wrp flex-wrap justify-end">
                            <div>
                              <b>Expire On :</b>{" "}
                              {moment(coupon?.active_till).format("DD/MM/YYYY")}{" "}
                            </div>

                            <div className="btn-offer">
                              <button>Apply</button>
                            </div>
                          </div>
                        </div>
                      </div> */}
                      </>
                    );
                  })}
              </>
            )}
          </div>
        </div>
      }
    </div>
  );
};

export default Coupons;
