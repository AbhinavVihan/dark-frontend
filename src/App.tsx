import React, { Suspense, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
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

    me();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!customer && token) {
    return <div>loading...</div>;
  }

  return (
    <Suspense fallback={<div className="text-red-500">Loading...</div>}>
      <BrowserRouter>
        <Switch>
          {/* <Route path="/cart" exact>
            {!customer && <Redirect to="/products" />}
          </Route> */}

          <Route path="/" exact>
            <Redirect to="/products" />
          </Route>
          <Route
            path={[
              "/overview",
              "/categories",
              "/products",
              "/categories/:categoryId",
              "/categories/:categoryId/products",
              "/products/:productId",
              "/my-account",
              "/my-password",
              "/cart",
            ]}
            exact
          >
            {/* {customer ? <AppContainerPageLazy /> : <Redirect to="/login" />} */}
            <AppContainerPageLazy />
          </Route>
          <Route
            path={[
              "/login",
              "/signup",
              "/forgot-password",
              "/token",
              "/resetPassword",
            ]}
            exact
          >
            {/* {customer ? <Redirect to="/products" /> : <AuthPageLazy />} */}
            <AuthPageLazy />
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
