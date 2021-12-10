import { FC, memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchOneProduct } from "../../actions/products.actions";
import { BASE_URL } from "../../api/base";
import { addAReview } from "../../api/products";
import { meSelector } from "../../selectors/auth.selectors";
import { selectedProductSelector } from "../../selectors/products.selectors";
import { useAppSelector } from "../../store";

interface Props {}

const AddReview: FC<Props> = (props) => {
  const customer = useAppSelector(meSelector);

  const history = useHistory();
  const [review, setReview] = useState("");
  const dispatch = useDispatch();
  const { productId } = useParams<{ productId: string }>();
  useEffect(() => {
    dispatch(fetchOneProduct(productId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const product = useAppSelector(selectedProductSelector);
  const p = product && product.imageCover;

  const postReview = (e: any) => {
    e.preventDefault();
    if (!customer || customer.role === "retailor") {
      history.push("/login");
    } else {
      addAReview({ review }, productId)
        .then((r) => {
          alert("review created on this product successfully");
          history.push(`/products/${productId}`);
        })
        .catch((e) => alert(e));
    }
  };

  return (
    <div>
      <div className="sm:flex sm:flex-row xxxsm:flex xxxsm:flex-col">
        <img
          alt="sdss"
          className="rounded-3xl w-60"
          src={BASE_URL + "/img/products/" + p}
        />
        <div className="pt-10 text-2xl font-semibold text-center">
          Add a Review for this product.
        </div>
      </div>
      <form onSubmit={(e) => postReview(e)}>
        <div className="py-6 text-center border-black ">
          <input
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="write your review in me"
            className="w-56 h-10 border-2 border-black rounded sm:w-96 md:w-96 lg:w-96"
          />
        </div>
        <div className="text-center">
          <button className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-green-800 border-2 border-black rounded hover:bg-green-900 w-28">
            Post review
          </button>
        </div>
      </form>
    </div>
  );
};

AddReview.defaultProps = {};

export default memo(AddReview);
