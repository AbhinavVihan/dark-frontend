import { FC, memo } from "react";
import { Link } from "react-router-dom";
interface Props {}

const Login: FC<Props> = (props) => {
  return (
    <div className="flex flex-row justify-between">
      This is Login Page. Don't have an account.{" "}
      <Link to="/signup">
        <span className="text-blue-500">Click here</span>
      </Link>
      <Link to="/overview">
        <span className="text-blue-500">Go to Overview</span>
      </Link>
    </div>
  );
};

Login.defaultProps = {};

export default memo(Login);
