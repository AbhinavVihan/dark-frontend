import { Reducer } from "redux";
import {
  ME_FETCH,
  ME_LOGIN,
  RETAILOR_LOGIN,
  RETAILOR_LOGIN_ERROR,
} from "../actions/action.constants";
import { Customer } from "../models/Customer";
import { EntityState, initialEntityState } from "./entity.reducer";

export interface CustomerState extends EntityState<Customer> {
  retailorById: { [id: string]: Customer };
  retailorSelectedId: string;
}

const initialState: CustomerState = {
  ...initialEntityState,
  retailorById: {},
  retailorSelectedId: "",
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
    case RETAILOR_LOGIN:
      return {
        ...state,
        retailorById: { [action.payload._id]: action.payload },
        retailorSelectedId: action.payload._id,
      };
    case RETAILOR_LOGIN_ERROR:
      return { ...state, errorOne: action.payload };
    // return addOne(state, action.payload) as CustomerState;

    default:
      return state;
  }
};
