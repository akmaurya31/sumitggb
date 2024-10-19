import { FETCH_DATA_WAREHOUSE_FAILURE, FETCH_DATA_WAREHOUSE_REQUEST, FETCH_DATA_WAREHOUSE_SUCCESS } from './action';

const initialState = {
  warehouseData: [],
  loading: false,
  error: null,
};

const WarehouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_WAREHOUSE_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_DATA_WAREHOUSE_SUCCESS:
      return { ...state, loading: false, warehouseData: action.payload };
    case FETCH_DATA_WAREHOUSE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default WarehouseReducer;