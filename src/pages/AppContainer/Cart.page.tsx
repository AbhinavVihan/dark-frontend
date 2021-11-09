import { FC, memo, useEffect } from "react";
import { useAppSelector } from "../../store";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { meSelector } from "../../selectors/auth.selectors";
import { buyingStart, getCartBegin } from "../../actions/cart.actions";
import {
  cartIdSelector,
  cartProductsSelector,
} from "../../selectors/cart.selectors";
import { orderProduct } from "../../stripe/public/checkout";

<script src="https://js.stripe.com/v3/"></script>;

interface Props {}

const Cart: FC<Props> = (props) => {
  const dispatch = useDispatch();

  const cartProducts = useAppSelector(cartProductsSelector);

  const customer = useAppSelector(meSelector);
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

  // const img = products.map((p) => p.imageFront);

  // const imgString = img.toString();
  // console.log(imgString);

  return (
    <div>
      <div className="grid grid-flow-row gap-4 m-4 space-x-10 h-96">
        {cartProducts && customer ? (
          cartProducts.map((product) => (
            <div className="items-center justify-center rounded cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="items-center justify-center border-black">
                <Link to={"/products/" + product._id}>
                  <img
                    className="items-center justify-center w-64"
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
                </Link>
                <div className="text-center">
                  <button
                    onClick={() => {
                      orderProduct(product._id);
                    }}
                    className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => {
                      dispatch(buyingStart(product._id, cartId!));
                    }}
                    className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
                  >
                    Delete From Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>Your cart is empty</div>
        )}
        <div>Total: ${price()}</div>
      </div>
    </div>
  );
};

Cart.defaultProps = {};

export default memo(Cart);
