import {
  FETCH_PACKAGE_FAILURE,
  FETCH_PACKAGE_REQUEST,
  FETCH_PACKAGE_SUCCESS,
  APPLY_PACKAGE
} from "./action";

const initialState = {
  package_data: null,
  package_loading: false,
  package_id:0,
  error: null,
};

export const PackageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PACKAGE_REQUEST:
      return { ...state, package_loading: true, error: null };
    case FETCH_PACKAGE_SUCCESS:
      return { ...state, package_loading: false, package_data: action.payload };
    case FETCH_PACKAGE_FAILURE:
      return { ...state, package_loading: false, error: action.payload };
    case APPLY_PACKAGE:
      return { ...state, package_id: action.payload };
    default:
      return state;
  }
};

// export const ApplyPackageReducer = (state = { package_id: null }, action) => {
//   switch (action.type) {
//     case APPLY_PACKAGE:
//       return { ...state, package_id: action.payload };
//     default:
//       return state;
//   }
// };
