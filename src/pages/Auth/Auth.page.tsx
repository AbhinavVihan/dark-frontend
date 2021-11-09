import { FC, memo } from "react";
import { Route, Switch } from "react-router-dom";
import FrontImage from "../../components/FrontImage";
import BeforeSettingPasswordPage from "./BeforeSettingPassword.page";
import ForgotpasswordPage from "./Forgotpassword.page";
import LoginPage from "./Login.page";
import ResetpasswordPage from "./Resetpassword.page";
import SignupPage from "./Signup.page";

interface Props {}

const AppContainer: FC<Props> = (props) => {
  return (
    <div className="flex flex-row justify-between">
      <Switch>
        <Route path="/login">
          <LoginPage></LoginPage>
        </Route>
        <Route path="/signup">
          <SignupPage></SignupPage>
        </Route>
        <Route path="/forgot-password">
          <ForgotpasswordPage></ForgotpasswordPage>
        </Route>
        <Route path="/token">
          <BeforeSettingPasswordPage></BeforeSettingPasswordPage>
        </Route>
        <Route path="/resetPassword">
          <ResetpasswordPage></ResetpasswordPage>
        </Route>
      </Switch>
      <FrontImage></FrontImage>
    </div>
  );
};

AppContainer.defaultProps = {};

export default memo(AppContainer);
