import { FC, memo, useEffect } from "react";
import { fetchProducts } from "../../api/products";
// import { Product } from "../../models/Product";

interface Props {}

const Products: FC<Props> = (props) => {
  return <div>This is the products page</div>;
};

Products.defaultProps = {};

export default memo(Products);
