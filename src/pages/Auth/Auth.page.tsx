import { FC, memo } from "react";
import { Route, Switch } from "react-router-dom";
import AuthHero from "../../sidebars and all/AuthHero";
import SignupPage from "./Signup.page";
import LoginPage from "./Login.page";

interface Props {}

const Auth: FC<Props> = (props) => {
  return (
    <div className="flex flex-row justify-between">
      <Switch>
        <Route path="/login">
          <LoginPage></LoginPage>
        </Route>
        <Route path="/signup" component={SignupPage} />
      </Switch>
      <AuthHero className="hidden lg:block" />
    </div>
  );
};

Auth.defaultProps = {};

export default memo(Auth);
