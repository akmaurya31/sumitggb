import { Img } from "components";

import { Link } from "react-router-dom";
import vegicon from "../../styles/imgs/logo/vegicon.svg";
import ProductImage from "components/Product/ProductImage";
import "./ProductMembershipCard.scss";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { ButtonLoader } from "components/Loader";

const ProductMembershipCard = ({
  prd,
  idmembership_plan,
  item_id,
  token,
  isTokenExpired,
  quantity,
  addtocart,
  openModal,
  getMembership,
  toggleDrawerBottom,
  buttonLogin,
  isCartAdd
}) => {

  const MemberCard = [
    // {
    //   id: 1,
    //   title: "Instant",
    //   urlkey: prd?.selected_batch?.copartner,
    //   instant: prd?.instant,
    //   membership_price: prd?.member_price[0]?.price,
    //   mrp: prd?.mrp,
    //   bg: "bg-orange-800",
    // },
    {
      id: 2,
      title: "Product",
      urlkey: prd?.selected_batch?.product,
      instant: prd?.instant,
      selling_price: prd?.selling_price,
      membership_price: prd?.member_price[1]?.price,
      mrp: prd?.mrp,
      bg: "bg-yellow-800",
    },
    {
      id: 3,
      title: "Land",
      urlkey: prd?.selected_batch?.land,
      instant: prd?.instant,
      selling_price: prd?.selling_price,
      membership_price: prd?.member_price[2]?.price,
      mrp: prd?.mrp,
      bg: "bg-green-800",
    },
    {
      id: 4,
      title: "Co-Partner",
      urlkey: prd?.selected_batch?.copartner,
      instant: prd?.instant,
      selling_price: prd?.selling_price,
      membership_price: prd?.member_price[3]?.price,
      mrp: prd?.mrp,
      bg: "bg-indigo-800",
    },
  ];

  
  return (
    <div className="product-membership-card bg-[#fff9dd]  rounded-xl 11mb-6 sm:pb-6">
      <div className="flex justify-between items-center 11mb-2 sm:mb-2 px-2 pt-2 shadow-sm">
        <Link
          to={{
            pathname: "/product-single",
            search: prd?.prod_name.replace(/\s+/g, "-"),
          }}
          state={{ value: item_id }}
          className="text-decoration-none"
        >
          <h3 className="sm:text-sm text-base font-semibold text-green-600  mb-[0]">
            {prd?.prod_name}
          </h3>
        </Link>
        {toggleDrawerBottom !== undefined && (
          <CloseIcon
            className="mobile-view"
            onClick={toggleDrawerBottom(false)}
          />
        )}
      </div>
      <div className="grid sm:grid-cols-1 grid-cols-1 gap-2 sm:max-h-[84vh] overflow-y-auto">
        {MemberCard.map((db, index) => (
          <div
            className={`membership-new-card ${
              idmembership_plan == db.id && " active-member-package "
            }`}
          >
            {idmembership_plan == db.id && (
              <span className="bg-green-700 rounded-3xl text-white-A700 px-3 py-1 text-[10px] w-fit">
                Active
              </span>
            )}
            <div className="mb-2">
              <h4 className="sm:text-xs text-sm font-semibold mb-0 text-black">
                <span className="sm:text-base text-lg font-semibold text-green-600 px-1">
                  ₹{db?.instant && db?.instant.toFixed(2)}
                </span>{" "}
                <span className="sm:text-xs text-sm font-semibold line-through">
                  ₹{db?.mrp && db?.mrp.toFixed(2)}
                </span>
                <span className="sm:text-[10px] text-xs px-1">
                  ({Math.round(((db?.mrp - db?.instant) / db?.mrp) * 100)}% OFF){" "}
                  <span className="text-green-600 text-[9px]">
                    + Extra Cashback
                  </span>
                </span>
              </h4>

              <p className="text-xs font-semibold text-black">
                {db.title == "Instant" ? "Discount of " : " Cashback of "}₹
                {db.id == 1 ? (
                      <>
                        {(db?.mrp - db?.instant).toFixed(2)}{" "}
                        {Math.round(db?.mrp - db?.instant) > 0 && (
                          <>
                            (
                            {Math.round(
                              ((db?.mrp - db?.instant) / db?.mrp) * 100
                            )}
                            %)
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {(db?.instant - db?.membership_price).toFixed(2)}{" "}
                        {Math.round(db?.instant - db?.membership_price) > 0 && (
                          <>
                            (
                            {Math.round(
                              ((db?.instant - db?.membership_price) /
                                db?.instant) *
                                100
                            )}
                            %)
                          </>
                        )}
                      </>
                    )}{" "}
                on purchase of 1 quantity
              </p>
            </div>
            <div className="border-solid border-[1px] border-gray-401 rounded-sm mb-2">
              <div className="flex items-center gap-2 sm:p-1 p-2">
                <div className="pro-img ">
                  <ProductImage prd={prd} style={false} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-green-600 mb-0 uppercase">
                    {db.title == "Instant"
                      ? db.title + " Discount"
                      : db.title + " Cashback"}
                  </h4>
                    <p className="text-xs text-gray-500">
                    Extra Cashback of ₹
                    {db.id == 1 ? (
                      <>
                        {(db?.mrp - db?.instant).toFixed(2)}{" "}
                        {Math.round(db?.mrp - db?.instant) > 0 && (
                          <>
                            (
                            {Math.round(
                              ((db?.mrp - db?.instant) / db?.mrp) * 100
                            )}
                            %)
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {(db?.instant - db?.membership_price).toFixed(2)}{" "}
                        {Math.round(db?.instant - db?.membership_price) > 0 && (
                          <>
                            (
                            {Math.round(
                              ((db?.instant - db?.membership_price) /
                                db?.instant) *
                                100
                            )}
                            %)
                          </>
                        )}
                      </>
                    )}{" "}
                    in this membership
                  </p>
                  {/* <p className="text-xs font-semibold text-black">
                    {db.title == "Instant" ? "Discount of " : " Cashback of "}
                    ₹{db.id == 1 ? (db?.mrp - db?.instant).toFixed(2) : (db?.instant - db?.membership_price).toFixed(2)} in
                    this Wish Basket
                  </p> */}
                </div>
              </div>
            </div>
            <div className="11add-cart add-btn ">
              {token && isTokenExpired == false ? (
                idmembership_plan == db.id ? (
                  quantity>0&&isCartAdd ? (
                    <>
                       <span
                        className={`button text-decoration-none btn-sm h-[40px] ${
                          quantity > 0 && " active"
                        }`}
                      >
                        {
                          buttonLogin==true? <ButtonLoader color="white" size={6} />:<> <i
                          className="fa-solid fa-minus mr-1"
                          onClick={() => addtocart("minus")}
                        ></i>
                        {quantity}
                        <i
                          className="fa-solid fa-plus ml-1"
                          onClick={() => addtocart("plus")}
                        ></i></>
                        }
                       
                      </span>
                    </>
                  
                  ) : (
                    <span
                      className={`button add text-decoration-none btn-sm `}
                      onClick={() => addtocart(prd)}
                    >
                      {/* <i className="fi-rs-shopping-cart mr-5"></i> */}
                      {
                        buttonLogin==true? <ButtonLoader color="rgb(12, 131, 31)" size={6} />
                        :"Add"
                      }
                    </span>
                  )
                ) : (
                  <span
                    className="button change-plan text-decoration-none btn-sm change-plan-btn"
                    // onClick={() => changePlan(4)}
                    onClick={() => openModal(db.id, db.title)}
                  >
                    {/* <i className="fi-rs-shopping-cart mr-5"></i> */}
                    Subscribe
                  </span>
                )
              ) : (
                <span
                  className="button  text-center get-membership text-decoration-none btn-sm change-plan-btn "
                  onClick={() => getMembership(db.id)}
                >
                  {/* <i className="fi-rs-shopping-cart mr-5"></i> */}
                  Subscribe
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* old  */}
      {/* {MemberCard.map(
        (db, index) =>
          db.urlkey && (
            <div
              className={`modal-product-card product-cart-wrap 11cart-width w-44 max-w-full relative flex justify-between pt-2 ${
                idmembership_plan == db.id && " active-package"
              }`}
            >
              {idmembership_plan == db.id && (
                <CheckCircleOutlineIcon className="active-check-icon" />
              )}
              <span
                className={
                  `card-badge text-indigo-100 text-xs me-0 px-2.5 py-0.5 11rounded dark:bg-indigo-900 dark:text-yellow-300 w-full h-7 flex items-center justify-center font-bold ` +
                  db.bg
                }
              >
                {db.title}
              </span>

              <Img className="veg-icon" src={vegicon} alt="" />
              <div style={{ marginTop: "1.2rem" }}>
                <ProductImage prd={prd} style={false} />
              </div>

              <div className="product-content-wrap p-2 mt-4">
                <div className="flex flex-wrap items-center justify-between">
                  <div></div>
                  <div className="product-price ">
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
                    <span className="text-sm">
                      ₹{db.selling_price.toFixed(2)}
                    </span>
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
                        idmembership_plan == db.id ? (
                          quantity ? (
                            <span
                              className={`button text-decoration-none btn-sm ${
                                quantity > 0 && " active"
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
                              Add
                            </span>
                          )
                        ) : (
                          <span
                            className="button change-plan text-decoration-none btn-sm change-plan-btn"
                            // onClick={() => changePlan(4)}
                            onClick={() => openModal(db.id, db.title)}
                          >
                            Subscribe
                          </span>
                        )
                      ) : (
                        <span
                          className="button  text-center get-membership text-decoration-none btn-sm change-plan-btn "
                          onClick={() => getMembership(db.id)}
                        >
                          Subscribe
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
      )} */}

      {/* {prd?.selected_batch?.copartner && (
                <div
                    className={`modal-product-card product-cart-wrap 11cart-width w-44 max-w-full relative flex justify-between pt-2 ${idmembership_plan == 1 && " active-package"
                        }`}
                >
                    <span className="card-badge text-indigo-100 bg-orange-800 text-xs me-0 px-2.5 py-0.5 11rounded dark:bg-indigo-900 dark:text-yellow-300 w-full h-7 flex items-center justify-center font-bold">
                        Instant discount
                    </span>


                    <Img className="veg-icon" src={vegicon} alt="" />
                    <div style={{ marginTop: "1.2rem" }}>
                        <ProductImage prd={prd} style={false} />
                    </div>

                    <div className="product-content-wrap p-2 mt-4">

                        <div className="flex flex-wrap items-center justify-between">

                            <div className="product-price ">
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
                                <span>₹{prd?.selling_price?.toFixed(2)}</span>

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
                                                    
                                                    Add
                                                </span>
                                            )
                                        ) : (
                                            <span
                                                className="button change-plan text-decoration-none btn-sm change-plan-btn"
                                                // onClick={() => changePlan(4)}
                                                onClick={() => openModal(1)}
                                            >
                                                
                                                Subscribe
                                            </span>
                                        )
                                    ) : (
                                        <span
                                            className="button  text-center get-membership text-decoration-none btn-sm change-plan-btn "
                                            onClick={() => getMembership(1)}
                                        >
                                            
                                            Subscribe
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )} */}
    </div>
  );
};

export default ProductMembershipCard;