import { bindActionCreators } from "redux";
import { Customer } from "../models/Customer";
import { store } from "../store";
import { ME_FETCH, ME_LOGIN } from "./action.constants";

const meFetchAction = (c: Customer) => ({
  type: ME_FETCH,
  payload: c,
});

const meLoginAction = (c: Customer) => ({
  type: ME_LOGIN,
  payload: c,
});

export const authActions = bindActionCreators(
  {
    fetch: meFetchAction,
    login: meLoginAction,
  },
  store.dispatch
);
