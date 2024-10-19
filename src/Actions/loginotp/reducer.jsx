import {
  OTP_LOGIN_REQUEST,
  OTP_LOGIN_SUCCESS,
  OTP_LOGIN_FAILURE,
  OTP_LOGIN_VERIFY_REQUEST,
  OTP_LOGIN_VERIFY_SUCCESS,
  OTP_LOGIN_VERIFY_FAILURE,
  LOGOUT, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE, RESET_PROFILE_DATA,
  UPDATE_MEMBERSHIP_REQUEST, UPDATE_MEMBERSHIP_SUCCESS, UPDATE_MEMBERSHIP_FAILURE,
} from "./action";

const initialState = {
  result: null,
  loading: false,
  error: null,
};

export const LoginOtpReducer = (state = initialState, action) => {
  switch (action.type) {
    case OTP_LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case OTP_LOGIN_SUCCESS:
      return { ...state, loading: false, result: action.payload };
    case OTP_LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const initialVerifyState = {
  verify_result: null,
  verify_loading: false,
  verify_error: null,
  profile: {},
  currentmembership: { idmembership_plan: 1, membership_name: "Instant Discount" },
  msg: null,
};
export const LoginOtpVerifyReducer = (
  verifystate = initialVerifyState,
  action
) => {
  switch (action.type) {
    case OTP_LOGIN_VERIFY_REQUEST:
      return { ...verifystate, verify_loading: true, verify_error: null };
    case OTP_LOGIN_VERIFY_SUCCESS:
      return {
        ...verifystate,
        verify_loading: false,
        verify_result: action.payload,
        profile: { name: action.payload.data?.['user-details']?.name, email: action.payload.data?.['user-details']?.email, contact: action.payload.data?.['user-details']?.contact },
        currentmembership: { idmembership_plan: action.payload.data?.['user-details']?.idmembership_plan, membership_name: action.payload.data?.['user-details']?.membership_type },
        msg: null,
      };
    case OTP_LOGIN_VERIFY_FAILURE:
      return {
        ...verifystate,
        verify_loading: false,
        verify_error: action.payload,
        profile: null,
        currentmembership: { idmembership_plan: 1, membership_name: "Instant Discount" },
        msg: null,
      };
    case LOGOUT:
      return {
        ...verifystate,
        verify_loading: false,
        verify_error: null,
        verify_result: null,
        profile: null,
        currentmembership: { idmembership_plan: 1, membership_name: "Instant Discount" },
        msg: null,
      };
    case UPDATE_PROFILE_REQUEST:
      return { ...verifystate, verify_loading: true, verify_error: null };
    case UPDATE_PROFILE_SUCCESS:
      if (action.payload.data.statusCode == 0) {
        return { ...verifystate, verify_loading: false, profile: action.payload.data.statusCode == 0 ? action.payload.request_data : null, msg: "profile updated successfully" };
      } else {
        return { ...verifystate, verify_loading: false, msg: action.payload.data.message };
      }
    case RESET_PROFILE_DATA:
      return { ...verifystate, verify_loading: false, verify_result: null };
    case UPDATE_PROFILE_FAILURE:
      return { ...verifystate, verify_loading: false, verify_error: action.payload };
    case UPDATE_MEMBERSHIP_REQUEST:
      return { ...verifystate, verify_loading: true, verify_error: null };
    case UPDATE_MEMBERSHIP_SUCCESS:
      if (action.payload.data.statusCode == 0) {
         return { ...verifystate, verify_loading: false, currentmembership: action.payload.data.statusCode == 0 && action.payload.request_data, msg: "Membership changed successfully" };
      } else {
        return { ...verifystate, verify_loading: false, msg: action.payload.data.message };
      }

    case UPDATE_MEMBERSHIP_FAILURE:
      return { ...verifystate, verify_loading: false, verify_error: action.payload };
    default:
      return verifystate;
  }
};