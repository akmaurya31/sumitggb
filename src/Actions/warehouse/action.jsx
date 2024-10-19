// actions.js
import axios from "axios";

export const FETCH_DATA_WAREHOUSE_REQUEST = "FETCH_DATA_WAREHOUSE_REQUEST";
export const FETCH_DATA_WAREHOUSE_SUCCESS = "FETCH_DATA_WAREHOUSE_SUCCESS";
export const FETCH_DATA_WAREHOUSE_FAILURE = "FETCH_DATA_WAREHOUSE_FAILURE";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const fetchDataRequest = () => ({
  type: FETCH_DATA_WAREHOUSE_REQUEST,
});

const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_WAREHOUSE_SUCCESS,
  payload: data,
});

const fetchDataFailure = (error) => ({
  type: FETCH_DATA_WAREHOUSE_FAILURE,
  payload: error,
});

export const fetchWarehouse = (token, latt, lang) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const config = {
        headers: {},
      };

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await axios.get(
        `${BASE_URL}/api/get-stores/${latt}/${lang}`,
        config
      );
      let store_ids = await response.data.data.sort(
        (a, b) => a.distance_in_m - b.distance_in_m
      );

      let jstateids = [{}]; // Initialize jstateids with an empty object
      // jstateids[0].idstore_warehouse = 3; // Now this works
      // Assuming jstateids is already defined as an array of objects
      jstateids[0] = {
        "idstore_warehouse": 3,
        "name": "GGB-Parag",
        "gst": null,
        "bill_header": null,
        "address": "C37, Sec-F Parag , Lucknow 226012",
        "city": "Lucknow",
        "state": 23,
        "pincode": "226012",
        "is_store": 1,
        "warehouse_id": 1,
        "idstore_type": 2,
        "contact": "9129730666",
        "is_copartner": 0,
        "lat": "26.778480",
        "long": "80.904880",
        "service_distance": 2,
        "support_delivery": 1,
        "advance_delivery_day": 4,
        "slot_duration": null,
        "slot_time_start": null,
        "slot_time_end": null,
        "max_orders": null,
        "created_at": "2023-11-03 23:41:26",
        "updated_at": "2024-01-02 15:49:25",
        "created_by": 1,
        "updated_by": 1,
        "status": 1,
        "distance_in_m": 1153.5719153844218
      };


       
      // If store_ids is defined and has elements, assign it to jstateids
      if (store_ids.length > 0) {
        jstateids = store_ids;
      }
      
      await dispatch(fetchDataSuccess(jstateids));
      // await dispatch(fetchDataSuccess(store_ids));
    } catch (error) {
      await dispatch(fetchDataFailure(error.message));
    }
  };
};
