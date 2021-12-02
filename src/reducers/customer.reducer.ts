import { Reducer } from "redux";
import {
  GET_CUSTOMER_COMPLETE,
  ME_FETCH,
  ME_LOGIN,
  MY_ORDERS_BEGIN,
  MY_ORDERS_COMPLETED,
  RETAILOR_LOGIN_BEGIN,
  RETAILOR_LOGIN_COMPLETE,
  RETAILOR_LOGIN_ERROR,
  RETAIOR_ALL_ORDERS_BEGIN,
  RETAIOR_ALL_ORDERS_COMPLETED,
} from "../actions/action.constants";
import { Customer } from "../models/Customer";
import { Order } from "../models/Order";
import { Product } from "../models/Products";
import { EntityState, initialEntityState } from "./entity.reducer";

export interface CustomerState extends EntityState<Customer> {
  retailorById: { [id: string]: Customer };
  retailorSelectedId: string;
  orderArray: string[];
  orders: { [id: string]: Product };
  retailorAllOrders: { [id: string]: Order };
  retailorAllOrderIds: string[];
  customer: { [id: string]: Customer };
  cId: string;
}

const initialState: CustomerState = {
  ...initialEntityState,
  retailorById: {},
  retailorSelectedId: "",
  orderArray: [],
  orders: {},
  retailorAllOrders: {},
  retailorAllOrderIds: [],
  customer: {},
  cId: "",
};

export const customerReducer: Reducer<CustomerState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ME_FETCH:
    case ME_LOGIN:
      const customer: Customer = action.payload;
      return {
        ...state,
        byId: { ...state.byId, [customer._id]: customer },
      };
    // case RETAILOR_LOGIN_BEGIN:
    //   return { ...state, loadingOne: true };
    case RETAILOR_LOGIN_COMPLETE:
      const Customer: Customer = action.payload;

      return {
        ...state,
        byId: { ...state.byId, [Customer._id]: Customer },
        loadingOne: false,
      };
    case RETAILOR_LOGIN_BEGIN:
      return {
        ...state,
        retailorById: { [action.payload._id]: action.payload },
        retailorSelectedId: action.payload._id,
      };
    case RETAILOR_LOGIN_ERROR:
      return { ...state, errorOne: action.payload };
    // return addOne(state, action.payload) as CustomerState;
    case MY_ORDERS_BEGIN: {
      return { ...state, loadingOne: true };
    }
    case MY_ORDERS_COMPLETED:
      const orders = action.payload as Product[];
      const orderMap = orders.reduce((prev, order) => {
        return { ...prev, [order._id]: order };
      }, {});
      // console.log(orderMap);
      return {
        ...state,
        orderArray: action.payload.map((o: any) => o._id),
        orders: { ...state.orders, ...orderMap },
        loadingOne: false,
      };
    case RETAIOR_ALL_ORDERS_BEGIN:
      return { ...state, loadingList: true };
    case RETAIOR_ALL_ORDERS_COMPLETED:
      const order = action.payload as Order[];
      const orderMaps = order.reduce((prev, order) => {
        return { ...prev, [order._id]: order };
      }, {});

      return {
        ...state,
        retailorAllOrderIds: action.payload.map((o: any) => o._id),
        retailorAllOrders: {
          ...state.retailorAllOrders,
          ...orderMaps,
        },
        loadingList: false,
      };
    // case GET_CUSTOMER_COMPLETE:
    //   return {
    //     ...state,
    //     customer: { [action.payload.id]: action.payload },
    //     cId: action.payload.id,
    //   };
    default:
      return state;
  }
};
