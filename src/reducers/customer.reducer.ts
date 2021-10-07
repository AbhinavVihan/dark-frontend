import { Reducer } from "redux";
import { ME_FETCH, ME_LOGIN } from "../actions/auth.actions";
import { Customer } from "../models/Customer";

export interface CustomerState {
  byId: {
    [_id: string]: Customer;
  };
}

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

    default:
      return state;
  }
};
