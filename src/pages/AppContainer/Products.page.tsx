import { FC, memo, useEffect } from "react";
import { useAppSelector } from "../../store";
import Input from "../../components/input";
import {
  currentQueryProductsSelector,
  productLoadingSelector,
  productQuerySelector,
} from "../../selectors/products.selectors";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../middlewares/products.middlewares";
import { fetchProducts as fetchProductsStart } from "../../api/products";

import { productActions } from "../../actions/products.actions";
import { FaSpinner } from "react-icons/fa";

interface Props {}

const Products: FC<Props> = (props) => {
  const query = useAppSelector(productQuerySelector);

  const loading = useAppSelector(productLoadingSelector);

  const products = useAppSelector(currentQueryProductsSelector);

  useEffect(() => {
    fetchProductsStart({ query }).then((products) => {
      productActions.queryCompleted(query, products);
    });
  }, [query]);

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
          fetchProducts({ query: e.target.value });
        }}
      ></Input>
      {loading && <FaSpinner className="mt-5 animate-spin"></FaSpinner>}
      <div>
        {products.map((product) => (
          <div key={product._id}>{product.name}</div>
        ))}
      </div>
    </div>
  );
};

Products.defaultProps = {};

export default memo(Products);
