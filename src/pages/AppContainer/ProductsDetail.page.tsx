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

<script src="https://js.stripe.com/v3/"></script>;

interface Props {}

const ProductsDetails: FC<Props> = (props) => {
  const { productId } = useParams<{ productId: string }>();
  const customer = useAppSelector(meSelector);
  const cart = useAppSelector(cartSelector);
  const cartId = useAppSelector(cartIdSelector);

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
    dispatch(getCartBegin());

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

  const createYourCart = () => {
    dispatch(createCartAction());
    createCart()
      .then((c) => {
        dispatch(createCartCompleted(c));
        alert("your cart has been successfully created");
      })
      .catch((e) => {
        alert(e);
      });
  };

  const addToCarts = () => {
    // cartId &&
    //   addToCart({ pId: productId, cId: cartId })
    //     .then(() => {
    //       alert("successfully added");
    //     })
    //     .catch((e) => {
    //       alert(e);
    //     });
    cartId && dispatch(addToCartBegin(productId, cartId));
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
      {/* {customer && (
        <Link to="/cart">
          <button className="flex px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28">
            My Cart
            <AiOutlineShoppingCart className="items-center justify-end text-right "></AiOutlineShoppingCart>
          </button>
        </Link>
      )} */}

      {customer && cart ? (
        <Link to="/cart">
          <button className="flex px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28">
            My Cart
            <AiOutlineShoppingCart className="items-center justify-end text-right "></AiOutlineShoppingCart>
          </button>
        </Link>
      ) : (
        <Link to="/login">
          <button className="flex px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28">
            My Cart
            <AiOutlineShoppingCart className="items-center justify-end text-right "></AiOutlineShoppingCart>
          </button>
        </Link>
      )}

      <div>
        <Link className="text-blue-600 hover:text-red-500" to="/products">
          Back to Products
        </Link>
      </div>
      {loading && <div className="text-green-500">Loading Product...</div>}

      {product && (
        <div className="flex">
          <div className="ml-6 mr-6">
            <img className="w-full h-full" alt="imhfdb" src={img![index]} />
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
            <div>
              {customer?.role === "retailor" && (
                <Link
                  className="inline-block px-0 py-1 mx-3 my-2 text-center text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
                  to="/login"
                >
                  Login for Cart
                </Link>
              )}
              {customer?.role === "customer" && cart && (
                <button
                  className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
                  onClick={addToCarts}
                >
                  Add to Cart
                </button>
              )}
              {customer?.role === "customer" && !cart && (
                <button
                  className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
                  onClick={createYourCart}
                >
                  Create your Cart
                </button>
              )}

              {/* {!customer ? (
                <Link
                  className="inline-block px-0 py-1 mx-3 my-2 text-center text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
                  to="/login"
                >
                  Login for Cart
                </Link>
              ) : !cart ? (
                <button
                  className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
                  onClick={createYourCart}
                >
                  Create your Cart
                </button>
              ) : (
                <button
                  className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
                  onClick={addToCarts}
                >
                  Add to Cart
                </button>
              )} */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ProductsDetails.defaultProps = {};

export default memo(ProductsDetails);
