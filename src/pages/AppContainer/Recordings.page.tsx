import { FC, memo } from "react";
import { Link } from "react-router-dom";

interface Props {}

const Recordings: FC<Props> = (props) => {
  return (
    <div>
      <div>this is recordings page</div>
      <div>
        <Link to="/dashboard">
          <span className="text-blue-500">Go to dashboard</span>
        </Link>
      </div>
      <div>
        <Link to="/login">
          <span className="text-blue-500">Go to login page</span>
        </Link>
      </div>
    </div>
  );
};

Recordings.defaultProps = {};

export default memo(Recordings);
