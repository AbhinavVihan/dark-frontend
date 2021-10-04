import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { me } from "./api/auth";
import { AUTH_TOKEN } from "./api/base";
import { Customer } from "./models/Customer";
import AppConteinerPageLazy from "./pages/AppContainer/AppContainer.lazy";
import AppContainerPage from "./pages/AppContainer/AppContainer.page";
import AuthPage from "./pages/Auth/Auth.page";
import AuthPageLazy from "./pages/Auth/AuthPageLazy";
import NotFoundPage from "./pages/NotFound.page";

function App() {
  const [customer, setCustomer] = useState<Customer>();

  const token = localStorage.getItem(AUTH_TOKEN);

  useEffect(() => {
    if (!token) {
      return;
    }

    me().then((c) => {
      console.log(c);
      setCustomer(c);
    });
  }, []);

  if (!customer && token) {
    return <div>loading...</div>;
  }

  return (
    <Suspense fallback={<div className="text-red-500">Loading...</div>}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            {customer ? (
              <Redirect to="/overview" />
            ) : (
              <Redirect to="/login"></Redirect>
            )}
          </Route>
          <Route path={["/login", "/signup", "/forgot-password"]} exact>
            {customer ? (
              <Redirect to="/overview" />
            ) : (
              <AuthPageLazy onLogin={setCustomer} />
            )}
          </Route>
          <Route
            path={[
              "/overview",
              "/categories",
              "/products",
              "/products/:productId",
            ]}
            exact
          >
            {customer ? (
              <AppConteinerPageLazy customer={customer!} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
