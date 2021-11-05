import { Product, Products } from "../models/Products";
import {
  FETCH_PRODUCTS_FOR_CATEGORY,
  PRODUCTS_FETCH_SINGLE,
  PRODUCTS_FETCH_SINGLE_COMPLETE,
  PRODUCTS_FETCH_SINGLE_ERROR,
  PRODUCTS_QUERY_CHANGED,
  PRODUCTS_QUERY_COMPLETED,
} from "./action.constants";

export const productQueryChangedAction = (
  query: string,
  loadingList: boolean
) => ({
  type: PRODUCTS_QUERY_CHANGED,
  payload: { query, loadingList },
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

export const fetchProductsForCategory = (id: string, products: Product[]) => ({
  type: FETCH_PRODUCTS_FOR_CATEGORY,
  payload: { id, products },
});

export const fetchOneProductComplete = (product: Products) => ({
  type: PRODUCTS_FETCH_SINGLE_COMPLETE,
  payload: product,
});

export const fetchSingleProductError = (id: string, msg: string) => ({
  type: PRODUCTS_FETCH_SINGLE_ERROR,
  payload: { id, msg },
});
