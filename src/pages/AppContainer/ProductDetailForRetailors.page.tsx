import { FC, memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { fetchOneProduct } from "../../actions/products.actions";
import { createCart } from "../../api/products";
import {
  selectedProductSelector,
  selectedErrorSelector,
  selectedLoadingSelector,
} from "../../selectors/products.selectors";
import { useAppSelector } from "../../store";
import {
  addToCartBegin,
  createCartBegin as createCartAction,
  createCartCompleted,
  getCartBegin,
} from "../../actions/cart.actions";
import { meSelector } from "../../selectors/auth.selectors";
import { cartIdSelector, cartSelector } from "../../selectors/cart.selectors";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BASE_URL } from "../../api/base";
import LoadingOverlay from "react-loading-overlay-ts";

interface Props {}

const ProductsDetailForRetailor: FC<Props> = (props) => {
  const { productId } = useParams<{ productId: string }>();
  const customer = useAppSelector(meSelector);

  const product = useAppSelector(selectedProductSelector);
  const error = useAppSelector(selectedErrorSelector);
  const loading = useAppSelector(selectedLoadingSelector);

  const dispatch = useDispatch();

  const [index, setIndex] = useState(0);
  const img = product && [
    BASE_URL + "/img/products/" + product.image1,
    BASE_URL + "/img/products/" + product.image2,
    BASE_URL + "/img/products/" + product.image3,
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
    <LoadingOverlay className="w-screen h-screen" active={loading} spinner>
      <div>
        <div>
          <Link
            className="text-blue-600 hover:text-red-500"
            to="/productsRetailor"
          >
            Back to Products
          </Link>
        </div>

        {product && (
          <div>
            {loading && (
              <div className="text-green-500">Loading Product...</div>
            )}

            {product && (
              <div className="flex">
                <div className="ml-6 mr-6">
                  <img
                    className="w-full h-full"
                    alt="imhfdb"
                    src={img![index]}
                  />
                  <div className="space-x-5">
                    <button
                      className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
                      onClick={onClickBack}
                    >
                      prev.
                    </button>
                    <button
                      className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
                      onClick={onClickForward}
                    >
                      next
                    </button>
                  </div>
                </div>

                <div className="space-y-8 font-bold tracking-wider pl-9">
                  <div>{product.name}</div>
                  <div>{product.price}</div>
                  <div>{product.quantity}</div>
                  <div>{product.ratingsAverage}</div>
                  <div>{product.description}</div>
                  <div></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </LoadingOverlay>
  );
};

ProductsDetailForRetailor.defaultProps = {};

export default memo(ProductsDetailForRetailor);
