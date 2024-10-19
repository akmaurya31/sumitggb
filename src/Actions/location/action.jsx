import axios from "axios";

export const FETCH_DATA_REQUEST_LOCATION = "FETCH_DATA_REQUEST_LOCATION";
export const FETCH_DATA_SUCCESS_LOCATION = "FETCH_DATA_SUCCESS_LOCATION";
export const FETCH_DATA_FAILURE_LOCATION = "FETCH_DATA_FAILURE_LOCATION";

const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST_LOCATION,
});

const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS_LOCATION,
  payload: data,
});

const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE_LOCATION,
  payload: error,
});

export const storeLocation = (location) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      dispatch(fetchDataSuccess(location));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};

// ****Distance Find Api ******
export const FETCH_DATA_REQUEST_LOCATION_DISTANCE =
  "FETCH_DATA_REQUEST_LOCATION_DISTANCE";
export const FETCH_DATA_SUCCESS_LOCATION_DISTANCE =
  "FETCH_DATA_SUCCESS_LOCATION_DISTANCE";
export const FETCH_DATA_FAILURE_LOCATION_DISTANCE =
  "FETCH_DATA_FAILURE_LOCATION_DISTANCE";

const fetchDistanceDataRequest = () => ({
  type: FETCH_DATA_REQUEST_LOCATION_DISTANCE,
});

const fetchDistanceDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS_LOCATION_DISTANCE,
  payload: data,
});

const fetchDistanceDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE_LOCATION_DISTANCE,
  payload: error,
});
export const fetchLocationDistasnce = (lat, lng) => {
  return async (dispatch) => {
    dispatch(fetchDistanceDataRequest());

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?mode=DRIVING&origin=26.8467,80.9462&destination=${lat},${lng}&sensor=true&units=metric&key=AIzaSyCC3PEezROCu62VElmRZOzDOVGPTMh2rdU`
      );
      dispatch(fetchDistanceDataSuccess(response.data));
    } catch (error) {
      dispatch(fetchDistanceDataFailure(error.message));
    }
  };
};

// ****Delivery Time Action ******
export const FETCH_DELIVERY_REQUEST_LOCATION =
  "FETCH_DELIVERY_REQUEST_LOCATION";
export const FETCH_DELIVERY_SUCCESS_LOCATION =
  "FETCH_DELIVERY_SUCCESS_LOCATION";
export const FETCH_DELIVERY_FAILURE_LOCATION =
  "FETCH_DELIVERY_FAILURE_LOCATION";

const fetchDeliveryDataRequest = () => ({
  type: FETCH_DELIVERY_REQUEST_LOCATION,
});

const fetchDeliveryDataSuccess = (data) => ({
  type: FETCH_DELIVERY_SUCCESS_LOCATION,
  payload: data,
});

const fetchDeliveryDataFailure = (error) => ({
  type: FETCH_DELIVERY_FAILURE_LOCATION,
  payload: error,
});

export const storeDileverySlots = (location,slotsId) => {
  
  return async (dispatch) => {
    dispatch(fetchDeliveryDataRequest());
    try {
      dispatch(fetchDeliveryDataSuccess(location));
    } catch (error) {
      dispatch(fetchDeliveryDataFailure(error.message));
    }
  };
};
