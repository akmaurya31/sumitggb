import { Img } from "components";
import product2_1 from "../../styles/imgs/shop/product-2-1.jpg";
import no_image from "../../assets/images/no-image.jpeg";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddCartPost,
  FetchCartPost,
  RemoveCartPost,
} from "Actions/cart/action";
import { ButtonLoader } from "components/Loader";
import { ReturnPR, ReturnPRBadge } from "components/ReturnPRBadge";
import BadgePro from "components/BadgePro";
export const CartProdct = (props) => {
  const dispatch = useDispatch();

  // console.log("props", props);
  const { cart, idmembership_plan, isChecked, deal, mrp } = { ...props };

  var { cart_result, cart_id, cart_error } = useSelector(
    (state) => state.CartReducer
  );
  const item_id =
    cart?.batches && cart.batches[0]?.idproduct_master
      ? cart.batches[0].idproduct_master
      : cart.idproduct_master;
  var [quantity, setQuantity] = useState(cart.quantity);
  const [buttonLogin, setLoding] = useState(false);
  const token = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.access_token
  );
  const id = useSelector(
    (state) => state.WarehouseReducer?.warehouseData
  );

  const storeids = useSelector(
    (state) => state.WarehouseReducer?.warehouseData
  );

  let cartId = (cart_id == null ? Math.floor(Math.random() * 1000) + "_Web": cart_id);

  // const storeid = id&&id?.length>0&& id[0].idstore_warehouse;
  const storeid = storeids[0]?.idstore_warehouse

  const addtoCart = (value) => {
    setLoding(true);
    quantity = value == "minus" ? quantity - 1 : quantity + 1;

    var cart_data = [];
    if (cart_result && cart_result?.length) {
      if (value == "minus" || value == "plus") {
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
      }
    }
    if (quantity > 0) {
      dispatch(
        AddCartPost(
          "api/add-to-cart",
          {
            cart_id: cartId,
            idstore: storeid,
            idproduct_master: cart.idproduct_master,
            idinventory: cart.idinventory,
            qty: quantity,
          },
          cart_data,
          token
        )
      );
      dispatch(
        FetchCartPost(
          "api/get-cart",
          {
            cart_id: cartId,
            idstore: storeid,
            idproduct_master: cart.idproduct_master,
            idinventory: cart.idinventory,
            qty: quantity,
          },
          token
        )
      );
    } else {
      dispatch(
        RemoveCartPost(
          "api/remove-from-cart",
          {
            cart_id: cartId,
            iidstore: storeid,
            idproduct_master: cart.idproduct_master,
          },
          cart_data,
          token
        )
      );
      dispatch(
        FetchCartPost(
          "api/get-cart",
          {
            cart_id: cartId,
            idstore: storeid,
            idproduct_master: cart.idproduct_master,
          },
          token
        )
      );
    }
  };

  useEffect(() => {
    cart_result &&
      cart_result.map((cartItem) => {
        const cart_item_id = cartItem?.idproduct_master;
        if (cart_item_id === item_id) {
          setQuantity(cartItem.quantity);
          setLoding(false);
        }
      });
    setLoding(false);
  }, [cart_result]);
  useEffect(() => {
    // if error come in any cart api
    if (buttonLogin) {
      // console.log("clear storage");
      const timeoutId = setTimeout(() => {
        localStorage.clear();
        // console.log("error in api");
      }, 4000);
      return () => clearTimeout(timeoutId);
    }
  }, [buttonLogin, cart_error]);

  const MrpSameAsSellingPrice = (
    membership,
    mrp,
    instance,
    prodcut,
    land,
    coparter
  ) => {
    if (membership == 1) {
      if (mrp !== instance) {
        return true;
      }
    }
    if (membership == 2) {
      if (mrp !== prodcut) {
        return true;
      }
    }
    if (membership == 3) {
      if (mrp !== land) {
        return true;
      }
    }
    if (membership == 4) {
      if (mrp !== coparter) {
        return true;
      }
    }
  };

  // {console.log("MrpSameAsSellingPrice", MrpSameAsSellingPrice( idmembership_plan,
  //   cart?.mrp,
  //   cart?.selling_price,
  //   cart?.product,
  //   cart?.land,
  //   cart?.copartner))}

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3">
        <div className="cart-prod-image flex item-center justify-center border-[1px] rounded">
          <Img
            className="default-img"
            src={
              deal
                ? cart?.products &&
                  (cart?.products[0]
                    ? process.env.REACT_APP_PRODUCTS_URL +
                      cart?.products[0].barcode +
                      ".jpg"
                    : no_image)
                : cart?.barcode
                ? process.env.REACT_APP_PRODUCTS_URL + cart.barcode + ".jpg"
                : no_image
            }
            alt={cart?.description}
            style={{ width: "90%" }}
            onError={(e) => {
              e.target.src = no_image;
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="cart-pr-text">
            {deal ? cart?.products[0].prod_name : cart?.prod_name}
          </span>
          {/* <span className="cart-pr-text">250 g</span> */}

          {deal ? (
            cart?.amount == 0 ? (
              <span className="cart-pr-price line-through 11">
                ₹{" "}
                {new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(cart?.products[0]?.selling_price)}
              </span>
            ) : (
              <span className="cart-pr-price 11">
                ₹{" "}
                {new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(cart?.products[0]?.selling_price)}
              </span>
            )
          ) : (
            <>
             <span className="cart-pr-price idmembership_plan text-sm">
                  ₹{" "}
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(cart?.instant)}
                </span>
              {/* {(idmembership_plan == undefined || idmembership_plan == 1) && (
                <span className="cart-pr-price idmembership_plan text-sm">
                  ₹{" "}
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(cart?.selling_price)}
                </span>
              )}
              {idmembership_plan == 2 && (
                <div className="flex gap-2">
                  <span className="cart-pr-price idmembership_plan text-sm">
                    ₹{" "}
                    {new Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(cart?.product)}
                  </span>

                  {ReturnPRBadge(
                    idmembership_plan,
                    cart?.mrp,
                    cart?.selling_price,
                    cart?.product,
                    cart?.land,
                    cart?.copartner
                  ) && (
                    <span className="text-xs">
                      (
                      {ReturnPR(
                        idmembership_plan,
                        cart?.mrp,
                        cart?.selling_price,
                        cart?.product,
                        cart?.land,
                        cart?.copartner
                      )}
                      % OFF)
                    </span>
                  )}
                </div>
              )}
              {idmembership_plan == 3 && (
                <span className="cart-pr-price idmembership_plan text-sm">
                  ₹{" "}
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(cart?.land)}
                </span>
              )}
              {idmembership_plan == 4 && (
                <span className="cart-pr-price idmembership_plan text-sm">
                  ₹{" "}
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(cart?.copartner)}
                </span>
              )} */}
            </>
          )}

          {/* MRP */}
          <span className="old-price block m-0 line-through text-xs text-[#adadad] ">
            {/* {cart?.mrp && cart?.mrp > 0 && "₹" + cart?.mrp} */}
            {MrpSameAsSellingPrice(
              idmembership_plan,
              cart?.mrp,
              cart?.selling_price,
              cart?.product,
              cart?.land,
              cart?.copartner
            ) == undefined ||
            MrpSameAsSellingPrice(
              idmembership_plan,
              cart?.mrp,
              cart?.selling_price,
              cart?.product,
              cart?.land,
              cart?.copartner
            ) == false
              ? ""
              : cart?.mrp && cart?.mrp > 0 && "₹" + cart?.mrp}
          </span>
        </div>
      </div>

      <div
        className="add-cart add-cart-2"
        style={{ padding: "7px !important" }}
      >
        {deal
          ? cart?.amount == 0
            ? "FREE"
            : cart.amount
          : quantity &&
            isChecked == false && (
              <>
                {buttonLogin ? (
                  <span className="button text-decoration-none btn-sm flex items-center gap-3 ">
                    <ButtonLoader color={"white"} size={8} />
                  </span>
                ) : (
                  <span className="button text-decoration-none btn-sm flex items-center gap-3">
                    <i
                      className="fa-solid fa-minus mr-1"
                      onClick={() => addtoCart("minus")}
                    ></i>
                    {quantity}
                    <i
                      className="fa-solid fa-plus ml-1"
                      onClick={() => addtoCart("plus")}
                    ></i>
                  </span>
                )}
              </>
            )}
      </div>

      {/*For Checkout Page  */}
      <div className="checkout-cart-qty hidden">
        <span className="text-xs 11">
          {" "}
          {cart?.quantity == undefined
            ? "FREE"
            : cart?.quantity == 0
            ? "FREE"
            : "Qty: " + cart?.quantity}
        </span>
      </div>
    </div>
  );
};
