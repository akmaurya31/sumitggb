import { Img } from "components";
import CardTitle from "../CardTitle";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appliedPackage } from "Actions/package/action";
import { AddCartPost, RemoveCartPost } from "Actions/cart/action";

import "./Packages.scss";
import { NoDataFound } from "components/Cards";
import { FormatDateTime } from "components/DateTimeFormate";

const Packages = ({ package_data }) => {
  const dispatch = useDispatch();
  const [isApplied, setApplied] = useState(0);
  const applyPackage = useSelector(
    (state) => state.PackageReducer.package_id
  );
  var { cart_result, cart_id, cart_error } = useSelector(
    (state) => state.CartReducer
  );
  const storeids = useSelector(
    (state) => state.WarehouseReducer?.warehouseData
  );
  const id = useSelector(
    (state) => state.WarehouseReducer?.warehouseData
  );
  // const storeid = id && id.length>0&&id[0]?.idstore_warehouse;
  const storeid = storeids[0]?.idstore_warehouse

  useEffect(() => {
    if (applyPackage) {
      setApplied(applyPackage);
    }
  }, []);

  const handleApplied = (pak) => {
    // console.log(pak);
    setApplied(pak.idpackage);
    dispatch(appliedPackage(pak.idpackage));
    if (pak.base_trigger_amount > 0) {
      // mean package base on cart amount
      // return dispatch(
      //   AddCartPost(
      //     "api/add-to-cart",
      //     {
      //       cart_id:
      //         cart_id == null
      //           ? Date.now() + Math.floor(Math.random() * 1000)
      //           : cart_id,
      //       idstore: storeid,
      //       idproduct_master: pak.idproduct_master,
      //       idinventory: tb.idinventory,
      //       qty: tp1.qty,
      //     },
      //     cart_data,
      //     "" // send tokenvalue is null
      //   )
      // );
    } else {
      // packages base on trigger product
      pak?.trigger_prod?.map((tp) => {
        // let tp1 = { ...tp, qty: tp.package_item_qty, };
        let cart_data = [...cart_result, tp];
        return dispatch(
          AddCartPost(
            "api/add-to-cart3",
            {
              cart_id:
                cart_id == null
                  ? Date.now() + Math.floor(Math.random() * 1000) + "_Web"
                  : cart_id,
              idstore: storeid,
              idproduct_master: tp.idproduct_master,
              idinventory: tp.idinventory,
              qty: tp.package_item_qty,
            },
            cart_data,
            "" // send tokenvalue is null
          )
        );
      });
    }

  };
  return (
    <div className="card">
      <CardTitle title="Exciting Deals" />
      {package_data?.data.length == 0 ?
        <NoDataFound title="No deal available" />
        :
        <div className="card-body" style={{ paddingLeft: 0 }}>
          <div className="packages-grid">
            {
              package_data?.data?.map((pc, index) => {
                return (
                  <>
                    <div className="package-offer-card shadow-sm mb-2" key={index}>
                      <div className="flex flex-col 11gap-2 ">
                        <div className="package-offer-header flex justify-between items-center">
                          <div className="text-left px-1">{pc?.name}</div>
                          <div className="flex items-center justify-between lg:justify-normal sm:w-full w-1/2 pt-2 lg:pt-0">
                            <span className="text-xs flex font-medium">
                              <span className="text-xs" style={{ width: 65 }}>
                                Expire On
                              </span>
                              {/* <span className="text-xs">{new Date(pc?.valid_till).toLocaleDateString()}</span> */}
                              <span className="text-xs">{FormatDateTime({text: pc?.valid_till, isTime: false})}</span>
                            </span>
                            {pc?.bypass_make_gen == 0 &&
                              (isApplied ? (
                                <span className="text-xs flex text-[#0c831f]"> Applied </span>
                              ) : (
                                <span
                                  className="text-xs flex btn btn-sm btn-default"
                                  onClick={() => handleApplied(pc)}
                                >
                                  Apply
                                </span>
                              ))}
                          </div>

                        </div>
                        <div className="p-3">
                          {pc?.trigger_prod && pc?.trigger_prod.length > 0 && (
                            <div className=" pb-0 w-full  flex 11flex-col items-center gap-3 bg-white 11border-b-[1px] border-dashed border-[#0000002c] ">
                              <span className="text-xs text-[#0c831f] font-semibold mb-2">
                                Buy minimum quantity{" "}
                                {pc?.trigger_prod &&
                                  pc?.trigger_prod[0]?.package_item_qty}{" "}
                                to get Free Products
                              </span>
                            </div>
                          )}
                          <div className=" pt-0 w-full  grid grid-cols-12 gap-3 bg-white px-2">
                            {pc?.trigger_prod && pc?.trigger_prod.length > 0 && (
                              <div className="sm:col-span-12 col-span-6 flex w-full gap-4 flex-end 11mt-2">
                                <div className="flex flex-col gap-2 w-full ">
                                  {pc?.trigger_prod?.map((tp) => {
                                    return (
                                      <>
                                        {" "}
                                        <span className="text-xs">Buying this product</span>
                                        <div
                                          className="package-offer-card flex items-center gap-3"
                                          style={{
                                            padding: 5,
                                            borderRadius: 5,
                                            height: 80,
                                          }}
                                        >
                                          <div style={{ width: 70 }}>
                                            {" "}
                                            <Img
                                              className="default-img"
                                              src={
                                                process.env.REACT_APP_PRODUCTS_URL +
                                                tp.barcode +
                                                ".jpg"
                                              }
                                              alt={tp?.description}
                                              style={{ width: "100%" }}
                                            />
                                          </div>
                                          <div className="flex flex-col">
                                            <span className="text-xs mb-2">
                                              {tp?.prod_name}
                                            </span>
                                            <span className="text-xs font-semibold">
                                              ₹{tp?.selling_price}
                                            </span>
                                          </div>
                                        </div>
                                      </>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                            <div className="sm:col-span-12 col-span-6 flex w-full gap-4 flex-end 11mt-2">
                              <div className="flex flex-col gap-2 w-full">
                                {pc?.tagged_prod?.map((tp) => {
                                  return (
                                    <>
                                      <span className="text-xs">Get this product</span>
                                      <div
                                        className="package-offer-card flex items-center gap-3"
                                        style={{
                                          padding: 5,
                                          borderRadius: 5,
                                          height: 80,
                                        }}
                                      >
                                        <div style={{ width: 70 }}>
                                          {" "}
                                          <Img
                                            className="default-img"
                                            src={
                                              process.env.REACT_APP_PRODUCTS_URL +
                                              tp.barcode +
                                              ".jpg"
                                            }
                                            alt={tp?.description}
                                            style={{
                                              width: "100%",
                                              height: "70px",
                                            }}
                                          />
                                        </div>
                                        <div className="flex flex-col">
                                          <span className="text-xs mb-2">
                                            {tp?.prod_name}
                                          </span>
                                          <span className="text-xs font-semibold">
                                            ₹{tp?.selling_price}
                                          </span>
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}

          </div>
        </div>
      }
    </div>
  );
};

export default Packages;