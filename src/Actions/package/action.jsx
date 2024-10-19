// actions.js
import axios from "axios";

export const FETCH_PACKAGE_REQUEST = "FETCH_PACKAGE_REQUEST";
export const FETCH_PACKAGE_SUCCESS = "FETCH_PACKAGE_SUCCESS";
export const FETCH_PACKAGE_FAILURE = "FETCH_PACKAGE_FAILURE";
export const APPLY_PACKAGE = "APPLY_PACKAGE";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const fetchPackageDataRequest = () => ({
  type: FETCH_PACKAGE_REQUEST,
});

const fetchPackageDataSuccess = (data) => ({
  type: FETCH_PACKAGE_SUCCESS,
  payload: data,
});

const fetchPackageDataFailure = (error) => ({
  type: FETCH_PACKAGE_FAILURE,
  payload: error,
});

export const fetchPackageData = (token, endpoint, store_id) => {
  return async (dispatch) => {
    dispatch(fetchPackageDataRequest());
    try {
      const config = {
        headers: {},
      };

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await axios.get(
        `${BASE_URL}/${endpoint}/${store_id}`,
        config
      );
      dispatch(fetchPackageDataSuccess(response.data));
    } catch (error) {
      dispatch(fetchPackageDataFailure(error.message));
    }
  };
};

export const appliedPackage = (package_id) => ({
  type: APPLY_PACKAGE,
  payload: package_id,
});