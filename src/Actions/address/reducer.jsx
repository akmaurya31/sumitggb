import { FETCH_ALL_ADDRESS_REQUEST, FETCH_ALL_ADDRESS_SUCCESS, FETCH_ALL_ADDRESS_FAILURE,FETCH_DATA_ADDRESS_REQUEST, FETCH_DATA_ADDRESS_SUCCESS, FETCH_DATA_ADDRESS_FAILURE,UPDATE_DATA_ADDRESS_REQUEST, UPDATE_DATA_ADDRESS_SUCCESS, UPDATE_DATA_ADDRESS_FAILURE,ADD_ADDRESS_DATA_REQUEST, ADD_ADDRESS_DATA_SUCCESS, ADD_ADDRESS_DATA_FAILURE } from './action';

const initialState = {
  addressData: null,
  loading: false,
  error: null,
};

export const AddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_ADDRESS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ALL_ADDRESS_SUCCESS:
      return { ...state, loading: false, addressData: action.payload };
    case FETCH_ALL_ADDRESS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_DATA_ADDRESS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_DATA_ADDRESS_SUCCESS:
      return { ...state, loading: false, addressData: action.payload };
    case FETCH_DATA_ADDRESS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ADD_ADDRESS_DATA_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_ADDRESS_DATA_SUCCESS:
      return { ...state, loading: false, addaddress: action.payload };
    case ADD_ADDRESS_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_DATA_ADDRESS_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_DATA_ADDRESS_SUCCESS:
      return { ...state, loading: false, updateaddress: action.payload };
    case UPDATE_DATA_ADDRESS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

// export const AddAddressReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_ADDRESS_DATA_REQUEST:
//       return { ...state, loading: true, error: null };
//     case ADD_ADDRESS_DATA_SUCCESS:
//       return { ...state, loading: false, addaddress: action.payload };
//     case ADD_ADDRESS_DATA_FAILURE:
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export const UpdateAddressReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case UPDATE_DATA_ADDRESS_REQUEST:
//       return { ...state, loading: true, error: null };
//     case UPDATE_DATA_ADDRESS_SUCCESS:
//       return { ...state, loading: false, updateaddress: action.payload };
//     case UPDATE_DATA_ADDRESS_FAILURE:
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };