import { applyMiddleware, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import DashboardReducer from "./dashboard/reducer";
import { LoginOtpReducer, LoginOtpVerifyReducer } from "./loginotp/reducer";
import {
  ProductListReducer,
  CategoryListReducer,
  SearchListReducer,
  ProductPriceWiseListReducer,
  SingleProductReducer,
} from "./products/reducer";
import WarehouseReducer from "./warehouse/reducer";
//import {ProfileReducer} from './profile/reducer';
import { LocationReducer, DistanceReducer,DeliveryReducer } from "./location/reducer";
import { CartReducer } from "./cart/reducer";
import { AddressReducer } from "./address/reducer";
import { MembershipReducer } from "./membership/reducer";
import { PackageReducer
  // ,ApplyPackageReducer
 } from "./package/reducer";
import {
  MyOrderListReducer,
  SingleOrderReducer,
  Order,Slots
} from "./myoder/reducer";
import PassbookReducer from "./passbook/reducer";
import CategoryReducer from './category/reducer'
import {CouponReducer} from './coupon/reducer'

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  DashboardReducer,
  LoginOtpReducer,
  LoginOtpVerifyReducer,
  WarehouseReducer,
  ProductListReducer,
  LocationReducer,
  CartReducer,
  AddressReducer,
  MembershipReducer,
  SearchListReducer,
  ProductPriceWiseListReducer,
  PackageReducer,
  // ApplyPackageReducer,
  Order,
  MyOrderListReducer,
  SingleOrderReducer,
  Slots,
  SingleProductReducer,
  DistanceReducer,
  PassbookReducer,
  DeliveryReducer,
  CategoryReducer,
  CategoryListReducer,
  CouponReducer
});
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  applyMiddleware: applyMiddleware([thunk]),
});

export const persistor = persistStore(store);
