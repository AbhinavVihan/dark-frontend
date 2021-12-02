import { FC, memo, useEffect, useState } from "react";
import { useAppSelector } from "../../store";
import {
  currentQueryProductsSelector,
  productsLoadingSelector,
  productQuerySelector,
} from "../../selectors/products.selectors";
import { Link, useHistory } from "react-router-dom";
import { fetchProducts as fetchProductsStart } from "../../api/products";

import { useDispatch, useStore } from "react-redux";
import {
  productQueryChangedAction,
  productQueryCompletedAction,
} from "../../actions/products.actions";
import { meSelector } from "../../selectors/auth.selectors";
import { BASE_URL } from "../../api/base";
import LoadingOverlay from "react-loading-overlay-ts";
import Sidebar from "../../components/Sidebar";

interface Props {}

const Products: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

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

  return (
    <LoadingOverlay className="w-screen h-screen" active={loading} spinner>
      <div className="h-20 pt-5 pr-3 space-x-2 text-xs font-semibold text-right text-white bg-black sm:space-x-3 md:text-base justify-items-end sm:text-sm">
        <Link className=" hover:text-red-500" to="/categories">
          Search by categories
        </Link>
        {!customer && (
          <Link className=" hover:text-red-500" to="/login">
            Login
          </Link>
        )}
        {customer && customer.role === "customer" && (
          <Link className=" hover:text-red-500" to="/my-account">
            MyAccount
          </Link>
        )}
        {customer && customer.role === "retailor" && (
          <Link className=" hover:text-red-500" to="/login">
            Login
          </Link>
        )}
        {customer && customer.role === "customer" && (
          <Link className=" hover:text-red-500" to="/my-orders">
            Orders
          </Link>
        )}
        {customer && customer.role === "customer" && (
          <Link className=" hover:text-red-500" to="/cart">
            Cart
          </Link>
        )}
      </div>

      <div className="py-6 text-center bg-gray-800 border-black ">
        <input
          className="w-56 h-10 border-2 border-black rounded sm:w-96 md:w-96 lg:w-96"
          type="text"
          value={query}
          placeholder="Search for Products Here"
          onChange={(e) => {
            // productActions.queryChanged(e.target.value, true);
            dispatch(productQueryChangedAction(e.target.value, true));
          }}
        ></input>
      </div>

      <div className="flex flex-col sm:flex sm:flex-row ">
        <Sidebar></Sidebar>

        <div className="pb-5 mt-5 space-x-10 xxsm:space-y-10 xxsm:mx-auto xxsm:grid-cols-1 xxsm:grid xsm:space-y-5 xsm:mx-3 xsm:w-auto 2xl:grid 2xl:grid-cols-5 xsm:grid xsm:grid-cols-2 sm:mx-3 xl:mx-10 md:grid md:grid-cols-3 sm:w-auto md:w-auto w-60 sm:grid sm:grid-cols-2 lg:grid lg:grid-cols-4">
          {products.map((product) => (
            <div className="rounded cursor-pointer bg-gray-50 hover:bg-gray-200">
              <div className="border-black ">
                <Link to={"/products/" + product._id}>
                  <img
                    className="w-full rounded-lg "
                    alt="jvbjdsbj"
                    src={BASE_URL + "/img/products/" + product.imageFront}
                  />
                  <div className="flex justify-around pb-5">
                    <div className="text-sm font-semibold sm:text-sm md:text-base">
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
      {products.length < 1 && !loading && (
        <div className="flex items-center justify-center text-center">
          No products found for that query.
        </div>
      )}
    </LoadingOverlay>
  );
};

Products.defaultProps = {};

export default memo(Products);
