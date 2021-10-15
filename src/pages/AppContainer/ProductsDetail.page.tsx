import { FC, memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Route, Switch, useParams } from "react-router-dom";
import { fetchOneProduct } from "../../actions/products.actions";
import { productByIdSelector } from "../../selectors/products.selectors";
import { useAppSelector } from "../../store";

interface Props {}

const ProductsDetails: FC<Props> = (props) => {
  const { productId } = useParams<{ productId: string }>();

  const productByIds = useAppSelector(productByIdSelector);
  const product = productByIds[productId];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOneProduct(productId));
  }, [productId]);

  if (!product) {
    return <div>Loading Product...</div>;
  }

  return (
    <div>
      <Link className="text-blue-600" to="/products">
        Back to Products
      </Link>
      this is the details of {product.name} (id: {productId})
    </div>
  );
};

ProductsDetails.defaultProps = {};

export default memo(ProductsDetails);
