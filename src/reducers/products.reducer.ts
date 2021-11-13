import { Reducer } from "redux";

import {
  CREATE_PRODUCT_COMPLETE,
  CREATE_PRODUCT_ERROR,
  FETCH_PRODUCTS_FOR_CATEGORY,
  PRODUCTS_FETCH_SINGLE,
  PRODUCTS_FETCH_SINGLE_COMPLETE,
  PRODUCTS_FETCH_SINGLE_ERROR,
  PRODUCTS_QUERY_CHANGED,
  PRODUCTS_QUERY_COMPLETED,
  UPLOAD_PRODUCT_BEGIN,
} from "../actions/action.constants";
import {
  uploadProductCompleted,
  uploadProductError,
} from "../actions/products.actions";
import { Product } from "../models/Products";
import {
  addMany,
  addOne,
  EntityState,
  getIds,
  initialEntityState,
  select,
  setErrorForOne,
} from "./entity.reducer";

export interface ProductsState extends EntityState<Product> {
  query: string;
  queryMap: { [query: string]: string[] };
  productsByCategoryId: { [id: string]: Product[] };
  createdProduct: { [id: string]: Product };
  loadingForProduct: boolean;
}

const initialState: ProductsState = {
  ...initialEntityState,
  query: "",
  queryMap: {},
  productsByCategoryId: {},
  createdProduct: {},
  loadingForProduct: false,
};

export const productReducer: Reducer<ProductsState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case PRODUCTS_FETCH_SINGLE:
      return select(state, action.payload) as ProductsState;
    case PRODUCTS_QUERY_CHANGED:
      const { query, loadingList } = action.payload;

      return {
        ...state,
        query: query,
        loadingList: loadingList,
      };
    case CREATE_PRODUCT_COMPLETE:
      return {
        ...state,
        createdProduct: {
          ...state.createdProduct,
          [action.payload.id]: action.payload,
        },
        selectedId: action.payload.id,
      };
    case CREATE_PRODUCT_ERROR:
      return { ...state, errorOne: action.payload };
    case PRODUCTS_QUERY_COMPLETED:
      const products = action.payload.products as Product[];
      const productIds = getIds(products);

      const newState = addMany(state, products) as ProductsState;

      return {
        ...newState,
        queryMap: {
          ...newState.queryMap,
          [action.payload.query]: productIds,
        },
        loadingList: false,
      };
    case PRODUCTS_FETCH_SINGLE_COMPLETE:
      return addOne(state, action.payload.doc, false) as ProductsState;
    case PRODUCTS_FETCH_SINGLE_ERROR:
      const { id, msg } = action.payload;
      return setErrorForOne(state, id, msg) as ProductsState;
    case FETCH_PRODUCTS_FOR_CATEGORY:
      return {
        ...state,
        productsByCategoryId: {
          ...state.productsByCategoryId,
          [action.payload.id]: action.payload.products,
        },
      };
    case UPLOAD_PRODUCT_BEGIN:
      return { ...state, loadingForProduct: true };
    case uploadProductCompleted:
      return { ...state, loadingForProduct: false };
    case uploadProductError:
      return { ...state, errorOne: action.payload };
    default:
      return state;
  }
};
