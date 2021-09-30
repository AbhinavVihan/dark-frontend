import { FC, memo } from "react";
import { Route, Switch } from "react-router-dom";
import FrontImage from "../../components/FrontImage";
import LoginPage from "./Login.page";
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
      </Switch>
      <FrontImage></FrontImage>
    </div>
  );
};

AppContainer.defaultProps = {};

export default memo(AppContainer);
