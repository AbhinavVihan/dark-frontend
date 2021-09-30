import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import AppContainerPage from "./pages/AppContainer/AppContainer.page";
import AuthPage from "./pages/Auth/Auth.page";
import NotFoundPage from "./pages/NotFound.page";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login"></Redirect>
        </Route>
        <Route path={["/login", "/signup"]} exact>
          <AuthPage />
        </Route>
        <Route
          path={["/overview", "/categories", "/products/:productId"]}
          exact
        >
          <AppContainerPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
