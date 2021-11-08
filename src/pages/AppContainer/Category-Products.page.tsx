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

interface Props {}

const ProductsForCategories: FC<Props> = (props) => {
  const productss = useAppSelector(currentCategoryProductsSelector);
  const { categoryId } = useParams<{ categoryId: string }>();

  const error = useAppSelector(selectedErrorSelector);
  const loading = useAppSelector(selectedLoadingSelector);

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
    <div>
      <div>
        <Link className="text-blue-600 hover:text-red-500" to="/categories">
          Back to categories
        </Link>
      </div>
      {loading && <div className="text-green-500">Loading Product...</div>}

      {/* <div>{product.map((p) => p)}</div> */}
      <div className="grid grid-cols-5 gap-4 m-4 space-x-10 h-96">
        {productss &&
          productss.map((product) => (
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

ProductsForCategories.defaultProps = {};

export default memo(ProductsForCategories);
