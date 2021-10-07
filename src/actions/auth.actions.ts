import { Customer } from "../models/Customer";

export const ME_FETCH = "me/fetch";
export const ME_LOGIN = "me/login";

export const meFetchAction = (c: Customer) => ({
  type: ME_FETCH,
  payload: c,
});

export const meLoginAction = (c: Customer) => ({
  type: ME_LOGIN,
  payload: c,
});
