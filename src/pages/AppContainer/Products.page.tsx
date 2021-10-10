import { FC, memo, useEffect } from "react";
import { fetchProducts } from "../../api/products";
import { useAppSelector } from "../../store";
import Input from "../../components/input";
import { productActions } from "../../actions/products.actions";
import {
  currentQueryProductsSelector,
  productQuerySelector,
} from "../../selectors/products.selectors";
import { Link } from "react-router-dom";

interface Props {}

const Products: FC<Props> = (props) => {
  const query = useAppSelector(productQuerySelector);

  const products = useAppSelector(currentQueryProductsSelector);

  useEffect(() => {
    fetchProducts({ query }).then((products) => {
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
          productActions.query(e.target.value);
        }}
      ></Input>
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
