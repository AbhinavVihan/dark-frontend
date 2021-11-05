import { FC, memo, useEffect } from "react";
import { useAppSelector } from "../../store";
import Input from "../../components/input";
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

interface Props {}

const Products: FC<Props> = (props) => {
  const dispatch = useDispatch();

  const query = useAppSelector(productQuerySelector);

  const loading = useAppSelector(productsLoadingSelector);

  const products = useAppSelector(currentQueryProductsSelector);

  useEffect(() => {
    fetchProductsStart({ query }).then((products) => {
      dispatch(productQueryCompletedAction(query, products));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const img = products.map((p) => p.imageFront);

  const imgString = img.toString();
  console.log(imgString);

  return (
    <div>
      <Link to="/categories">
        <span className="text-blue-500 hover:text-red-500">
          Search by categories
        </span>
      </Link>
      <div>This is the products page</div>
      <div className="bottom-36">
        <input
          className="relative h-10 transition-all border-2 border-black rounded w-96 "
          type="text"
          value={query}
          onChange={(e) => {
            // productActions.queryChanged(e.target.value, true);
            dispatch(productQueryChangedAction(e.target.value, true));
          }}
        ></input>
      </div>
      {loading && <FaSpinner className="mt-5 animate-spin"></FaSpinner>}
      <div className="flex space-x-5 ">
        {products &&
          products.map((product) => (
            <div className="cursor-pointer">
              <Link
                className="hover:text-red-500"
                to={"/products/" + product._id}
              >
                {/* <img alt="sjfbahva" src={imgString} /> */}
                <img
                  alt="jvbjdsbj"
                  src={
                    "http://127.0.0.1:8000/img/products/" + product.imageFront
                  }
                />
                {product && product.name}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

Products.defaultProps = {};

export default memo(Products);

// width: 100%;
// height: 56px;
// border-radius: 4px;
// position: relative;
// background-color: rgba(255,255,255,0.3);
// transition: 0.3s all
