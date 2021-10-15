import { Reducer } from "redux";
import { ME_FETCH, ME_LOGIN } from "../actions/action.constants";
import { Customer } from "../models/Customer";
import { addOne, EntityState } from "./entity.reducer";

export interface CustomerState extends EntityState<Customer> {}

const initialState: CustomerState = {
  byId: {},
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
    // return addOne(state, action.payload) as CustomerState;

    default:
      return state;
  }
};
