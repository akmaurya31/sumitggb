import {
  FETCH_DATA_FAILURE_LOCATION,
  FETCH_DATA_FAILURE_LOCATION_DISTANCE,
  FETCH_DATA_REQUEST_LOCATION,
  FETCH_DATA_REQUEST_LOCATION_DISTANCE,
  FETCH_DATA_SUCCESS_LOCATION,
  FETCH_DATA_SUCCESS_LOCATION_DISTANCE,
  FETCH_DELIVERY_FAILURE_LOCATION,
  FETCH_DELIVERY_REQUEST_LOCATION,
  FETCH_DELIVERY_SUCCESS_LOCATION,
} from "./action";

const initialState = {
  location: null,
  loading: false,
  error: null,
};
const initialDistanceState = {
  location_distance: null,
  loading: false,
  error: null,
};
const initialDilevryState = {
  Dilevery_location: null,
  slots_Id:null,
  loading: false,
  error: null,
};

export const LocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST_LOCATION:
      return { ...state, loading: true, error: null };
    case FETCH_DATA_SUCCESS_LOCATION:
      return { ...state, loading: false, location: action.payload };
    case FETCH_DATA_FAILURE_LOCATION:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export const DistanceReducer = (state = initialDistanceState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST_LOCATION_DISTANCE:
      return { ...state, loading: true, error: null };
    case FETCH_DATA_SUCCESS_LOCATION_DISTANCE:
      return { ...state, loading: false, location_distance: action.payload };
    case FETCH_DATA_FAILURE_LOCATION_DISTANCE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DeliveryReducer = (state = initialDilevryState, action) => {
  
  switch (action.type) {
    case FETCH_DELIVERY_REQUEST_LOCATION:
      return { ...state, loading: true, error: null };
    case FETCH_DELIVERY_SUCCESS_LOCATION:
      return { ...state, loading: false, Dilevery_location: action.payload };
    case FETCH_DELIVERY_FAILURE_LOCATION:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
