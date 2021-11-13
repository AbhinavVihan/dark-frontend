import { FC, memo } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { meSelector } from "../../selectors/auth.selectors";
import { useAppSelector } from "../../store";

interface Props {}

const RetailorOverview: FC<Props> = (props) => {
  const customer = useAppSelector(meSelector);

  return (
    <div className="flex flex-row">
      {customer && customer.role === "retailor" ? (
        <Link className="hover:text-red-500" to="/choose-category">
          upload a Product
        </Link>
      ) : (
        <Link className="hover:text-red-500" to="/retailor-login">
          upload a Product
        </Link>
      )}
      {/* {customer && customer?.role === "retailor" ? (
        
        <Link className=" hover:text-red-500" to="/choose-category">
        Upload a Product
      </Link>
      ) : }  */}
      <Link className=" hover:text-red-500" to="/productsRetailor">
        See all Products
      </Link>
      <Link
        className="h-20 px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
        to="/products"
      >
        Back to customer's Section
      </Link>
    </div>
  );
};

RetailorOverview.defaultProps = {};

export default memo(RetailorOverview);
