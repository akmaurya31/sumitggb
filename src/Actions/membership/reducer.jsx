import { FETCH_MEMBERSHIP_REQUEST, FETCH_MEMBERSHIP_SUCCESS, FETCH_MEMBERSHIP_FAILURE, UPDATE_MEMBERSHIP_REQUEST, UPDATE_MEMBERSHIP_SUCCESS, UPDATE_MEMBERSHIP_FAILURE,CURRENT_MEMBERSHIP } from './action';

const initialState = {
  membershipData: null,
  loading: false,
  error: null,
  // changemembership: 1  // mean current membership
};

export const MembershipReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MEMBERSHIP_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_MEMBERSHIP_SUCCESS:
      return { ...state, loading: false, membershipData: action.payload };
    case FETCH_MEMBERSHIP_FAILURE:
      return { ...state, loading: false, error: action.payload };
    // case UPDATE_MEMBERSHIP_REQUEST:
    //   return { ...state, loading: true, error: null };
    // case UPDATE_MEMBERSHIP_SUCCESS:
    //   return { ...state, loading: false, changemembership: action.payload };
    // case UPDATE_MEMBERSHIP_FAILURE:
    //   return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};