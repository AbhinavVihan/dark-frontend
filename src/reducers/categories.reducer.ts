import { Reducer } from "redux";

import {
  CATEGORIES_QUERY,
  CATEGORIES_QUERY_COMPLETED,
} from "../actions/action.constants";
import { Category } from "../models/Categories";
import {
  addMany,
  EntityState,
  getIds,
  initialEntityState,
} from "./entity.reducer";

export interface CategoriesState extends EntityState<Category> {
  query: string;
  queryMap: { [query: string]: string[] };
}

const initialState: CategoriesState = {
  ...initialEntityState,
  query: "",
  queryMap: {},
  photo: {},
};

export const categoryReducer: Reducer<CategoriesState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CATEGORIES_QUERY:
      return { ...state, query: action.payload };
    case CATEGORIES_QUERY_COMPLETED:
      const categories = action.payload.categories as Category[];
      const categoriesIds = getIds(categories);

      const newState = addMany(state, categories) as CategoriesState;

      const photo = categories.reduce((prev, category) => {
        const img = category.photo;

        return {
          ...prev,
          [category._id]: "https://dark-2.herokuapp.com/img/categories/" + img,
        };
      }, {});

      //   const imgCover = categories.reduce((prev, product) => {
      //     const img = product.imageCover;

      //     return {
      //       ...prev,
      //       [product._id]: "https://dark-2.herokuapp.com/img/categories/" + img,
      //     };
      //   }, {});
      //   const imgFront = categories.reduce((prev, product) => {
      //     const img = product.imageFront;
      //     return {
      //       ...prev,
      //       [product._id]: "https://dark-2.herokuapp.com/img/categories/" + img,
      //     };
      //   }, {});
      //   const img1 = categories.reduce((prev, product) => {
      //     const img = product.images[0];

      //     return {
      //       ...prev,
      //       [product._id]: "https://dark-2.herokuapp.com/img/categories/" + img,
      //     };
      //   }, {});
      //   const img2 = categories.reduce((prev, product) => {
      //     const img = product.images[1];

      //     return {
      //       ...prev,
      //       [product._id]: "https://dark-2.herokuapp.com/img/categories/" + img,
      //     };
      //   }, {});
      //   const img3 = categories.reduce((prev, product) => {
      //     const img = product.images[2];
      //     return {
      //       ...prev,
      //       [product._id]: "https://dark-2.herokuapp.com/img/categories/" + img,
      //     };
      //   }, {});
      return {
        ...newState,
        queryMap: {
          ...state.queryMap,
          [action.payload.query]: categoriesIds,
        },
        photo: { ...state.photo, ...photo },
        // imageCover: { ...state.imageCover, ...imgCover },
        // imageFront: { ...state.imageFront, ...imgFront },
        // image1: { ...state.image1, ...img1 },
        // image2: { ...state.image2, ...img2 },
        // image3: { ...state.image3, ...img3 },
      };
    default:
      return state;
  }
};
