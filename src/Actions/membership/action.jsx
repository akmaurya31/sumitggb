// actions.js
import axios from "axios";

export const FETCH_MEMBERSHIP_REQUEST = "FETCH_MEMBERSHIP_REQUEST";
export const FETCH_MEMBERSHIP_SUCCESS = "FETCH_MEMBERSHIP_SUCCESS";
export const FETCH_MEMBERSHIP_FAILURE = "FETCH_MEMBERSHIP_FAILURE";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const fetchMembershipDataRequest = () => ({
  type: FETCH_MEMBERSHIP_REQUEST,
});

const fetchMembershipDataSuccess = (data) => ({
  type: FETCH_MEMBERSHIP_SUCCESS,
  payload: data,
});

const fetchMembershipDataFailure = (error) => ({
  type: FETCH_MEMBERSHIP_FAILURE,
  payload: error,
});

export const fetchMembershipData = (token,endpoint) => {
 
  return async (dispatch) => {
    dispatch(fetchMembershipDataRequest());
    try {
      const config = {
        headers: {},
      };

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await axios.get(`${BASE_URL}/api/${endpoint}`, config);
      dispatch(fetchMembershipDataSuccess(response.data));
    } catch (error) {
      dispatch(fetchMembershipDataFailure(error.message));
    }
  };
};

export const UPDATE_MEMBERSHIP_REQUEST = "UPDATE_MEMBERSHIP_REQUEST";
export const UPDATE_MEMBERSHIP_SUCCESS = "UPDATE_MEMBERSHIP_SUCCESS";
export const UPDATE_MEMBERSHIP_FAILURE = "UPDATE_MEMBERSHIP_FAILURE";

const updateMembershipDataRequest = () => ({
  type: UPDATE_MEMBERSHIP_REQUEST,
});

const updateMembershipDataSuccess = (data) => ({
  type: UPDATE_MEMBERSHIP_SUCCESS,
  payload: data,
});

const updateMembershipDataFailure = (error) => ({
  type: UPDATE_MEMBERSHIP_FAILURE,
  payload: error,
});
export const updateMembershipPost = (token,endpoint, data) => {
  return async (dispatch) => {
      dispatch(updateMembershipDataRequest());
      try {
        const config = {
          headers: {},
        };
  
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
          const response = await axios.post(`${BASE_URL}/${endpoint}`, data, config);
          dispatch(updateMembershipDataSuccess(response.data));
      } catch (error) {
          dispatch(updateMembershipDataFailure(error));
      }
  };
};