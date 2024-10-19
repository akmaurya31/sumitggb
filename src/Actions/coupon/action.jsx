// actions.js
import axios from "axios";

export const FETCH_COUPON_REQUEST = "FETCH_COUPON_REQUEST";
export const FETCH_COUPON_SUCCESS = "FETCH_COUPON_SUCCESS";
export const FETCH_COUPON_FAILURE = "FETCH_COUPON_FAILURE";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const fetchCouponDataRequest = () => ({
  type: FETCH_COUPON_REQUEST,
});

const fetchCouponDataSuccess = (data) => ({
  type: FETCH_COUPON_SUCCESS,
  payload: data,
});

const fetchCouponDataFailure = (error) => ({
  type: FETCH_COUPON_FAILURE,
  payload: error,
});

export const fetchCouponData = (endpoint,token,store_id) => {
  return async (dispatch) => {
    dispatch(fetchCouponDataRequest());
    try {
      const config = {
        headers: {},
      };

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await axios.get(
        `${BASE_URL}/${endpoint}/${store_id}`,
        config
      );
      dispatch(fetchCouponDataSuccess(response.data));
    } catch (error) {
      dispatch(fetchCouponDataFailure(error.message));
    }
  };
};
