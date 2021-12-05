import { FC, memo, useEffect } from "react";
import { useAppSelector } from "../../store";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import {
  buyingStart,
  getCartBegin,
  buyingBegin,
} from "../../actions/cart.actions";
import {
  cartIdSelector,
  cartLoadingSelector,
  cartProductsSelector,
} from "../../selectors/cart.selectors";
import { orderProduct } from "../../stripe/public/checkout";
import { BASE_URL } from "../../api/base";
import LoadingOverlay from "react-loading-overlay-ts";

interface Props {}

const Cart: FC<Props> = (props) => {
  const dispatch = useDispatch();

  const cartProducts = useAppSelector(cartProductsSelector);
  const loading = useAppSelector(cartLoadingSelector);
  const cartId = useAppSelector(cartIdSelector);

  useEffect(() => {
    dispatch(getCartBegin());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const price = () => {
    let total = 0;
    if (cartProducts) {
      for (let i = 0; i < cartProducts.length; i++) {
        total = total + cartProducts[i].price;
      }
      console.log(total);
      return total;
    }
  };

  if (cartProducts?.length === 0) {
    <div>There is nothing in your cart</div>;
  }

  return (
    <LoadingOverlay className="w-screen h-screen" active={loading} spinner>
      <div>
        <div className="grid grid-flow-row gap-4 m-4 space-x-10 h-96">
          {cartProducts &&
            cartProducts.map((product) => (
              <div className="items-center justify-center rounded cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="items-center justify-center border-black">
                  <Link to={"/products/" + product._id}>
                    <img
                      className="items-center justify-center w-64"
                      alt="jvbjdsbj"
                      src={BASE_URL + "/img/products/" + product.imageFront}
                    />
                    <div className="flex justify-around">
                      <div className="font-semibold">
                        {product && product.name}
                      </div>
                      <div className="font-bold text-green-600">
                        ${product.price}
                      </div>
                    </div>
                  </Link>
                  <div className="text-center">
                    <button
                      onClick={() => {
                        orderProduct(product._id);
                        dispatch(buyingBegin());
                      }}
                      className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-green-800 border-2 border-black rounded hover:bg-green-900 w-28"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => {
                        dispatch(buyingStart(product._id, cartId!));
                        // dispatch(getCartBegin());
                      }}
                      className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-red-800 border-2 border-black rounded hover:bg-red-900 w-28"
                    >
                      Delete From Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          <div>Total: ${price()}</div>
        </div>
      </div>
    </LoadingOverlay>
  );
};

Cart.defaultProps = {};

export default memo(Cart);
