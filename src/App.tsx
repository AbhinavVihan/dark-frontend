import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { AUTH_TOKEN } from "./api/base";
import AppContainerPage from "./pages/AppContainer/AppContainer.page";
import AuthPage from "./pages/Auth/Auth.page";
import NotFoundPage from "./pages/NotFound.page";

function App() {
  const token = localStorage.getItem(AUTH_TOKEN);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {token ? (
            <Redirect to="/overview" />
          ) : (
            <Redirect to="/login"></Redirect>
          )}
        </Route>
        <Route path={["/login", "/signup", "/forgot-password"]} exact>
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
