import { Reducer } from "redux";

import {
  CATEGORIES_FETCH_SINGLE,
  CATEGORIES_FETCH_SINGLE_COMPLETE,
  CATEGORIES_FETCH_SINGLE_ERROR,
  CATEGORIES_QUERY_CHANGED,
  CATEGORIES_QUERY_COMPLETED,
  CATEGORY_CHOOSE,
} from "../actions/action.constants";
import { Category } from "../models/Categories";
import {
  addMany,
  addOne,
  EntityState,
  getIds,
  initialEntityState,
  select,
  setErrorForOne,
} from "./entity.reducer";

export interface CategoriesState extends EntityState<Category> {
  query: string;
  queryMap: { [query: string]: string[] };
  idForRetailor: string;
}

const initialState: CategoriesState = {
  ...initialEntityState,
  query: "",
  queryMap: {},
  idForRetailor: "",

  // photo: {},
};

export const categoryReducer: Reducer<CategoriesState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CATEGORIES_FETCH_SINGLE:
      return select(state, action.payload) as CategoriesState;
    case CATEGORIES_QUERY_CHANGED:
      const { query, loadingList } = action.payload;

      return {
        ...state,
        query: query,
        loadingList: loadingList,
      };
    case CATEGORIES_QUERY_COMPLETED:
      const categories = action.payload.categories as Category[];
      const categoriesIds = getIds(categories);

      const newState = addMany(state, categories) as CategoriesState;

      categories.reduce((prev, category) => {
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
          ...newState.queryMap,
          [action.payload.query]: categoriesIds,
        },
        loadingList: false,
        // photo: { ...state.photo, ...photo },
        // imageCover: { ...state.imageCover, ...imgCover },
        // imageFront: { ...state.imageFront, ...imgFront },
        // image1: { ...state.image1, ...img1 },
        // image2: { ...state.image2, ...img2 },
        // image3: { ...state.image3, ...img3 },
      };
    case CATEGORIES_FETCH_SINGLE_COMPLETE:
      return addOne(state, action.payload.doc, false) as CategoriesState;
    case CATEGORIES_FETCH_SINGLE_ERROR:
      const { id, msg } = action.payload;
      return setErrorForOne(state, id, msg) as CategoriesState;
    case CATEGORY_CHOOSE:
      return { ...state, idForRetailor: action.payload };
    default:
      return state;
  }
};
