import { FC, memo, useEffect } from "react";
import { useAppSelector } from "../../store";
import Input from "../../components/input";
import {
  currentQueryProductsSelector,
  productLoadingSelector,
  productQuerySelector,
} from "../../selectors/products.selectors";
import { Link, useHistory } from "react-router-dom";
import { fetchProducts as fetchProductsStart } from "../../api/products";

import { FaSpinner } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  productQueryChangedAction,
  productQueryCompletedAction,
} from "../../actions/products.actions";

interface Props {}

const Products: FC<Props> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const query = useAppSelector(productQuerySelector);

  const loading = useAppSelector(productLoadingSelector);

  const products = useAppSelector(currentQueryProductsSelector);

  // useEffect(() => {
  //   fetchProductsStart({ query }).then((products) => {
  //     dispatch(productQueryCompletedAction(query, products));
  //   });
  // }, [query]);

  return (
    <div>
      <Link to="/categories">
        <span className="text-blue-500">Search by categories</span>
      </Link>
      <div>This is the products page</div>
      <Input
        type="text"
        value={query}
        onChange={(e) => {
          // productActions.queryChanged(e.target.value, true);
          dispatch(productQueryChangedAction(e.target.value, true));
        }}
      ></Input>
      {loading && <FaSpinner className="mt-5 animate-spin"></FaSpinner>}
      <div>
        {products.map((product) => (
          <div className="cursor-pointer" key={product._id}>
            <Link to={"/products/" + product._id}> {product.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

Products.defaultProps = {};

export default memo(Products);
