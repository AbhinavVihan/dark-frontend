import { AppState } from "../store";

export const productQuerySelector = (state: AppState) => state.products.query;

export const currentQueryProductsSelector = (state: AppState) => {
  const productIds = state.products.queryMap[state.products.query] || [];
  const products = productIds.map((id) => state.products.byId[id]);
  return products;
};
