import { FC, memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../api/products";
import { useAppSelector } from "../../store";
import Input from "../../components/input";
import {
  productsQueryAction,
  productsQueryCompletedAction,
  PRODUCTS_QUERY,
  PRODUCTS_QUERY_COMPLETED,
} from "../../actions/products.actions";

interface Props {}

const Products: FC<Props> = (props) => {
  const query = useAppSelector((state) => state.products.query);

  const products = useAppSelector((state) => {
    const productIds = state.products.queryMap[state.products.query] || [];
    const products = productIds.map((id) => state.products.byId[id]);
    return products;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts({ query }).then((products) => {
      dispatch(productsQueryCompletedAction(query, products));
    });
  }, [query]);

  return (
    <div>
      <div>This is the products page</div>
      <Input
        type="text"
        value={query}
        onChange={(e) => {
          dispatch(productsQueryAction(e.target.value));
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
