import { FC, memo } from "react";
import { useParams } from "react-router";

interface Props {}

const Products: FC<Props> = (props) => {
  const { productId } = useParams<any>();
  console.log(productId);

  return <div>This is the products having ID#{productId} </div>;
};

Products.defaultProps = {};

export default memo(Products);
