// actions.js
import axios from "axios";

export const FETCH_DATA_ADDRESS_REQUEST = "FETCH_DATA_ADDRESS_REQUEST";
export const FETCH_DATA_ADDRESS_SUCCESS = "FETCH_DATA_ADDRESS_SUCCESS";
export const FETCH_DATA_ADDRESS_FAILURE = "FETCH_DATA_ADDRESS_FAILURE";

const BASE_URL = process.env.REACT_APP_BASE_URL;
// const BASE_URL = http://allwinmedico.in/ggb-api/public;

export const FETCH_ALL_ADDRESS_REQUEST = "FETCH_ALL_ADDRESS_REQUEST";
export const FETCH_ALL_ADDRESS_SUCCESS = "FETCH_ALL_ADDRESS_SUCCESS";
export const FETCH_ALL_ADDRESS_FAILURE = "FETCH_ALL_ADDRESS_FAILURE";

const fetchAllAddressRequest = () => ({
  type: FETCH_ALL_ADDRESS_REQUEST,
});

const fetchAllAddressSuccess = (data) => ({
  type: FETCH_ALL_ADDRESS_SUCCESS,
  payload: data,
});

const fetchAllAddressFailure = (error) => ({
  type: FETCH_ALL_ADDRESS_FAILURE,
  payload: error,
});

export const fetchAllAddressData = (token,endpoint) => {
 
  return async (dispatch) => {
    dispatch(fetchAllAddressRequest());
    try {
      const config = {
        headers: {},
      };

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await axios.get(`${BASE_URL}/api/${endpoint}`, config);
      dispatch(fetchAllAddressSuccess(response.data));
    } catch (error) {
      dispatch(fetchAllAddressFailure(error.message));
    }
  };
};


const fetchDataRequest = () => ({
  type: FETCH_DATA_ADDRESS_REQUEST,
});

const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_ADDRESS_SUCCESS,
  payload: data,
});

const fetchDataFailure = (error) => ({
  type: FETCH_DATA_ADDRESS_FAILURE,
  payload: error,
});

//  I think this is not in used
export const fetchAddressData = (token,endpoint,id) => {
 
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const config = {
        headers: {},
      };

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await axios.get(`${BASE_URL}/api/${endpoint}/${id}`, config);
      dispatch(fetchDataSuccess(response.data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};

export const ADD_ADDRESS_DATA_REQUEST = "ADD_ADDRESS_DATA_REQUEST";
export const ADD_ADDRESS_DATA_SUCCESS = "ADD_ADDRESS_DATA_SUCCESS";
export const ADD_ADDRESS_DATA_FAILURE = "ADD_ADDRESS_DATA_FAILURE";

const postDataRequest = () => ({
  type: ADD_ADDRESS_DATA_REQUEST,
});

const postDataSuccess = (data) => ({
  type: ADD_ADDRESS_DATA_SUCCESS,
  payload: data,
});

const postDataFailure = (error) => ({
  type: ADD_ADDRESS_DATA_FAILURE,
  payload: error,
});
export const AddressPost = (token,endpoint, data) => {
  return async (dispatch) => {
      dispatch(postDataRequest());
      try {
        const config = {
          headers: {},
        };
  
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
          const response = await axios.post(`${BASE_URL}/${endpoint}`, data, config);
          dispatch(postDataSuccess(response.data));
      } catch (error) {
          dispatch(postDataFailure(error));
      }
  };
};

export const UPDATE_DATA_ADDRESS_REQUEST = "UPDATE_DATA_ADDRESS_REQUEST";
export const UPDATE_DATA_ADDRESS_SUCCESS = "UPDATE_DATA_ADDRESS_SUCCESS";
export const UPDATE_DATA_ADDRESS_FAILURE = "UPDATE_DATA_ADDRESS_FAILURE";

const updateDataRequest = () => ({
  type: UPDATE_DATA_ADDRESS_REQUEST,
});

const updateDataSuccess = (data) => ({
  type: UPDATE_DATA_ADDRESS_SUCCESS,
  payload: data,
});

const updateDataFailure = (error) => ({
  type: UPDATE_DATA_ADDRESS_FAILURE,
  payload: error,
});
export const updateAddressPost = (token,endpoint, data) => {
  return async (dispatch) => {
      dispatch(updateDataRequest());
      try {
        const config = {
          headers: {},
        };
  
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
          const response = await axios.patch(`${BASE_URL}/${endpoint}/${data.id}`, data, config);
          dispatch(updateDataSuccess(response.data));
      } catch (error) {
          dispatch(updateDataFailure(error));
      }
  };
};