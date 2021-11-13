import { FC, memo, useEffect } from "react";
import { useAppSelector } from "../../store";
import {
  currentQueryProductsSelector,
  productsLoadingSelector,
  productQuerySelector,
} from "../../selectors/products.selectors";
import { Link } from "react-router-dom";
import { fetchProducts as fetchProductsStart } from "../../api/products";

import { FaSpinner } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  productQueryChangedAction,
  productQueryCompletedAction,
} from "../../actions/products.actions";
import { meSelector } from "../../selectors/auth.selectors";
import { BASE_URL } from "../../api/base";
import { AiFillHome } from "react-icons/ai";

interface Props {}

const ProductForRetailor: FC<Props> = (props) => {
  const dispatch = useDispatch();

  const query = useAppSelector(productQuerySelector);

  const loading = useAppSelector(productsLoadingSelector);

  const products = useAppSelector(currentQueryProductsSelector);

  const customer = useAppSelector(meSelector);

  useEffect(() => {
    fetchProductsStart({ query }).then((products) => {
      dispatch(productQueryCompletedAction(query, products));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // const img = products.map((p) => p.imageFront);

  // const imgString = img.toString();
  // console.log(imgString);

  return (
    <div>
      <div className="flex items-center justify-end space-x-4 align-middle">
        <Link className="hover:text-red-500" to="retailor-overview">
          <AiFillHome></AiFillHome>
        </Link>
        <div>
          {customer?.role === "retailor" ? (
            <Link className="text-blue-500 hover:text-red-500" to="/my-account">
              <span className="text-black">Hi</span> {customer.name}{" "}
              <span className="text-black">(retailor)</span>
            </Link>
          ) : (
            <Link
              className="text-blue-500 hover:text-red-500"
              to="/retailor-login"
            >
              Login as retailor
            </Link>
          )}
        </div>
      </div>

      {/* {customer && customer.role === "retailor" && (
        <Link className="text-blue-500 hover:text-red-500" to="/my-account">
          <span className="text-black">Hi</span> {customer.name}{" "}
          <span className="text-black">(retailor)</span>
        </Link>
      )} */}

      {/* {customer && customer?.role === "retailor" ? (
        <Link className="text-blue-500 hover:text-red-500" to="/my-account">
          <span className="text-black">Hi</span> {customer.name}{" "}
          <span className="text-black">(retailor)</span>
        </Link>
      ) : (
        <Link className="text-blue-500 hover:text-red-500" to="/retailor-login">
          Login as retailor
        </Link>
      )} */}

      <div className="text-center ">Search for Products Here</div>
      <div className="mb-10 text-center ">
        <input
          className="h-10 border-2 border-black rounded w-96"
          type="text"
          value={query}
          placeholder="Hi"
          onChange={(e) => {
            // productActions.queryChanged(e.target.value, true);
            dispatch(productQueryChangedAction(e.target.value, true));
          }}
        ></input>
      </div>
      {loading && <FaSpinner className="mt-5 animate-spin"></FaSpinner>}
      <div className="grid grid-cols-5 gap-4 m-4 space-x-10 h-96">
        {products.map((product) => (
          <div className="items-center justify-center rounded cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="items-center justify-center border-black">
              <Link to={"/products/" + product._id + "/retailor"}>
                <img
                  className="items-center justify-center w-full"
                  alt="jvbjdsbj"
                  src={BASE_URL + "/img/products/" + product.imageFront}
                />
                <div className="flex justify-around">
                  <div className="font-semibold">{product && product.name}</div>
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

ProductForRetailor.defaultProps = {};

export default memo(ProductForRetailor);
