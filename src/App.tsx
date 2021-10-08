import React, { Suspense, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { authActions } from "./actions/auth.actions";
import { me } from "./api/auth";
import { AUTH_TOKEN } from "./api/base";
import AppContainerPageLazy from "./pages/AppContainer/AppContainer.lazy";
import AuthPageLazy from "./pages/Auth/AuthPageLazy";
import NotFoundPage from "./pages/NotFound.page";
import { meSelector } from "./selectors/auth.selectors";
import { useAppSelector } from "./store";

function App() {
  // const customer = useSelector<AppState, Customer | undefined>(
  //   (state) => state.me
  // );

  const customer = useAppSelector(meSelector);

  const token = localStorage.getItem(AUTH_TOKEN);

  useEffect(() => {
    if (!token) {
      return;
    }

    me().then((c) => {
      console.log(c);
      // setCustomer(c);
      authActions.fetch(c);
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
              <Redirect to="/products" />
            ) : (
              <Redirect to="/login"></Redirect>
            )}
          </Route>
          <Route path={["/login", "/signup", "/forgot-password"]} exact>
            {customer ? <Redirect to="/products" /> : <AuthPageLazy />}
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
            {customer ? <AppContainerPageLazy /> : <Redirect to="/login" />}
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
