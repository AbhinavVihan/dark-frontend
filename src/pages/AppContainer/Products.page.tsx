import { FC, memo } from "react";

interface Props {}

const Products: FC<Props> = (props) => {
  return <div>This is the products page</div>;
};

Products.defaultProps = {};

export default memo(Products);
