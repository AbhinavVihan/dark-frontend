import { Reducer } from "redux";
import {
  FORGOT_PASSWORD_BEGIN,
  LOGGEDIN_PASSWORD_CHANGE_BEGIN,
  LOGGEDIN_PASSWORD_CHANGE_COMPLETED,
  LOGIN_COMPLETE,
  LOGIN_ERROR,
  ME_FETCH,
  ME_FETCH_COMPLETE,
  ME_LOGIN,
  RESET_PASSWORD_COMPLETED,
} from "../actions/action.constants";

export interface AuthState {
  _id: string;
  token?: any;
  loading?: boolean;
  errorOne: string;
}

const initialState = {
  _id: "",
  token: 1,
  loading: false,
  errorOne: "",
};

export const authReducer: Reducer<AuthState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    // case LOGIN_BEGIN:
    case ME_LOGIN:
    case ME_FETCH:
      const customerId = action.payload._id as string;
      return { ...state, _id: customerId, loading: true };
    case ME_FETCH_COMPLETE:
      return { ...state, loading: false };
    case LOGIN_COMPLETE:
      return { ...state, loading: false };
    // case LOGIN_ERROR:
    //   return { ...state, loading: false };

    case FORGOT_PASSWORD_BEGIN:
      return { ...state, token: action.payload.token };
    case RESET_PASSWORD_COMPLETED:
      return { ...state, token: 1 };
    case LOGGEDIN_PASSWORD_CHANGE_BEGIN:
      return { ...state, loading: true };
    case LOGIN_ERROR:
      return { ...state, errorOne: action.payload, loading: false };
    case LOGGEDIN_PASSWORD_CHANGE_COMPLETED:
      return { ...state, loading: false };

    default:
      return state;
  }
};
