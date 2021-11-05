import { FC, memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOneProduct } from "../../actions/products.actions";
import { Product, Products } from "../../models/Products";
import { fetchProductsForCategory } from "../../api/products";
import { fetchProductsForCategory as fetchProductsForCategories } from "../../actions/products.actions";

import { selectedCategorySelector } from "../../selectors/categories.selectors";
import {
  selectedProductSelector,
  selectedErrorSelector,
  selectedLoadingSelector,
  productCategoryIdSelector,
} from "../../selectors/products.selectors";
import { useAppSelector } from "../../store";
import { fetchOneCategory } from "../../actions/categories.actions";

interface Props {}

const ProductsForCategories: FC<Props> = (props) => {
  const [products, setProducts] = useState<Product[]>([]);

  const { categoryId } = useParams<{ categoryId: string }>();
  // console.log(categoryId);

  //   const category = useAppSelector(productCategoryIdSelector);
  //   const products = useAppSelector(state => state.products.categoryId)
  const error = useAppSelector(selectedErrorSelector);
  const loading = useAppSelector(selectedLoadingSelector);

  const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(fetchProductsForCategory(categoryId, category));
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [categoryId]);

  useEffect(() => {
    fetchProductsForCategory(categoryId).then((p) => {
      dispatch(fetchOneCategory(categoryId));
      setProducts(p);
      dispatch(fetchProductsForCategories(categoryId, p));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  const product = products.map((p) => p.name);
  const photoArray = products.map((p) => p.imageFront);
  const imgFront = photoArray.toString();

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
      {/* {loading && <div className="text-green-500">Loading Product...</div>} */}

      <div>{product.map((p) => p)}</div>
      <img
        alt="ajvhbv"
        src={"http://localhost:8000/img/products/" + imgFront}
      />

      <div>
        {products.map((p) => {
          <div className="text-black">Hello there</div>;
          <img
            alt="sjfbsjv"
            src={"http://localhost:8000/img/products/" + imgFront}
          />;
        })}
      </div>
      {/* {product && (
        <div>
          this is the details of {product.name} (id: {productId}) whose image is
          <img
            alt="imhfdb"
            src={"http://localhost:8000/img/products/" + product.imageCover}
          />
        </div>
      )} */}
      {/* <Link to={"/products/" + (productId + 1)}>next product</Link> */}
    </div>
  );
};

ProductsForCategories.defaultProps = {};

export default memo(ProductsForCategories);
