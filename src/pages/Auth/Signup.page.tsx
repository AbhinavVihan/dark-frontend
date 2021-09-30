import { FC, memo } from "react";
import { Link } from "react-router-dom";

interface Props {}

const Signup: FC<Props> = (props) => {
  return (
    <div>
      This is Signup Page. Already have an account.
      <Link to="/login">
        <span className="text-blue-500">Click here</span>
      </Link>
    </div>
  );
};

Signup.defaultProps = {};

export default memo(Signup);
