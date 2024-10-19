import axios from 'axios';

/**login with Otp */
export const OTP_LOGIN_REQUEST = 'OTP_LOGIN_REQUEST';
export const OTP_LOGIN_SUCCESS = 'OTP_LOGIN_SUCCESS';
export const OTP_LOGIN_FAILURE = 'OTP_LOGIN_FAILURE';

// const BASE_URL = 'http://allwinmedico.in/ggb-api/public';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const LoginOtpRequest = (data) => ({
    type: OTP_LOGIN_REQUEST,
    payload:data
});

const LoginOtpSuccess = (data) => ({
    type: OTP_LOGIN_SUCCESS,
    payload: data,
});

const LoginOtpFailure = (error) => ({
    type: OTP_LOGIN_FAILURE,
    payload: error,
});


export const LoginWithOtpPost = (endpoint, data) => {
    return async (dispatch) => {
        dispatch(LoginOtpRequest());
        try {
            const response = await axios.post(`${BASE_URL}/${endpoint}`, data);
            dispatch(LoginOtpSuccess(response.data));
        } catch (error) {
            dispatch(LoginOtpFailure(error));
        }
    };
};


/**login with Otp Verify*/
export const OTP_LOGIN_VERIFY_REQUEST = 'OTP_LOGIN_VERIFY_REQUEST';
export const OTP_LOGIN_VERIFY_SUCCESS = 'OTP_LOGIN_VERIFY_SUCCESS';
export const OTP_LOGIN_VERIFY_FAILURE = 'OTP_LOGIN_VERIFY_FAILURE';


const LoginOtpVerifyRequest = (data) => ({
    type: OTP_LOGIN_VERIFY_REQUEST,
    payload:data
});

const LoginOtpVerifySuccess = (data) => ({
    type: OTP_LOGIN_VERIFY_SUCCESS,
    payload: data,
});

const LoginOtpVerifyFailure = (error) => ({
    type: OTP_LOGIN_VERIFY_FAILURE,
    payload: error,
});


export const LoginOtpVerifyPost = (endpoint, data) => {
    return async (dispatch) => {
        dispatch(LoginOtpVerifyRequest());
        try {
            const response = await axios.post(`${BASE_URL}/${endpoint}`, data);
            dispatch(LoginOtpVerifySuccess(response.data));
        } catch (error) {
            dispatch(LoginOtpVerifyFailure(error));
        }
    };
};

/**
 * Logout
 */
export const LOGOUT = 'LOGOUT';

export const logout = () => ({
    type: LOGOUT,
  });

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

// membership update actions

export const UPDATE_MEMBERSHIP_REQUEST = "UPDATE_MEMBERSHIP_REQUEST";
export const UPDATE_MEMBERSHIP_SUCCESS = "UPDATE_MEMBERSHIP_SUCCESS";
export const UPDATE_MEMBERSHIP_FAILURE = "UPDATE_MEMBERSHIP_FAILURE";

const updateMembershipDataRequest = () => ({
  type: UPDATE_MEMBERSHIP_REQUEST,
});

const updateMembershipDataSuccess = (data,request_data) => ({
  type: UPDATE_MEMBERSHIP_SUCCESS,
  payload: {data,request_data},
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
          dispatch(updateMembershipDataSuccess(response.data,data));
      } catch (error) {
          dispatch(updateMembershipDataFailure(error));
      }
  };
};