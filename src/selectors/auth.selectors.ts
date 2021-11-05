import { createSelector } from "reselect";
import { authStateSelector, customerStateSelector } from "./app.selectors";

export const authIdSelector = createSelector(
  [authStateSelector],
  (authState) => authState._id
);

export const customerByIdSelector = createSelector(
  [customerStateSelector],
  (customerState) => customerState.byId
);

// export const meSelector = (state: AppState) =>
//   state.auth._id !== undefined
//     ? state.customers.byId[state.auth._id]
//     : undefined;

export const meSelector = createSelector(
  [authIdSelector, customerByIdSelector],
  (id, byId) => (id !== undefined ? byId[id] : undefined)
);

export const tokenSelector = createSelector(
  [authStateSelector],
  (customerState) => (customerState.token ? customerState.token : undefined)
);

export const loadingSelector = createSelector(
  [authStateSelector],
  (customerState) => customerState.loading
);
