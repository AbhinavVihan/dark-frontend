import { Reducer } from "redux";
import { ME_FETCH, ME_LOGIN } from "../actions/auth.actions";

export interface AuthState {
  _id: string;
}

const initialState = {
  _id: "",
};

export const authReducer: Reducer<AuthState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ME_LOGIN:
    case ME_FETCH:
      const customerId = action.payload._id as string;
      return { ...state, _id: customerId };
    default:
      return state;
  }
};
