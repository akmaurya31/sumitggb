import {
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAILURE,
} from "./action";

const initialState = {
  category_data: null,
  loading: false,
  error: null,
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CATEGORY_SUCCESS:
      return { ...state, loading: false, category_data: action.payload };
    case FETCH_CATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default CategoryReducer;
