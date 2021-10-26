import { FC, memo, useEffect } from "react";
import { Link } from "react-router-dom";
// import { fetchProducts } from "../../api/products";

interface Props {}

const OverView: FC<Props> = (props) => {
  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = () => {};

  return (
    <div>
      This is OverView Page
      <button>click Me</button>
      {/* {details && <img alt="me" src={details} />} */}
      <Link to="/categories">
        <span className="text-blue-500">Search by categories</span>
      </Link>
    </div>
  );
};

OverView.defaultProps = {};

export default memo(OverView);
