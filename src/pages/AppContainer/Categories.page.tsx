import { FC, memo, useEffect } from "react";
import { useAppSelector } from "../../store";
import Input from "../../components/input";
import {
  currentQueryCategoriesSelector,
  categoriesLoadingSelector,
  categoryQuerySelector,
} from "../../selectors/categories.selectors";
import { Link } from "react-router-dom";
import { fetchCategories as fetchCategoriesStart } from "../../api/categories";

import { FaSpinner } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  categoryQueryChangedAction,
  categoryQueryCompletedAction,
} from "../../actions/categories.actions";

interface Props {}

const Categories: FC<Props> = (props) => {
  const dispatch = useDispatch();

  const query = useAppSelector(categoryQuerySelector);

  const loading = useAppSelector(categoriesLoadingSelector);

  const categories = useAppSelector(currentQueryCategoriesSelector);

  useEffect(() => {
    fetchCategoriesStart({ query }).then((categories) => {
      dispatch(categoryQueryCompletedAction(query, categories));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div>
      <Link to="/products">
        <span className="text-blue-500">Search by products</span>
      </Link>
      <div>This is the categories page</div>
      <Input
        type="text"
        value={query}
        onChange={(e) => {
          // productActions.queryChanged(e.target.value, true);
          dispatch(categoryQueryChangedAction(e.target.value, true));
        }}
      ></Input>
      {loading && <FaSpinner className="mt-5 animate-spin"></FaSpinner>}
      <div>
        {categories &&
          categories.map((category) => (
            <div className="cursor-pointer">
              <Link to={"/categories/" + category._id}>
                {" "}
                {category.categoryName}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

Categories.defaultProps = {};

export default memo(Categories);
