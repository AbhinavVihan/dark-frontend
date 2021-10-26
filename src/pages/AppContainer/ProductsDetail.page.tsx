import { FC, memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOneProduct } from "../../actions/products.actions";
import {
  selectedProductSelector,
  selectedErrorSelector,
  selectedLoadingSelector,
} from "../../selectors/products.selectors";
import { useAppSelector } from "../../store";

interface Props {}

const ProductsDetails: FC<Props> = (props) => {
  const { productId } = useParams<{ productId: string }>();

  const product = useAppSelector(selectedProductSelector);
  const error = useAppSelector(selectedErrorSelector);
  const loading = useAppSelector(selectedLoadingSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOneProduct(productId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  if (error) {
    return (
      <div>
        <div className="text-red-500">{error}</div>
        <Link to={"/products/" + (+productId + 1)}>next product</Link>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Link className="text-blue-600" to="/products">
          Back to Products
        </Link>
      </div>
      {loading && <div className="text-green-500">Loading Product...</div>}

      {product && (
        <div>
          this is the details of {product.name} (id: {productId}) whose image is
          {/* <img
            alt="imhfdb"
            src={
              "http://127.0.0.1:8000/public/img/products/product-615185d0b3cd3f2386e2aa66-1634957812243-1.jpeg"
            }
          /> */}
        </div>
      )}
      <Link to={"/products/" + (productId + 1)}>next product</Link>
    </div>
  );
};

ProductsDetails.defaultProps = {};

export default memo(ProductsDetails);
