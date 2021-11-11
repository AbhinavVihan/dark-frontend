import { createProductRequest } from "../api/interfaces/productInterfaces";
import { Product, Products } from "../models/Products";
import {
  CREATE_PRODUCT_BEGIN,
  CREATE_PRODUCT_COMPLETE,
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

export const createProductBegin = (id: string, data: createProductRequest) => ({
  type: CREATE_PRODUCT_BEGIN,
  payload: { id, data },
});

export const createProductComplete = (product: Product) => ({
  type: CREATE_PRODUCT_COMPLETE,
  payload: product,
});

export const createProductError = (msg: string) => ({
  type: CREATE_PRODUCT_COMPLETE,
  payload: msg,
});
