import { Reducer } from "redux";

import {
  PRODUCTS_QUERY,
  PRODUCTS_QUERY_COMPLETED,
} from "../actions/action.constants";
import { Product } from "../models/Products";
import { addMany, EntityState, getIds } from "./entity.reducer";

export interface ProductsState extends EntityState<Product> {
  query: string;
  queryMap: { [query: string]: string[] };
}

const initialState: ProductsState = {
  byId: {},
  query: "",
  queryMap: {},
};

export const productReducer: Reducer<ProductsState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case PRODUCTS_QUERY:
      return { ...state, query: action.payload };
    case PRODUCTS_QUERY_COMPLETED:
      const products = action.payload.products as Product[];
      const productIds = getIds(products);

      const newState = addMany(state, products) as ProductsState;

      return {
        ...newState,
        queryMap: {
          ...state.queryMap,
          [action.payload.query]: productIds,
        },
      };
    default:
      return state;
  }
};
