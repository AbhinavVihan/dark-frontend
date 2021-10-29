import { Reducer } from "redux";
import {
  FORGOT_PASSWORD_BEGIN,
  ME_FETCH,
  ME_LOGIN,
  RESET_PASSWORD_COMPLETED,
} from "../actions/action.constants";

export interface AuthState {
  _id: string;
  token?: any;
}

const initialState = {
  _id: "",
  token: 1,
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
    case FORGOT_PASSWORD_BEGIN:
      return { ...state, token: action.payload.token };
    case RESET_PASSWORD_COMPLETED:
      return { ...state, token: 1 };
    default:
      return state;
  }
};
