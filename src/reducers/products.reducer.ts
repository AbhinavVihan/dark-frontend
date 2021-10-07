import { Reducer } from "redux";

import {
  PRODUCTS_QUERY,
  PRODUCTS_QUERY_COMPLETED,
} from "../actions/action.constants";
import { Product } from "../models/Products";

export interface ProductsState {
  byId: {
    [id: string]: Product;
  };

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
      console.log(products);
      const productIds = products.map((p) => {
        if (p) {
          return p._id;
        }
      });

      const productMap = products.reduce((prev, product) => {
        return { ...prev, [product && product._id]: product };
      }, {});

      return {
        ...state,
        queryMap: {
          ...state.queryMap,
          [action.payload.query]: productIds,
        },
        byId: { ...state.byId, ...productMap },
      };
    default:
      return state;
  }
};
