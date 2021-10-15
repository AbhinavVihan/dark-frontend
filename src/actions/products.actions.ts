import { Product, Products } from "../models/Products";
import {
  PRODUCTS_FETCH_SINGLE,
  PRODUCTS_FETCH_SINGLE_COMPLETE,
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

export const fetchOneProduct = (id: string) => ({
  type: PRODUCTS_FETCH_SINGLE,
  payload: id,
});

export const fetchOneProductComplete = (product: Products) => ({
  type: PRODUCTS_FETCH_SINGLE_COMPLETE,
  payload: product,
});
