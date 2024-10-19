import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

/**FOR PRODUCT  List*/
export const PRODUCTS_CATEGORY_REQUEST = "PRODUCTS_CATEGORY_REQUEST";
export const PRODUCTS_CATEGORY_SUCCESS = "PRODUCTS_CATEGORY_SUCCESS";
export const PRODUCTS_CATEGORY_FAILURE = "PRODUCTS_CATEGORY_FAILURE";

const productCategoryRequest = () => ({
  type: PRODUCTS_CATEGORY_REQUEST,
});

const productCategorySuccess = (data) => ({
  type: PRODUCTS_CATEGORY_SUCCESS,
  payload: data,
});

const productCategoryFailure = (error) => ({
  type: PRODUCTS_CATEGORY_FAILURE,
  payload: error,
});

export const productCategoryGet33 = (from,endpoint, id, token, storeid) => {
  return async (dispatch) => {
    dispatch(productCategoryRequest());
    try {
      const config = {
        headers: {},
      };

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await axios.get(
        `${BASE_URL}/${endpoint}/${storeid}/${id}`,
        config
      );
      dispatch(productCategorySuccess(response.data));
    } catch (error) {
      dispatch(productCategoryFailure(error));
    }
  };
};


export const productCategoryGet = (from,endpoint, catLvL, token, storeid) => {
  return async (dispatch) => {
    dispatch(productCategoryRequest());
    try {
      const config = {
        headers: {},
      };
      if(storeid<=0 || storeid===null){
        storeid=3
      }

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await axios.get(
        `${BASE_URL}/${endpoint}/${storeid}/${catLvL}`,
        config
      );
      dispatch(productCategorySuccess(response.data));
    } catch (error) {
      dispatch(productCategoryFailure(error));
    }
  };
};


/**For Getting CATEGORY*/
export const CATEGORY_REQUEST = "CATEGORY_REQUEST";
export const CATEGORY_SUCCESS = "CATEGORY_SUCCESS";
export const CATEGORY_FAILURE = "CATEGORY_FAILURE";

const categoryRequest = () => ({
  type: CATEGORY_REQUEST,
});

const categorySuccess = (data) => ({
  type: CATEGORY_SUCCESS,
  payload: data,
});

const categoryFailure = (error) => ({
  type: CATEGORY_FAILURE,
  payload: error,
});

export const categoryGet = (from,endpoint, id, token) => {
  return async (dispatch) => {
    dispatch(categoryRequest());
    try {
      const config = {
        headers: {},
      };

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await axios.get(`${BASE_URL}/${endpoint}/${id}`, config);
      dispatch(categorySuccess(response.data));
    } catch (error) {
      dispatch(categoryFailure(error));
    }
  };
};

/**FOR PRODUCT  Search List*/
export const PRODUCTS_SEARCH_REQUEST = "PRODUCTS_SEARCH_REQUEST";
export const PRODUCTS_SEARCH_SUCCESS = "PRODUCTS_SEARCH_SUCCESS";
export const PRODUCTS_SEARCH_FAILURE = "PRODUCTS_SEARCH_FAILURE";

const productSearchRequest = () => ({
  type: PRODUCTS_SEARCH_REQUEST,
});

const productSearchSuccess = (data) => ({
  type: PRODUCTS_SEARCH_SUCCESS,
  payload: data,
});

const productSearchFailure = (error) => ({
  type: PRODUCTS_SEARCH_FAILURE,
  payload: error,
});

export const productSearchGet = (endpoint, SearchValue, token, storeid) => {
  return async (dispatch) => {
    dispatch(productSearchRequest());
    try {
      const config = {
        headers: {},
      };

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await axios.get(
        `${BASE_URL}/${endpoint}/${storeid}/${SearchValue}`,
        config
      );
      dispatch(productSearchSuccess(response.data,SearchValue));
    } catch (error) {
      dispatch(productSearchFailure(error));
    }
  };
};

/**FOR PRODUCT  Search History*/
export const PRODUCTS_SEARCH_HISTORY = "PRODUCTS_SEARCH_HISTORY";
export const SearchHistory = (data) => ({
  type: PRODUCTS_SEARCH_HISTORY,
  payload: data,
});

/**FOR PRODUCT  Price wise List*/
export const PRODUCTS_PRICE_REQUEST = "PRODUCTS_PRICE_REQUEST";
export const PRODUCTS_PRICE_SUCCESS = "PRODUCTS_PRICE_SUCCESS";
export const PRODUCTS_PRICE_FAILURE = "PRODUCTS_PRICE_FAILURE";

const productPriceRequest = () => ({
  type: PRODUCTS_PRICE_REQUEST,
});

const productPriceSuccess = (data) => ({
  type: PRODUCTS_PRICE_SUCCESS,
  payload: data,
});

const productPriceFailure = (error) => ({
  type: PRODUCTS_PRICE_FAILURE,
  payload: error,
});

export const productPriceGet = (endpoint, token, storeid, priceValue) => {
  return async (dispatch) => {
    dispatch(productPriceRequest());
    try {
      let data = JSON.stringify({
        minAmount: 0,
        maxAmount: priceValue,
        store_id: storeid,
        search_by: "",
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/${endpoint}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      axios
        .request(config)
        .then((response) => {
          dispatch(productPriceSuccess(response.data));
        })
        .catch((error) => {
          dispatch(productPriceFailure(error));
        });
    } catch (error) {
      dispatch(productPriceFailure(error));
    }
  };
};

// Single PRODUCT data

export const PRODUCTS_SINGLE_DATA_REQUEST = "PRODUCTS_SINGLE_DATA_REQUEST";
export const PRODUCTS_SINGLE_DATA_SUCCESS = "PRODUCTS_SINGLE_DATA_SUCCESS";
export const PRODUCTS_SINGLE_DATA_FAILURE = "PRODUCTS_SINGLE_DATA_FAILURE";

const productPriceSingleDataRequest = () => ({
  type: PRODUCTS_SINGLE_DATA_REQUEST,
});

const productPriceSingleDataSuccess = (data) => ({
  type: PRODUCTS_SINGLE_DATA_SUCCESS,
  payload: data,
});

const productPriceSingleDataFailure = (error) => ({
  type: PRODUCTS_SINGLE_DATA_FAILURE,
  payload: error,
});
// export const productSingleDataGet=(endpoint,storeid, id)=>{
//   return async(dispatch)=>{
//     dispatch(productPriceSingleDataRequest());
//     const requestOptions = {
//       method: "GET",
//       redirect: "follow"
//     };
    
//     fetch("http://allwinmedico.in/ggb-api/public/api/product-details/"+storeid+"/"+id+"", requestOptions)
//       .then((response) => response.json())
//       .then((result) => dispatch(productPriceSingleDataSuccess(result)))
//       .catch((error) => console.error(error));
//   }
// }
export const productSingleDataGet = (endpoint, token, storeid, id) => {
  return async (dispatch) => {
    dispatch(productPriceSingleDataRequest());
    try {
      const config = {
        headers: {},
      };

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await axios.get(
        `${BASE_URL}/${endpoint}/${storeid}/${id}`,
        config
      );
      dispatch(productPriceSingleDataSuccess(response.data));
    } catch (error) {
      dispatch(productPriceSingleDataFailure(error));
    }
  };
};