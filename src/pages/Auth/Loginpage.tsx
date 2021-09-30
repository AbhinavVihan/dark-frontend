import { FC, memo } from "react";

interface Props {}

const Login: FC<Props> = (props) => {
  return <div>This is Login Page</div>;
};

Login.defaultProps = {};

export default memo(Login);
