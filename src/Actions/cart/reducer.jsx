import {
  ADD_CART_REQUEST,
  ADD_CART_SUCCESS,
  ADD_CART_FAILURE,
  REMOVE_CART_REQUEST,
  REMOVE_CART_SUCCESS,
  REMOVE_CART_FAILURE,
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAILURE,
  EMPTY_CART_FAILURE,
} from "./action";

const initialState = {
  cart_result: [],
  fetch_cart: [],
  cart_error: null,
  cart_id: null,
  msg: null,


};

export const CartReducer = (state = initialState, action) => {
  const cart_result = state.cart_result;
  const fetch_cart = state.fetch_cart;
  switch (action.type) {
    case FETCH_CART_REQUEST:
      return { ...state, cart_error: null, };
    case FETCH_CART_SUCCESS:
      return {
        ...state,
        msg: action.payload.message,
        fetch_cart: action.payload,

      };
    case FETCH_CART_FAILURE:
      return { ...state, cart_error: action.payload, };
    case ADD_CART_REQUEST:
      return { ...state, cart_error: null };
    case ADD_CART_SUCCESS:
      return {
        ...state,
        msg: action.payload.response_data.message,
        cart_id: action.payload.request_data.cart_id,
        cart_result:
          action.payload.response_data.statusCode == 0
            ? action.payload.cart_data
            : cart_result,
      };
    case ADD_CART_FAILURE:
      return { ...state, cart_error: action.payload };
    case REMOVE_CART_REQUEST:
      return { ...state, cart_error: null };
    case REMOVE_CART_SUCCESS:
      return {
        ...state,
        msg: action.payload.response_data.message,
        cart_id:
          action.payload.response_data.statusCode == 0 &&
            action.payload.cart_data.length == 0
            ? null
            : action.payload.request_data.cart_id,
        cart_result:
          action.payload.response_data.statusCode == 0 &&
            action.payload.cart_data
            ? action.payload.cart_data
            : cart_result,
        fetch_cart:
          action.payload.response_data.statusCode == 0 &&
            action.payload.cart_data.length == 0
            ? {}
            : fetch_cart,
      };
    case REMOVE_CART_FAILURE:
      return { ...state, cart_error: action.payload };
    case EMPTY_CART_FAILURE:
      return {
        ...state,
        msg: null,
        cart_id: null,
        cart_result: [],
        fetch_cart: [],
      };
    default:
      return state;
  }
};
