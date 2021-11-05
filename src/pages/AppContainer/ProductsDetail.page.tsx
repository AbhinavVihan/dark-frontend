import { FC, memo, useEffect, useState } from "react";
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

  const [index, setIndex] = useState(0);
  const img = product && [
    "http://localhost:8000/img/products/" + product.images[0],
    "http://localhost:8000/img/products/" + product.images[1],
    "http://localhost:8000/img/products/" + product.images[2],
  ];

  useEffect(() => {
    dispatch(fetchOneProduct(productId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const onClickForward = () => {
    if (index + 1 === img!.length) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const onClickBack = () => {
    if (index - 1 === -1) {
      setIndex(img!.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  if (error) {
    return (
      <div>
        <div className="text-red-500">{error}</div>
        <Link to={"/products/" + (productId + 1)}>next product</Link>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Link className="text-blue-600 hover:text-red-500" to="/products">
          Back to Products
        </Link>
      </div>
      {loading && <div className="text-green-500">Loading Product...</div>}

      {product && (
        <div className="flex">
          <div>
            <img alt="imhfdb" src={img![index]} />
            <div className="space-x-5">
              <button className="hover:text-red-500" onClick={onClickBack}>
                Back
              </button>
              <button className="hover:text-red-500" onClick={onClickForward}>
                Forward
              </button>
            </div>
          </div>

          <div className="block">
            {product.name}
            {product.price}
            {product.productCategory}
            {product.ratingsAverage}
            {product.description}
          </div>
        </div>
      )}
    </div>
  );
};

ProductsDetails.defaultProps = {};

export default memo(ProductsDetails);
