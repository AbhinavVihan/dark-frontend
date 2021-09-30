import { FC, memo } from "react";
import { Link } from "react-router-dom";

interface Props {}

const OverView: FC<Props> = (props) => {
  return (
    <div>
      This is OverView Page
      <Link to="/categories">
        <span className="text-blue-500">Search by categories</span>
      </Link>
    </div>
  );
};

OverView.defaultProps = {};

export default memo(OverView);
