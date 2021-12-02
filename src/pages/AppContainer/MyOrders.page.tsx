import { FC, memo, useEffect } from "react";
import { useAppSelector } from "../../store";
import {
  currentQueryProductsSelector,
  productsLoadingSelector,
  productQuerySelector,
} from "../../selectors/products.selectors";
import { Link, useHistory } from "react-router-dom";
import { fetchProducts as fetchProductsStart } from "../../api/products";

import { useDispatch } from "react-redux";
import {
  productQueryChangedAction,
  productQueryCompletedAction,
} from "../../actions/products.actions";
import { meSelector } from "../../selectors/auth.selectors";
import { BASE_URL } from "../../api/base";
import {
  myOrdersSelectors,
  ordersLoadingSelector,
} from "../../selectors/customer.selectors";
import { myOrdersBegin } from "../../actions/order.actions";
import LoadingOverlay from "react-loading-overlay-ts";

interface Props {}

const MyOrders: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loading = useAppSelector(ordersLoadingSelector);
  const orders = useAppSelector(myOrdersSelectors);

  const products = useAppSelector(currentQueryProductsSelector);

  const customer = useAppSelector(meSelector);

  var todayDate = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    dispatch(myOrdersBegin());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LoadingOverlay className="w-screen h-screen" active={loading} spinner>
      <div className="flex justify-center">
        <div className="mt-5 gap-7 sm:grid xxsm:grid-cols-1 xxsm:grid sm:grid-cols-2">
          <div className="flex flex-col space-y-10">
            {orders.length < 1 && (
              <div>You do not have any orders placed yet.</div>
            )}
            {orders.length < 1 && (
              <Link
                className="text-blue-500 underline hover:text-red-500"
                to="/products"
              >
                Continue shopping
              </Link>
            )}
          </div>
          {orders.map((order) => (
            <div className="flex flex-row items-center justify-center text-center bg-gray-100 rounded-lg cursor-pointer w-72 sm:flex sm:flex-col hover:bg-gray-200">
              <div className="items-center border-black ">
                <Link
                  className="flex justify-center space-x-4"
                  to={"/products/" + order._id}
                >
                  <img
                    className="w-40 xxsm:w-20 xxxsm:w-20s sm:w-36 xsm:w-28 rounded-xl"
                    alt="jvbjdsbj"
                    src={BASE_URL + "/img/products/" + order.imageCover}
                  />
                  <div className="space-y-5">
                    <div className="font-semibold">{order && order.name}</div>
                    <div className="font-bold text-green-600">
                      ${order.price}
                    </div>
                    <div>Paid on {todayDate}</div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LoadingOverlay>
  );
};

MyOrders.defaultProps = {};

export default memo(MyOrders);
