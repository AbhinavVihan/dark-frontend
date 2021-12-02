import { bindActionCreators } from "redux";
import { updateRequest } from "../api/interfaces/authInterfaces";
import { Customer } from "../models/Customer";
import { store } from "../store";
import { LoginRequest } from "../api/interfaces/authInterfaces";
import {
  CUSTOMER_UPDATEME_BEGIN,
  CUSTOMER_UPDATEME_COMPLETED,
  CUSTOMER_UPDATEME_ERROR,
  FORGOT_PASSWORD_BEGIN,
  GET_CUSTOMER_BEGIN,
  GET_CUSTOMER_COMPLETE,
  LOGGEDIN_PASSWORD_CHANGE_BEGIN,
  LOGGEDIN_PASSWORD_CHANGE_COMPLETED,
  LOGIN_BEGIN,
  LOGIN_COMPLETE,
  LOGIN_ERROR,
  ME_FETCH,
  ME_FETCH_COMPLETE,
  ME_LOGIN,
  RESET_PASSWORD_COMPLETED,
  RETAILOR_LOGIN_BEGIN,
  RETAILOR_LOGIN_COMPLETE,
  RETAILOR_LOGIN_ERROR,
  UPDATE_MY_CREDENTIALS_BEGIN,
} from "./action.constants";

export const loginActionBegin = (data: LoginRequest) => ({
  type: LOGIN_BEGIN,
  payload: data,
});

export const RetailorLoginActionBegin = (data: LoginRequest) => ({
  type: RETAILOR_LOGIN_BEGIN,
  payload: data,
});

export const loginActionComplete = (c: Customer) => ({
  type: LOGIN_COMPLETE,
  payload: c,
});

export const RetailorLoginActionComplete = (c: Customer) => ({
  type: RETAILOR_LOGIN_COMPLETE,
  payload: c,
});

export const LoginActionError = (msg: string) => ({
  type: LOGIN_ERROR,
  payload: msg,
});

export const retailorLoginActionError = (msg: string) => ({
  type: RETAILOR_LOGIN_ERROR,
  payload: msg,
});

export const meFetchActionBegin = (c: Customer) => ({
  type: ME_FETCH,
  payload: c,
});

export const meFetchActionComplete = () => ({
  type: ME_FETCH_COMPLETE,
});

export const meLoginAction = (c: Customer) => ({
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
export const updateMyCredentialsBegin = (id: string, data: updateRequest) => ({
  type: UPDATE_MY_CREDENTIALS_BEGIN,
  payload: { id, data },
});

export const updateMyCredentialsCompleted = (c: Customer) => ({
  type: UPDATE_MY_CREDENTIALS_BEGIN,
  payload: c,
});

export const updateMyCredentialsError = (msg: string) => ({
  type: UPDATE_MY_CREDENTIALS_BEGIN,
  payload: msg,
});

export const getCustomerBegin = (id: string) => ({
  type: GET_CUSTOMER_BEGIN,
  payload: id,
});

export const getCustomerComplete = (customer: Customer) => ({
  type: GET_CUSTOMER_COMPLETE,
  payload: customer,
});

// export const authActions = bindActionCreators(
//   {
//     // fetch: meFetchActionBegin,
//     // login: meLoginAction,
//     // retailorLogin: retailorLoginAction,
//     // retailorLoginError: retailorLoginErrorAction,
//     // password: resetPasswordBegin,
//     // passwordChanged: resetPasswordCompleted,
//     // loggedinPasswordChangeBegin: loggedinResetPasswordBegin,
//     // loggedinPasswordChangeCompleted: loggedinResetPasswordCompleted,
//     // updatemeBegin: customerUpdatemeBegin,
//     // updatemeCompleted: customerUpdatemeCompleted,
//     // updatemeError: customerUpdatemeError,
//   },
//   store.dispatch
// );
