import {
 
  FETCH_COUPON_FAILURE,
  FETCH_COUPON_REQUEST,
  FETCH_COUPON_SUCCESS,
} from "./action";

const initialState = {
  Coupon_data: null,
  Coupon_loading: false,
   error: null,
};

export const CouponReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUPON_REQUEST:
      return { ...state, Coupon_loading: true, error: null };
    case FETCH_COUPON_SUCCESS:
      return { ...state, Coupon_loading: false, Coupon_data: action.payload };
    case FETCH_COUPON_FAILURE:
      return { ...state, Coupon_loading: false, error: action.payload };
  
    default:
      return state;
  }
};
