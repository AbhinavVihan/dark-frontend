import { Reducer } from "redux";
import {
  FORGOT_PASSWORD_BEGIN,
  LOGGEDIN_PASSWORD_CHANGE_BEGIN,
  LOGGEDIN_PASSWORD_CHANGE_COMPLETED,
  ME_FETCH,
  ME_LOGIN,
  RESET_PASSWORD_COMPLETED,
} from "../actions/action.constants";
import { loggedinResetPasswordBegin } from "../actions/auth.actions";

export interface AuthState {
  _id: string;
  token?: any;
  loading?: boolean;
}

const initialState = {
  _id: "",
  token: 1,
  loading: false,
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
    case LOGGEDIN_PASSWORD_CHANGE_BEGIN:
      return { ...state, loading: true };
    case LOGGEDIN_PASSWORD_CHANGE_COMPLETED:
      return { ...state, loading: false };
    default:
      return state;
  }
};
