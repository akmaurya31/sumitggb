// actions.js
import axios from "axios";



const BASE_URL = process.env.REACT_APP_BASE_URL;



export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE";
export const RESET_PROFILE_DATA = "RESET_PROFILE_DATA";

const updateProfileDataRequest = () => ({
  type: UPDATE_PROFILE_REQUEST,
});

const updateProfileDataSuccess = (data,request_data) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: {data,request_data},
});

const resetProfileDataSuccess = (data) => ({
  type: RESET_PROFILE_DATA,
  payload: data,
});

const updateProfileDataFailure = (error) => ({
  type: UPDATE_PROFILE_FAILURE,
  payload: error,
});
export const UpdateProfilePost = (token,endpoint, data) => {
  return async (dispatch) => {
      dispatch(updateProfileDataRequest());
      try {
        const config = {
          headers: {},
        };
  
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        } 
          const response = await axios.post(`${BASE_URL}/${endpoint}`, data, config);
          dispatch(updateProfileDataSuccess(response.data,data));
      } catch (error) {
          dispatch(updateProfileDataFailure(error));
      }
  };
};

export const ResetProfilePost = (data) => {
  return async (dispatch) => {
      dispatch(resetProfileDataSuccess());
  };
};
