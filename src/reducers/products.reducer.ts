import { Reducer } from "redux";

import {
  PRODUCTS_QUERY,
  PRODUCTS_QUERY_COMPLETED,
} from "../actions/action.constants";
import { Product } from "../models/Products";
import {
  addImg1,
  addImg2,
  addImg3,
  addImgCover,
  addImgFront,
  addMany,
  EntityState,
  getIds,
} from "./entity.reducer";

export interface ProductsState extends EntityState<Product> {
  query: string;
  queryMap: { [query: string]: string[] };
}

const initialState: ProductsState = {
  byId: {},
  query: "",
  queryMap: {},
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
    case PRODUCTS_QUERY:
      return { ...state, query: action.payload };
    case PRODUCTS_QUERY_COMPLETED:
      const products = action.payload.products as Product[];
      const productIds = getIds(products);

      const newState = addMany(state, products) as ProductsState;

      const imgCover = products.reduce((prev, product) => {
        const img = product.imageCover;

        return {
          ...prev,
          [product._id]: "https://dark-2.herokuapp.com/img/products/" + img,
        };
      }, {});
      const imgFront = products.reduce((prev, product) => {
        const img = product.imageFront;
        return {
          ...prev,
          [product._id]: "https://dark-2.herokuapp.com/img/products/" + img,
        };
      }, {});
      const img1 = products.reduce((prev, product) => {
        const img = product.images[0];

        return {
          ...prev,
          [product._id]: "https://dark-2.herokuapp.com/img/products/" + img,
        };
      }, {});
      const img2 = products.reduce((prev, product) => {
        const img = product.images[1];

        return {
          ...prev,
          [product._id]: "https://dark-2.herokuapp.com/img/products/" + img,
        };
      }, {});
      const img3 = products.reduce((prev, product) => {
        const img = product.images[2];
        return {
          ...prev,
          [product._id]: "https://dark-2.herokuapp.com/img/products/" + img,
        };
      }, {});
      return {
        ...newState,
        queryMap: {
          ...state.queryMap,
          [action.payload.query]: productIds,
        },
        imageCover: { ...state.imageCover, ...imgCover },
        imageFront: { ...state.imageFront, ...imgFront },
        image1: { ...state.image1, ...img1 },
        image2: { ...state.image2, ...img2 },
        image3: { ...state.image3, ...img3 },
      };
    default:
      return state;
  }
};
