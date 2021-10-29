import { bindActionCreators } from "redux";
import { Customer } from "../models/Customer";
import { store } from "../store";
import {
  FORGOT_PASSWORD_BEGIN,
  ME_FETCH,
  ME_LOGIN,
  RESET_PASSWORD_COMPLETED,
} from "./action.constants";

const meFetchAction = (c: Customer) => ({
  type: ME_FETCH,
  payload: c,
});

const meLoginAction = (c: Customer) => ({
  type: ME_LOGIN,
  payload: c,
});

export const resetPasswordBegin = ({ token }: any) => ({
  type: FORGOT_PASSWORD_BEGIN,
  payload: { token },
});

export const resetPasswordCompleted = (c: Customer) => ({
  type: RESET_PASSWORD_COMPLETED,
  payload: c,
});

export const authActions = bindActionCreators(
  {
    fetch: meFetchAction,
    login: meLoginAction,
    password: resetPasswordBegin,
    passwordChanged: resetPasswordCompleted,
  },
  store.dispatch
);
