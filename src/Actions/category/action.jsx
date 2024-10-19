// actions.js
import axios from "axios";

export const FETCH_CATEGORY_REQUEST = "FETCH_CATEGORY_REQUEST";
export const FETCH_CATEGORY_SUCCESS = "FETCH_CATEGORY_SUCCESS";
export const FETCH_CATEGORY_FAILURE = "FETCH_CATEGORY_FAILURE";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const fetchCategoryequest = () => ({
  type: FETCH_CATEGORY_REQUEST,
});

const fetchCategorySuccess = (data) => ({
  type: FETCH_CATEGORY_SUCCESS,
  payload: data,
});

const fetchCategoryFailure = (error) => ({
  type: FETCH_CATEGORY_FAILURE,
  payload: error,
});

export const fetchCategoryList = (token) => {
  return async (dispatch) => {
    dispatch(fetchCategoryequest());
    try {
      const config = {
        headers: {},
      };

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await axios.get(
        `${BASE_URL}/api/cat-sub-list`,
        config
      );
      dispatch(fetchCategorySuccess(response.data));
    } catch (error) {
      dispatch(fetchCategoryFailure(error.message));
    }
  };
};
