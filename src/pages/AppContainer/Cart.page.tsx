import { FC, memo, useEffect } from "react";
import { useAppSelector } from "../../store";
import {
  currentQueryProductsSelector,
  productsLoadingSelector,
  productQuerySelector,
} from "../../selectors/products.selectors";
import { Link } from "react-router-dom";
import {
  fetchProducts as fetchProductsStart,
  getCart,
} from "../../api/products";

import { FaSpinner } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  productQueryChangedAction,
  productQueryCompletedAction,
} from "../../actions/products.actions";
import { meSelector } from "../../selectors/auth.selectors";
import {
  addToCartBegin,
  createCartBegin as createCartAction,
  createCartCompleted,
  getCartBegin,
} from "../../actions/cart.actions";
import { cartProductsSelector } from "../../selectors/cart.selectors";

interface Props {}

const Products: FC<Props> = (props) => {
  const dispatch = useDispatch();

  const cartProducts = useAppSelector(cartProductsSelector);

  const customer = useAppSelector(meSelector);

  useEffect(() => {
    dispatch(getCartBegin());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const img = products.map((p) => p.imageFront);

  // const imgString = img.toString();
  // console.log(imgString);

  return (
    <div>
      {/* <Link to="/categories">
        <div className="text-right">
          <span className="text-blue-500 hover:text-red-500">
            Search by categories
          </span>
        </div>
      </Link>
      <Link className="text-blue-500 hover:text-red-500" to="/login">
        Login
      </Link> */}

      <div className="text-center ">Search for Products Here</div>

      <div className="grid grid-cols-5 gap-4 m-4 space-x-10 h-96">
        {cartProducts &&
          cartProducts.map((product) => (
            <div className="items-center justify-center rounded cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="items-center justify-center border-black">
                <Link to={"/products/" + product._id}>
                  <img
                    className="items-center justify-center w-full"
                    alt="jvbjdsbj"
                    src={
                      "http://127.0.0.1:8000/img/products/" + product.imageFront
                    }
                  />
                  <div className="flex justify-around">
                    <div className="font-semibold">
                      {product && product.name}
                    </div>
                    <div className="font-bold text-green-600">
                      ${product.price}
                    </div>
                  </div>
                  <div className="text-xl font-bold text-center text-green-600">
                    Free Delivery
                  </div>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

Products.defaultProps = {};

export default memo(Products);
