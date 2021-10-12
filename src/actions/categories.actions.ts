import { Category } from "../models/Categories";
import {
  CATEGORIES_QUERY,
  CATEGORIES_QUERY_COMPLETED,
} from "./action.constants";

export const categoryQueryChangedAction = (query: string) => ({
  type: CATEGORIES_QUERY,
  payload: query,
});

export const categoryQueryCompletedAction = (
  query: string,
  categories: Category[]
) => ({
  type: CATEGORIES_QUERY_COMPLETED,
  payload: { query, categories },
});
