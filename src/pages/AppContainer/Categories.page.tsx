import { FC, memo, useEffect } from "react";
import { useAppSelector } from "../../store";
import Input from "../../components/input";
import {
  categoryQuerySelector,
  currentQueryCategoriesSelector,
} from "../../selectors/categories.selectors";
import { fetchCategories } from "../../api/categories";
import { useDispatch } from "react-redux";
import {
  categoryQueryChangedAction,
  categoryQueryCompletedAction,
} from "../../actions/categories.actions";

interface Props {}

const Categories: FC<Props> = (props) => {
  const dispatch = useDispatch();

  const query = useAppSelector(categoryQuerySelector);

  const categories = useAppSelector(currentQueryCategoriesSelector);

  useEffect(() => {
    fetchCategories({ query }).then((categories) => {
      dispatch(categoryQueryCompletedAction(query, categories));
      // categoryActions.queryCompleted(query, categories);
    });
  }, [query]);

  return (
    <div>
      <div>This is the categories page</div>
      <Input
        type="text"
        value={query}
        onChange={(e) => {
          dispatch(categoryQueryChangedAction(e.target.value));
          // categoryActions.query(e.target.value);
        }}
      ></Input>
      <div>
        {categories.map((category) => (
          <div key={category._id}>{category.categoryName}</div>
        ))}
      </div>
    </div>
  );
};

Categories.defaultProps = {};

export default memo(Categories);
