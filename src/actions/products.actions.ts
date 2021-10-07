import { Product } from "../models/Products";

export const PRODUCTS_QUERY = "products/query";
export const PRODUCTS_QUERY_COMPLETED = "products/query_completed";

export const productsQueryAction = (query: string) => ({
  type: PRODUCTS_QUERY,
  payload: query,
});

export const productsQueryCompletedAction = (
  query: string,
  products: Product[]
) => ({
  type: PRODUCTS_QUERY_COMPLETED,
  payload: { query, products },
});
