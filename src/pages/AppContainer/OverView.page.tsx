import { FC, memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../api/products";

interface Props {}

const OverView: FC<Props> = (props) => {
  const [details, setDetails] = useState<string>();
  // const products = fetchProducts().then((el) => {
  //   el.map((el) => el.imageFront);
  // });

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = () => {
    const products = fetchProducts();
    products.then((el) => {
      const imgArray = el.map((el) => {
        return el.imageFront;
      });
      setDetails("https://dark-2.herokuapp.com/img/products/" + imgArray[2]);
      console.log(details);
    });
  };

  // console.log(details);

  return (
    <div>
      This is OverView Page
      <button>click Me</button>
      {details && <img alt="me" src={details} />}
      <Link to="/categories">
        <span className="text-blue-500">Search by categories</span>
      </Link>
    </div>
  );
};

OverView.defaultProps = {};

export default memo(OverView);
