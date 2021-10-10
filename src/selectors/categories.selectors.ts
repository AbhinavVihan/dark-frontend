import { createSelector } from "reselect";
import { categoriesStateSelector } from "./app.selectors";

export const categoryQuerySelector = createSelector(
  [categoriesStateSelector],
  (categoryState) => categoryState.query
);

export const categoryQueryMapSelector = createSelector(
  [categoriesStateSelector],
  (categoryState) => categoryState.queryMap
);

export const categoryByIdSelector = createSelector(
  [categoriesStateSelector],
  (categoryState) => categoryState.byId
);

export const currentQueryCategoriesSelector = createSelector(
  [categoryQuerySelector, categoryByIdSelector, categoryQueryMapSelector],
  (query, byId, queryMap) => {
    const categoryIds = queryMap[query] || [];
    const categories = categoryIds.map((id) => byId[id]);
    return categories;
  }
);
