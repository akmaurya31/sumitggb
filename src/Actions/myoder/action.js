import axios from "axios";
import {emptyCart} from '../cart/action'

export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ORDER_FAILURE = "ORDER_FAILURE";


const BASE_URL = process.env.REACT_APP_BASE_URL;

const OrderRequest = () => ({
  type: ORDER_REQUEST,
});

const OrderSuccess = (data) => ({
  type: ORDER_SUCCESS,
  payload: data,
});

const OrderFailure = (error) => ({
  type: ORDER_FAILURE,
  payload: error,
});


export const Order = (endpoint, token, data) => {
  return async (dispatch) => {
    dispatch(OrderRequest());
    try {
      const config = {
        headers: {},
      };

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await axios.post(`${BASE_URL}/${endpoint}`, data, config);
      if(response.data.statusCode==0 && response.data.data.idcustomer_order){
        // remove the cart id and cart object
        dispatch(emptyCart({}));
        if(response.data.data.pay_mode=="cash"){
          dispatch(OrderSuccess(response));
        }else{
          // calling prepare payment apis
          const prepare_payment_response = await axios.get(`${BASE_URL}`+"/api/prepare-payment/"+`${response.data.data.idcustomer_order}`, config);
          dispatch(OrderSuccess(prepare_payment_response));
        }
      }else{
        dispatch(OrderFailure(response.data));
      }
    } catch (error) {
      dispatch(OrderFailure(error));
    }
  };
};

export const SLOTS_REQUEST = "SLOTS_REQUEST";
export const SLOTS_SUCCESS = "SLOTS_SUCCESS";
export const SLOTS_FAILURE = "SLOTS_FAILURE";
export const SLOTS_LOADING_DELAY = 'SLOTS_LOADING_DELAY';

export const Slots = (token, storeid) => {
  return async (dispatch) => {
    dispatch({type: SLOTS_REQUEST});
    try {
      const config = {
        headers: {},
      };

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await axios.get(`${BASE_URL}/api/get-delivery-slots/${storeid}`, config);
      if(response.data.statusCode==0){
        dispatch({
          type: SLOTS_SUCCESS,
          payload: response.data.data,
        });
        setTimeout(() => {
          dispatch({ type: SLOTS_LOADING_DELAY });
        }, 100);
      }else{
        dispatch({
          type: SLOTS_FAILURE,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: SLOTS_FAILURE,
        payload: error.data,
      });
    }
  };
};

export const ORDER_CLEAN = "ORDER_CLEAN";
export const CleanOrder = () => ({
  type: ORDER_CLEAN,
});

export const CONFIRM_ORDER_REQUEST = "CONFIRM_ORDER_REQUEST";
export const CONFIRM_ORDER_SUCCESS = "CONFIRM_ORDER_SUCCESS";
export const CONFIRM_ORDER_FAILURE = "CONFIRM_ORDER_FAILURE";
const ConOrderRequest = () => ({
  type: CONFIRM_ORDER_REQUEST,
});

const ConOrderSuccess = () => ({
  type: CONFIRM_ORDER_SUCCESS,
});

const ConOrderFailure = (error) => ({
  type: CONFIRM_ORDER_FAILURE,
  payload: error,
});


export const ConfirmedOrder = (endpoint, token, data) => {
  return async (dispatch) => {
    dispatch(ConOrderRequest());
    try {
      const config = {
        headers: {},
      };

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await axios.post(`${BASE_URL}/${endpoint}`, data, config);
      // remove the cart id and cart object
      dispatch(emptyCart({}));
      if(response.data.statusCode==0){
        dispatch(ConOrderSuccess());
      }else{
        dispatch(ConOrderFailure(response.data));
      }
    } catch (error) {
      dispatch(ConOrderFailure(error));
    }
  };
};

export const MY_ORDER_REQUEST = "MY_ORDER_REQUEST";
export const MY_ORDER_SUCCESS = "MY_ORDER_SUCCESS";
export const MY_ORDER_FAILURE = "MY_ORDER_FAILURE";


const MyOrderRequest = () => ({
  type: MY_ORDER_REQUEST,
});

const MyOrderSuccess = (data) => ({
  type: MY_ORDER_SUCCESS,
  payload: data,
});

const MyOrderFailure = (error) => ({
  type: MY_ORDER_FAILURE,
  payload: error,
});

export const MyOrderGet = (endpoint, token, valid_from, valid_till) => {

  return async (dispatch) => {
    dispatch(MyOrderRequest());
    try {
      let data = JSON.stringify({
        valid_from: valid_from,
        valid_till: valid_till,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/${endpoint}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      axios
        .request(config)
        .then((response) => {
          dispatch(MyOrderSuccess(response.data));
        })
        .catch((error) => {
          dispatch(MyOrderFailure(error));
        });
    } catch (error) {
      dispatch(MyOrderFailure(error));
    }
  };
};

// Single order detail get
/**For Getting SINGLE_ORDER*/
export const SINGLE_ORDER_REQUEST = "SINGLE_ORDER_REQUEST";
export const SINGLE_ORDER_SUCCESS = "SINGLE_ORDER_SUCCESS";
export const SINGLE_ORDER_FAILURE = "SINGLE_ORDER_FAILURE";

const SingleOrderRequest = () => ({
  type: SINGLE_ORDER_REQUEST,
});

const SingleOrderSuccess = (data) => ({
  type: SINGLE_ORDER_SUCCESS,
  payload: data,
});

const SingleOrderFailure = (error) => ({
  type: SINGLE_ORDER_FAILURE,
  payload: error,
});

export const SingleOrderGet = (endpoint, token, id) => {
  return async (dispatch) => {
    dispatch(SingleOrderRequest());
    try {
      const config = {
        headers: {},
      };

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await axios.get(`${BASE_URL}/${endpoint}/${id}`, config);
      dispatch(SingleOrderSuccess(response.data));
    } catch (error) {
      dispatch(SingleOrderFailure(error));
    }
  };
};
