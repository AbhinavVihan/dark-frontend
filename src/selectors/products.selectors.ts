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

export const queryIdsSelector = createSelector(
  [productQuerySelector, productQueryMapSelector],
  (query, queryMap) => queryMap[query] || []
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

export const productsLoadingSelector = createSelector(
  [productStateSelector],
  (productState) => productState.loadingList
);

export const selectedIdSelected = createSelector(
  [productStateSelector],
  (productState) => productState.selectedId
);

export const selectedErrorSelector = createSelector(
  [productStateSelector],
  (productState) => productState.errorOne
);

export const selectedLoadingSelector = createSelector(
  [productStateSelector],
  (productState) => productState.loadingOne
);

export const selectedProductSelector = createSelector(
  [productByIdSelector, selectedIdSelected],
  (byId, id) => id && byId[id]
);

export const currentQueryProductsSelector = createSelector(
  [queryIdsSelector, productByIdSelector],
  (productsIds, byId) => {
    const products = productsIds.map((id) => byId[id]);
    return products;
  }
);
