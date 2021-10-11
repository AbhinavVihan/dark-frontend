import { bindActionCreators } from "redux";
import { Product } from "../models/Products";
import { store } from "../store";
import { PRODUCTS_QUERY, PRODUCTS_QUERY_COMPLETED } from "./action.constants";

export const QueryAction = (query: string, loading: boolean) => ({
  type: PRODUCTS_QUERY,
  payload: { query, loading },
});

export const QueryCompletedAction = (query: string, products: Product[]) => ({
  type: PRODUCTS_QUERY_COMPLETED,
  payload: { query, products },
});

export const productActions = bindActionCreators(
  {
    query: QueryAction,
    queryCompleted: QueryCompletedAction,
  },
  store.dispatch
);
