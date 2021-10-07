import { FC, memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../api/products";
import { useAppSelector } from "../../store";
import Input from "../../components/input";
import { productActions } from "../../actions/products.actions";

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
      productActions.queryCompleted(query, products);
    });
  }, [query]);

  return (
    <div>
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
