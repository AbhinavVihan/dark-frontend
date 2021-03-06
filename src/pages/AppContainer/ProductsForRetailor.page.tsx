import { FC, memo, useEffect } from "react";
import { useAppSelector } from "../../store";
import {
  currentQueryProductsSelector,
  productsLoadingSelector,
  productQuerySelector,
} from "../../selectors/products.selectors";
import { Link } from "react-router-dom";
import { fetchProducts as fetchProductsStart } from "../../api/products";

import { useDispatch } from "react-redux";
import {
  productQueryChangedAction,
  productQueryCompletedAction,
} from "../../actions/products.actions";
import { meSelector } from "../../selectors/auth.selectors";
// import { BASE_URL } from "../../api/base";
import { AiFillHome } from "react-icons/ai";
import LoadingOverlay from "react-loading-overlay-ts";

interface Props {}

const ProductForRetailor: FC<Props> = (props) => {
  const dispatch = useDispatch();

  const query = useAppSelector(productQuerySelector);

  const loading = useAppSelector(productsLoadingSelector);

  const products = useAppSelector(currentQueryProductsSelector);

  const customer = useAppSelector(meSelector);

  useEffect(() => {
    fetchProductsStart({ query }).then((products) => {
      dispatch(productQueryCompletedAction(query, products!));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // const img = products.map((p) => p.imageFront);

  // const imgString = img.toString();
  // console.log(imgString);

  return (
    <LoadingOverlay className="w-screen h-screen" active={loading} spinner>
      <div>
        <div className="flex items-center justify-end h-20 space-x-4 text-xs font-semibold text-right text-white align-middle bg-black sm:space-x-3 md:text-base justify-items-end sm:text-sm">
          <Link className="hover:text-red-500" to="retailor-overview">
            <AiFillHome></AiFillHome>
          </Link>
          <div className="pr-3">
            {customer?.role === "retailor" ? (
              <Link className="text-white hover:text-red-500" to="/my-account">
                <span className="text-black">Hi</span> {customer.name}{" "}
                <span className="text-black">(retailor)</span>
              </Link>
            ) : (
              <Link
                className="text-white hover:text-red-500"
                to="/retailor-login"
              >
                Login as retailor
              </Link>
            )}
          </div>
        </div>

        <div className="py-6 text-center bg-gray-800 border-black ">
          <input
            // className="h-10 border-2 border-black rounded w-96"
            className="w-56 h-10 border-2 border-black rounded sm:w-96 md:w-96 lg:w-96"
            type="text"
            value={query}
            placeholder="Hi"
            onChange={(e) => {
              // productActions.queryChanged(e.target.value, true);
              dispatch(productQueryChangedAction(e.target.value, true));
            }}
          ></input>
        </div>
        <div className="flex flex-col sm:flex sm:flex-row ">
          {/* <Sidebar></Sidebar> */}
          <div className="m-auto mt-10 xxsm:grid-cols-1 xxsm:grid 2xl:grid 2xl:grid-cols-5 xsm:grid xsm:grid-cols-2 xxsm:gap-8 lg:gap-14 md:grid md:grid-cols-3 md:gap-14 xl:mx-auto 2xl:gap-10 lg:mx-auto sm:grid sm:grid-cols-2 lg:grid lg:grid-cols-4">
            {products.map((product) => (
              <div className="rounded cursor-pointer bg-gray-50 hover:bg-gray-200">
                <div className="border-black ">
                  <Link to={"/products/" + product._id + "/retailor"}>
                    <img
                      className="rounded-lg xxxsm:w-48 xsm:w-52 sm:w-44 md:w-52"
                      alt="jvbjdsbj"
                      src={product.imageFront}
                    />
                    <div className="flex justify-around pb-5 xxxsm:w-48 ">
                      <div className="font-semibold xxxsm:text-xs sm:text-sm md:text-base">
                        {product && product.name}
                      </div>
                      <div className="font-bold text-green-600">
                        ${product.price}
                      </div>
                    </div>
                    <div className="pb-5 text-xl font-bold text-center text-green-600">
                      Free Delivery
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
};

ProductForRetailor.defaultProps = {};

export default memo(ProductForRetailor);
