import { FC, memo, useEffect } from "react";
import { useAppSelector } from "../../store";

import { Link } from "react-router-dom";
import { deleteAnOrder } from "../../api/products";

import { useDispatch } from "react-redux";

import { BASE_URL } from "../../api/base";
import { retailorAllOrdersBegin } from "../../actions/order.actions";
import {
  retailorAllOrderRealSelector,
  retailorAllOrdersLoadingSelector,
} from "../../selectors/customer.selectors";
import { AiFillHome } from "react-icons/ai";
import LoadingOverlay from "react-loading-overlay-ts";

interface Props {}

const AllOrders: FC<Props> = (props) => {
  const dispatch = useDispatch();

  const loading = useAppSelector(retailorAllOrdersLoadingSelector);

  const orders = useAppSelector(retailorAllOrderRealSelector);

  useEffect(() => {
    dispatch(retailorAllOrdersBegin());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LoadingOverlay className="w-screen h-screen" active={loading} spinner>
      <div>
        <div className="items-end justify-end space-x-3 space-x-5 text-right">
          <Link className="hover:text-red-500" to="retailor-overview">
            <AiFillHome></AiFillHome>
          </Link>{" "}
        </div>
        {orders.length < 1 && <div>Nothing here</div>}

        <div className="text-center "></div>
        <div className="grid h-auto grid-flow-row gap-4 m-4 ">
          {orders.map((order) => (
            <div className="items-center justify-center rounded bg-gray-50 hover:bg-gray-200 hover:border-black">
              <div className="flex flex-col items-center justify-center space-x-20 text-xs border-black sm:flex sm:flex-row">
                <Link
                  className="cursor-pointer "
                  to={
                    "/products/" +
                    (order.product && order.product._id) +
                    "/retailor"
                  }
                >
                  <img
                    className="items-center justify-center w-48 rounded-xl"
                    alt="jvbjdsbj"
                    src={
                      BASE_URL +
                      "/img/products/" +
                      (order.product && order.product.imageFront)
                    }
                  />
                  <div className="flex justify-around">
                    <div className="font-semibold">
                      {order.product && order.product.name}
                    </div>
                    <div className="font-bold text-green-600">
                      ${order.product && order.product.price}
                    </div>
                  </div>
                </Link>

                <div className="flex flex-col items-center justify-center">
                  Placed by: {order.customer.name}
                  <img
                    className="w-20 rounded-full"
                    alt="sdhvhsvhs"
                    src={`${BASE_URL}/img/customers/${order.customer.photo}`}
                  />
                  <button
                    onClick={() => {
                      deleteAnOrder(order._id).then(() => {
                        dispatch(retailorAllOrdersBegin());
                      });
                      // window.location.href = "/all-orders";
                    }}
                    className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-red-800 border-2 border-black rounded hover:bg-red-900 w-28"
                  >
                    Delete Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LoadingOverlay>
  );
};

AllOrders.defaultProps = {};

export default memo(AllOrders);
