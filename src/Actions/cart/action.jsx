import axios from "axios";

/**Cart */
export const ADD_CART_REQUEST = "ADD_CART_REQUEST";
export const ADD_CART_SUCCESS = "ADD_CART_SUCCESS";
export const ADD_CART_FAILURE = "ADD_CART_FAILURE";
export const REMOVE_CART_REQUEST = "REMOVE_CART_REQUEST";
export const REMOVE_CART_SUCCESS = "REMOVE_CART_SUCCESS";
export const REMOVE_CART_FAILURE = "REMOVE_CART_FAILURE";
export const FETCH_CART_REQUEST = "FETCH_CART_REQUEST";
export const FETCH_CART_SUCCESS = "FETCH_CART_SUCCESS";
export const FETCH_CART_FAILURE = "FETCH_CART_FAILURE";
export const EMPTY_CART_FAILURE = "EMPTY_CART_FAILURE";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const AddCartPost = (endpoint, data, cart_data, token) => {
  return async (dispatch) => {
    dispatch({
      type: ADD_CART_REQUEST,
      payload: data,
    });
    try {
      const config = {
        headers: {},
      };

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await axios.post(
        `${BASE_URL}/${endpoint}`,
        data,
        // config
      );
      dispatch({
        type: ADD_CART_SUCCESS,
        payload: {
          request_data: data,
          response_data: response.data,
          cart_data: cart_data,
        },
      });
      if (response?.data?.statusCode === 1) {
        dispatch({
          type: ADD_CART_FAILURE,
          payload: response?.data?.message,
        });
      }
    } catch (error) {
      dispatch({
        type: ADD_CART_FAILURE,
        payload: error,
      });
    }
  };
};

export const RemoveCartPost = (endpoint, data, cart_data, token) => {
  return async (dispatch) => {
    dispatch({
      type: REMOVE_CART_REQUEST,
      payload: data,
    });
    try {
      const config = {
        headers: {},
      };

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await axios.post(
        `${BASE_URL}/${endpoint}`,
        data,
        // config
      );
      if (response.data.statusCode == 0) {
        dispatch({
          type: REMOVE_CART_SUCCESS,
          payload: {
            request_data: data,
            response_data: response.data,
            cart_data: cart_data,
          },
        });
      } else {
        dispatch({
          type: REMOVE_CART_FAILURE,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: REMOVE_CART_FAILURE,
        payload: error,
      });
    }
  };
};

export const FetchCartPost = (endpoint, data, token) => {

  return async (dispatch) => {
    dispatch({
      type: FETCH_CART_REQUEST,
      payload: data,
    });
    try {
      const config = {
        headers: {},
      };

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await axios.post(
        `${BASE_URL}/${endpoint}`,
        data,
        // config
      );
      if(response?.data && response.data.statusCode==1){
        dispatch(emptyCart());
      }else{
        dispatch({
          type: FETCH_CART_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_CART_FAILURE,
        payload: error,
      });
    }
  };
};

export const emptyCart = () => ({
  type: EMPTY_CART_FAILURE,
});
