import {
  MY_ORDER_FAILURE, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, SINGLE_ORDER_FAILURE, SINGLE_ORDER_REQUEST, SINGLE_ORDER_SUCCESS, ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAILURE, ORDER_CLEAN, CONFIRM_ORDER_REQUEST, CONFIRM_ORDER_SUCCESS, CONFIRM_ORDER_FAILURE,SLOTS_REQUEST,SLOTS_SUCCESS,SLOTS_FAILURE, SLOTS_LOADING_DELAY
} from "./action";

const initialOrderPlace = {
  order_result: {},
  order_amount: 0,
  order_loading: false,
  order_error: null,
  raz_order_id: null,
  order_status: null,
  message: null,
}
export const Order = (state = initialOrderPlace, action) => {
  switch (action.type) {
    case ORDER_REQUEST:
      return { ...state, order_loading: true, order_error: null };
    case ORDER_CLEAN:
      return { ...state, order_result: {}, order_amount: 0, raz_order_id: null,order_error:null };
    case ORDER_SUCCESS:
      return {
        ...state,
        order_result: action.payload?.data?.data,
        order_amount: action.payload?.data?.data?.pay_mode=="cash" ? action.payload.data.data.total_price : action.payload?.data?.amount,
        raz_order_id: action.payload?.data?.data?.pay_mode=="cash" ? null : action.payload?.data?.online_detail, 
        order_loading: false ,
        message: "Order has been placed successfully",
        order_status: action.payload?.data?.data?.pay_mode=="cash" ? 1 : (action.payload?.data?.data?.payment_complete==0 ? 1 : 0)
      };
    case ORDER_FAILURE:
      return { ...state, order_loading: false, order_error: action.payload };
    case CONFIRM_ORDER_REQUEST:
      return { ...state, order_error: null };
    case CONFIRM_ORDER_SUCCESS:
      return { ...state, order_loading: false, message: "Order has been placed successfully",order_status:1 };
    case CONFIRM_ORDER_FAILURE:
      return { ...state, order_loading: false, message: action.payload ,order_status:0};
    default:
      return state;
  }
};


const initialOrderData = {
  order_result: {
    statusCode: 0,
    message: "Success",
    data: null
  },
  order_loading: false,
  order_error: null,
};
export const MyOrderListReducer = (state = initialOrderData, action) => {
  switch (action.type) {
    case MY_ORDER_REQUEST:
      return { ...state, order_loading: true, order_error: null };
    case MY_ORDER_SUCCESS:
      return {
        ...state,
        order_loading: false,
        order_result: action.payload,
      };
    case MY_ORDER_FAILURE:
      return {
        ...state,
        order_loading: false,
        order_error: action.payload,
      };
    default:
      return state;
  }
};

// single order reducer
export const SingleOrderReducer = (state = initialOrderData, action) => {
  switch (action.type) {
    case SINGLE_ORDER_REQUEST:
      return { ...state, order_loading: true, order_error: null };
    case SINGLE_ORDER_SUCCESS:
      return {
        ...state,
        order_loading: false,
        order_result: action.payload,
      };
    case SINGLE_ORDER_FAILURE:
      return {
        ...state,
        order_loading: false,
        order_error: action.payload,
      };
    default:
      return state;
  }
};

// Slote reducer
const initialSlots = {
  slots:[],
  slots_loading: false,
  slots_error: null,
};
export const Slots = (state = initialSlots, action) => {
  switch (action.type) {
    case SLOTS_REQUEST:
      return { ...state, slots_loading: true };
    case SLOTS_SUCCESS:
     
      return {
        ...state,
        // slots_loading: false,
        slots: action.payload,
      };
      case SLOTS_LOADING_DELAY:
        return {
          ...state,
          slots_loading: false,
        };
    case SLOTS_FAILURE:
      return {
        ...state,
        slots_loading: false,
        slots_error: action.payload,
      };
    default:
      return state;
  }
};
