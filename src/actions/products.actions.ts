import { Product } from "../models/Products";
import {
  PRODUCTS_QUERY_CHANGED,
  PRODUCTS_QUERY_COMPLETED,
} from "./action.constants";

export const productQueryChangedAction = (query: string, loading: boolean) => ({
  type: PRODUCTS_QUERY_CHANGED,
  payload: { query, loading },
});

export const productQueryCompletedAction = (
  query: string,
  products: Product[]
) => ({
  type: PRODUCTS_QUERY_COMPLETED,
  payload: { query, products },
});
