import {
  FETCH_PASSBOOK_FAILURE,
  FETCH_PASSBOOK_REQUEST,
  FETCH_PASSBOOK_SUCCESS,
} from "./action";

const initialState = {
  passbook: null,
  passbook_loading: false,
  error: null,
};

const PassbookReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PASSBOOK_REQUEST:
      return { ...state, passbook_loading: true, error: null };
    case FETCH_PASSBOOK_SUCCESS:
      return { ...state, passbook_loading: false, passbook: action.payload };
    case FETCH_PASSBOOK_FAILURE:
      return { ...state, passbook_loading: false, error: action.payload };
    default:
      return state;
  }
};

export default PassbookReducer;
