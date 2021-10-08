import { AppState } from "../store";

export const meSelector = (state: AppState) =>
  state.auth._id !== undefined
    ? state.customers.byId[state.auth._id]
    : undefined;
