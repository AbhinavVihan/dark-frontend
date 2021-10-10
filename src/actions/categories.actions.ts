import { bindActionCreators } from "redux";
import { Category } from "../models/Categories";
import { store } from "../store";
import {
  CATEGORIES_QUERY,
  CATEGORIES_QUERY_COMPLETED,
} from "./action.constants";

export const QueryAction = (query: string) => ({
  type: CATEGORIES_QUERY,
  payload: query,
});

export const QueryCompletedAction = (
  query: string,
  categories: Category[]
) => ({
  type: CATEGORIES_QUERY_COMPLETED,
  payload: { query, categories },
});

export const categoryActions = bindActionCreators(
  {
    query: QueryAction,
    queryCompleted: QueryCompletedAction,
  },
  store.dispatch
);
