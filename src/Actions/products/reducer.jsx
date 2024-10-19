import {
  PRODUCTS_CATEGORY_REQUEST,
  PRODUCTS_CATEGORY_SUCCESS,
  PRODUCTS_CATEGORY_FAILURE,
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
  CATEGORY_FAILURE,
  PRODUCTS_SEARCH_REQUEST,
  PRODUCTS_SEARCH_SUCCESS,
  PRODUCTS_SEARCH_FAILURE,
  PRODUCTS_PRICE_FAILURE,
  PRODUCTS_PRICE_SUCCESS,
  PRODUCTS_PRICE_REQUEST,
  PRODUCTS_SINGLE_DATA_REQUEST,
  PRODUCTS_SINGLE_DATA_SUCCESS,
  PRODUCTS_SINGLE_DATA_FAILURE,
  PRODUCTS_SEARCH_HISTORY
} from "./action";

const initialProductsCate = {
  product_result: null,
  product_loading: false,
  product_error: null,
};
 

// New 
export const ProductListReducer = (state = initialProductsCate, action) => {
  switch (action.type) {
    case PRODUCTS_CATEGORY_REQUEST:
      return { ...state, product_loading: true, product_error: null,customavi:"avi0" };
    case PRODUCTS_CATEGORY_SUCCESS:
      const { data, pageNo, numberOfPages, totalCount } = action.payload;

      return {
        ...state,
        product_loading: false,
        // product_result: action.payload,
        dataItems: data,
        product_result: pageNo === 1 ? data : [...state.product_result, ...data],
        pageNo: pageNo,
        pageLength: totalCount,
        numberOfPages: numberOfPages,
        customavi:"avi1",
      };
    case PRODUCTS_CATEGORY_FAILURE:
      return {
        ...state,
        product_loading: false,
        product_error: action.payload,
        customavi:"avi2",
      };
    default:
      return state;
  }
};


const initialCategory = {
  category_result: [],
  category_loading: false,
  category_error: null,
};

export const CategoryListReducer = (state = initialCategory, action) => {
  switch (action.type) {
    case CATEGORY_REQUEST:
      return { ...state, category_loading: true, category_error: null };
    case CATEGORY_SUCCESS:
      return {
        ...state,
        category_loading: false,
        category_result: action.payload,
      };
    case CATEGORY_FAILURE:
      return {
        ...state,
        category_loading: false,
        category_error: action.payload,
      };
    default:
      return state;
  }
};

// Search Reducer
const initialSearchData = {
  Search_result: null,
  Search_loading: false,
  Search_error: null,
  search_history:null
};

export const SearchListReducer = (state = initialSearchData, action) => {
  switch (action.type) {
    case PRODUCTS_SEARCH_REQUEST:
      return { ...state, Search_loading: true, Search_error: null };
    case PRODUCTS_SEARCH_SUCCESS:
      return {
        ...state,
        Search_loading: false,
        Search_result: action.payload,
      };
    case PRODUCTS_SEARCH_FAILURE:
      return {
        ...state,
        Search_loading: false,
        Search_error: action.payload,
      };
    case PRODUCTS_SEARCH_HISTORY:
      return {
        ...state,
        search_history:action.payload
      }
    default:
      return state;
  }
};

// PriceWise Product List
export const ProductPriceWiseListReducer = (
  state = initialProductsCate,
  action
) => {
  switch (action.type) {
    case PRODUCTS_PRICE_REQUEST:
      return { ...state, product_loading: true, product_error: null };
    case PRODUCTS_PRICE_SUCCESS:
      return {
        ...state,
        product_loading: false,
        product_result: action.payload,
      };
    case PRODUCTS_PRICE_FAILURE:
      return {
        ...state,
        product_loading: false,
        product_error: action.payload,
      };
    default:
      return state;
  }
};

// **** SINGLE PRODUCT REDUCER *****

export const SingleProductReducer = (state = initialProductsCate, action) => {
  switch (action.type) {
    case PRODUCTS_SINGLE_DATA_REQUEST:
      return { ...state, product_loading: true, product_error: null };
    case PRODUCTS_SINGLE_DATA_SUCCESS:
      return {
        ...state,
        product_loading: false,
        product_result: action.payload,
      };
    case PRODUCTS_SINGLE_DATA_FAILURE:
      return {
        ...state,
        product_loading: false,
        product_error: action.payload,
      };
    default:
      return state;
  }
};
