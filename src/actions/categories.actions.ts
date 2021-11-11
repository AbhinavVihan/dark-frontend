import { Categories, Category } from "../models/Categories";
import {
  CATEGORIES_FETCH_SINGLE,
  CATEGORIES_FETCH_SINGLE_COMPLETE,
  CATEGORIES_FETCH_SINGLE_ERROR,
  CATEGORIES_QUERY_CHANGED,
  CATEGORIES_QUERY_COMPLETED,
  CATEGORY_CHOOSE,
} from "./action.constants";

export const categoryQueryChangedAction = (
  query: string,
  loadingList: boolean
) => ({
  type: CATEGORIES_QUERY_CHANGED,
  payload: { query, loadingList },
});

export const categoryQueryCompletedAction = (
  query: string,
  categories: Category[]
) => ({
  type: CATEGORIES_QUERY_COMPLETED,
  payload: { query, categories },
});

export const fetchOneCategory = (id: string) => ({
  type: CATEGORIES_FETCH_SINGLE,
  payload: id,
});

export const fetchOneCategoryComplete = (category: Categories) => ({
  type: CATEGORIES_FETCH_SINGLE_COMPLETE,
  payload: category,
});

export const fetchSingleCategoryError = (id: string, msg: string) => ({
  type: CATEGORIES_FETCH_SINGLE_ERROR,
  payload: { id, msg },
});

export const categoryChoose = (id: string) => ({
  type: CATEGORY_CHOOSE,
  payload: id,
});
