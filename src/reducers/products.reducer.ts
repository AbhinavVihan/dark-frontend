import { Reducer } from "redux";

import {
  PRODUCTS_FETCH_SINGLE,
  PRODUCTS_FETCH_SINGLE_COMPLETE,
  PRODUCTS_QUERY_CHANGED,
  PRODUCTS_QUERY_COMPLETED,
} from "../actions/action.constants";
import { Product } from "../models/Products";
import { addMany, addOne, EntityState, getIds, select } from "./entity.reducer";

export interface ProductsState extends EntityState<Product> {
  query: string;
  queryMap: { [query: string]: string[] };
  loadingQuery: { [query: string]: boolean };
}

const initialState: ProductsState = {
  byId: {},
  query: "",
  queryMap: {},
  loadingQuery: {},
  imageCover: {},
  imageFront: {},
  image1: {},
  image2: {},
  image3: {},
};

export const productReducer: Reducer<ProductsState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case PRODUCTS_FETCH_SINGLE:
      return select(state, action.payload) as ProductsState;
    case PRODUCTS_QUERY_CHANGED:
      const { query, loading } = action.payload;

      return {
        ...state,
        query: query,
        loadingQuery: { ...state.loadingQuery, [query]: loading },
      };
    case PRODUCTS_QUERY_COMPLETED:
      const products = action.payload.products as Product[];
      const productIds = getIds(products);

      const newState = addMany(state, products) as ProductsState;

      // const imgCover = products.reduce((prev, product) => {
      //   const img = product.imageCover;

      //   return {
      //     ...prev,
      //     [product._id]: "https://dark-2.herokuapp.com/img/products/" + img,
      //   };
      // }, {});
      // const imgFront = products.reduce((prev, product) => {
      //   const img = product.imageFront;
      //   return {
      //     ...prev,
      //     [product._id]: "https://dark-2.herokuapp.com/img/products/" + img,
      //   };
      // }, {});
      // const img1 = products.reduce((prev, product) => {
      //   const img = product.images[0];

      //   return {
      //     ...prev,
      //     [product._id]: "https://dark-2.herokuapp.com/img/products/" + img,
      //   };
      // }, {});
      // const img2 = products.reduce((prev, product) => {
      //   const img = product.images[1];

      //   return {
      //     ...prev,
      //     [product._id]: "https://dark-2.herokuapp.com/img/products/" + img,
      //   };
      // }, {});
      // const img3 = products.reduce((prev, product) => {
      //   const img = product.images[2];
      //   return {
      //     ...prev,
      //     [product._id]: "https://dark-2.herokuapp.com/img/products/" + img,
      //   };
      // }, {});
      return {
        ...newState,
        queryMap: {
          ...newState.queryMap,
          [action.payload.query]: productIds,
        },
        loadingQuery: {
          ...newState.loadingQuery,
          [action.payload.query]: false,
        },
        // imageCover: { ...state.imageCover, ...imgCover },
        // imageFront: { ...state.imageFront, ...imgFront },
        // image1: { ...state.image1, ...img1 },
        // image2: { ...state.image2, ...img2 },
        // image3: { ...state.image3, ...img3 },
      };
    case PRODUCTS_FETCH_SINGLE_COMPLETE:
      return addOne(state, action.payload.doc) as ProductsState;
    default:
      return state;
  }
};
