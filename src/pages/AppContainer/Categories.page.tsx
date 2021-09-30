import { FC, memo } from "react";
import { Link } from "react-router-dom";

interface Props {}

const Categories: FC<Props> = (props) => {
  return (
    <div>
      This is Categories Page
      <Link to="/overview">
        <span className="text-blue-500">Go to overview</span>
      </Link>
    </div>
  );
};

Categories.defaultProps = {};

export default memo(Categories);
