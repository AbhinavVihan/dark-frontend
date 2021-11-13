import { bindActionCreators } from "redux";
import { Customer } from "../models/Customer";
import { store } from "../store";
import {
  CUSTOMER_UPDATEME_BEGIN,
  CUSTOMER_UPDATEME_COMPLETED,
  CUSTOMER_UPDATEME_ERROR,
  FORGOT_PASSWORD_BEGIN,
  LOGGEDIN_PASSWORD_CHANGE_BEGIN,
  LOGGEDIN_PASSWORD_CHANGE_COMPLETED,
  LOGIN_BEGIN,
  LOGIN_ERROR,
  ME_FETCH,
  ME_LOGIN,
  RESET_PASSWORD_COMPLETED,
  RETAILOR_LOGIN,
  RETAILOR_LOGIN_ERROR,
} from "./action.constants";

const loginActionBegin = () => ({
  type: LOGIN_BEGIN,
});

// export const loginActionComplete = (c: Customer) => ({
//   type: LOGIN_COMPLETE,
//   payload: c,
// });

const LoginActionError = (msg: string) => ({
  type: LOGIN_ERROR,
  payload: msg,
});

const meFetchAction = (c: Customer) => ({
  type: ME_FETCH,
  payload: c,
});

const meLoginAction = (c: Customer) => ({
  type: ME_LOGIN,
  payload: c,
});

// const retailorLoginAction = (c: Customer) => ({
//   type: RETAILOR_LOGIN,
//   payload: c,
// });

// const retailorLoginErrorAction = (msg: string) => ({
//   type: RETAILOR_LOGIN_ERROR,
//   payload: msg,
// });

export const resetPasswordBegin = ({ token }: any) => ({
  type: FORGOT_PASSWORD_BEGIN,
  payload: { token },
});

export const resetPasswordCompleted = (c: Customer) => ({
  type: RESET_PASSWORD_COMPLETED,
  payload: c,
});

export const loggedinResetPasswordBegin = () => ({
  type: LOGGEDIN_PASSWORD_CHANGE_BEGIN,
});

export const loggedinResetPasswordCompleted = () => ({
  type: LOGGEDIN_PASSWORD_CHANGE_COMPLETED,
});

export const customerUpdatemeBegin = () => ({
  type: CUSTOMER_UPDATEME_BEGIN,
});

export const customerUpdatemeCompleted = (c: Customer) => ({
  type: CUSTOMER_UPDATEME_COMPLETED,
  payload: c,
});
export const customerUpdatemeError = (c: Customer) => ({
  type: CUSTOMER_UPDATEME_ERROR,
});

export const authActions = bindActionCreators(
  {
    loginBegin: loginActionBegin,
    // loginComplete: loginActionComplete,
    loginError: LoginActionError,
    fetch: meFetchAction,
    login: meLoginAction,
    // retailorLogin: retailorLoginAction,
    // retailorLoginError: retailorLoginErrorAction,
    password: resetPasswordBegin,
    passwordChanged: resetPasswordCompleted,
    loggedinPasswordChangeBegin: loggedinResetPasswordBegin,
    loggedinPasswordChangeCompleted: loggedinResetPasswordCompleted,
    updatemeBegin: customerUpdatemeBegin,
    updatemeCompleted: customerUpdatemeCompleted,
    updatemeError: customerUpdatemeError,
  },
  store.dispatch
);
