import { FC, memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchProductsForCategory } from "../../api/products";
import { fetchProductsForCategory as fetchProductsForCategories } from "../../actions/products.actions";

import {
  selectedErrorSelector,
  selectedLoadingSelector,
  currentCategoryProductsSelector,
} from "../../selectors/products.selectors";
import { useAppSelector } from "../../store";
import { fetchOneCategory } from "../../actions/categories.actions";
import { BASE_URL } from "../../api/base";
import LoadingOverlay from "react-loading-overlay-ts";
import { meSelector } from "../../selectors/auth.selectors";

interface Props {}

const ProductsForCategories: FC<Props> = (props) => {
  const productss = useAppSelector(currentCategoryProductsSelector);
  const { categoryId } = useParams<{ categoryId: string }>();

  const error = useAppSelector(selectedErrorSelector);
  const loading = useAppSelector(selectedLoadingSelector);
  const customer = useAppSelector(meSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchProductsForCategory(categoryId).then((p) => {
      dispatch(fetchOneCategory(categoryId));
      dispatch(fetchProductsForCategories(categoryId, p));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  if (error) {
    return (
      <div>
        <div className="text-red-500">{error}</div>
        {/* <Link to={"/products/" + (productId + 1)}>next product</Link> */}
      </div>
    );
  }

  return (
    <LoadingOverlay className="w-screen h-screen" active={loading} spinner>
      <div>
        <div>
          <Link className="text-blue-600 hover:text-red-500" to="/categories">
            Back to categories
          </Link>
        </div>
        <div className="h-20 pt-5 pr-3 space-x-2 text-xs font-semibold text-right text-white bg-black sm:space-x-3 md:text-base justify-items-end sm:text-sm">
          <Link className=" hover:text-red-500" to="/categories">
            Back to categories
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

        <div className="pb-5 mt-5 space-x-10 xxsm:space-y-10 xxsm:mx-auto xxsm:grid-cols-1 xxsm:grid xsm:space-y-5 xsm:mx-3 xsm:w-auto 2xl:grid 2xl:grid-cols-5 xsm:grid xsm:grid-cols-2 sm:mx-3 xl:mx-10 md:grid md:grid-cols-3 sm:w-auto md:w-auto w-60 sm:grid sm:grid-cols-2 lg:grid lg:grid-cols-4">
          {productss &&
            productss.map((product) => (
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
      {productss && productss.length < 1 && !loading && (
        <div className="flex items-center justify-center text-center">
          No products belong to this category yet.
        </div>
      )}
    </LoadingOverlay>
  );
};

ProductsForCategories.defaultProps = {};

export default memo(ProductsForCategories);
