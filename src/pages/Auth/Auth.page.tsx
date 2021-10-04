import { FC, memo } from "react";
import { Route, Switch } from "react-router-dom";
import FrontImage from "../../components/FrontImage";
import { Customer } from "../../models/Customer";
import ForgotpasswordPage from "./Forgotpassword.page";
import LoginPage from "./Login.page";
import SignupPage from "./Signup.page";

interface Props {
  onLogin: (customer: Customer) => void;
}

const AppContainer: FC<Props> = (props) => {
  return (
    <div className="flex flex-row justify-between">
      <Switch>
        <Route path="/login">
          <LoginPage onLogin={props.onLogin}></LoginPage>
        </Route>
        <Route path="/signup">
          <SignupPage></SignupPage>
        </Route>
        <Route path="/forgot-password">
          <ForgotpasswordPage></ForgotpasswordPage>
        </Route>
      </Switch>
      <FrontImage></FrontImage>
    </div>
  );
};

AppContainer.defaultProps = {};

export default memo(AppContainer);
