import { createSelector } from "reselect";
import { productStateSelector } from "./app.selectors";

// export const productQuerySelector = (state: AppState) => {
//   const productState = productStateSelector(state);
//   return productState.query;
// };

export const productQuerySelector = createSelector(
  [productStateSelector],
  (productState) => productState.query
);

// export const productQueryMapSelector = (state: AppState) => {
//   const productState = productStateSelector(state);
//   return productState.queryMap;
// };

export const productQueryMapSelector = createSelector(
  [productStateSelector],
  (productState) => productState.queryMap
);

// export const productByIdSelector = (state: AppState) => {
//   const productState = productStateSelector(state);
//   return productState.byId;
// };

export const productByIdSelector = createSelector(
  [productStateSelector],
  (productState) => productState.byId
);

// export const currentQueryProductsSelector = (state: AppState) => {
//   const query = productQuerySelector(state);

//   const queryMap = productQueryMapSelector(state);
//   const byId = productByIdSelector(state);

//   const productIds = queryMap[query] || [];
//   const products = productIds.map((id) => byId[id]);
//   return products;
// };

export const currentQueryProductsSelector = createSelector(
  [productQuerySelector, productByIdSelector, productQueryMapSelector],
  (query, byId, queryMap) => {
    const productIds = queryMap[query] || [];
    const products = productIds.map((id) => byId[id]);
    return products;
  }
);
