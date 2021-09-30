import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import CategoriesPage from "./pages/AppContainer/Categories.page";
import OverViewpage from "./pages/AppContainer/OverView.page";
import Loginpage from "./pages/Auth/Login.page";
import Signuppage from "./pages/Auth/Signup.page";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login"></Redirect>
        </Route>
        <Route path="/login">
          <Loginpage></Loginpage>
        </Route>
        <Route path="/signup">
          <Signuppage></Signuppage>
        </Route>
        <Route path="/overview">
          <OverViewpage></OverViewpage>
        </Route>
        <Route path="/categories">
          <CategoriesPage></CategoriesPage>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
