import React, { Suspense, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
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

  return (
    <Suspense fallback={<div className="text-red-500">Loading...</div>}>
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
            <AuthPageLazy onLogin={setCustomer} />
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
            <AppConteinerPageLazy customer={customer!} />
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
