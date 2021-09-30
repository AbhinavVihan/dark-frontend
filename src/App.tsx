import React, { Suspense } from "react";
// import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// import NotFoundPage from "./pages/NotFound.page";
// import { AUTH_TOKEN } from "./api/base";
// import AppContainerPageLazy from "./pages/AppContainer/AppContainer.lazy";
// import AuthPageLazy from "./pages/Auth/Auth.lazy";
// import { useEffect } from "react";
// // import { useAppSelector } from "./store";
// // import { meSelector } from "./selectors/auth.selectors";
// import { me } from "./api/auth";
// // import { authActions } from "./actions/auth.actions";

// interface Props {}

// const App: React.FC<Props> = (props) => {
//   const customer = useAppSelector(meSelector);

//   const token = localStorage.getItem(AUTH_TOKEN);

//   useEffect(() => {
//     if (!token) {
//       return;
//     }

//     me().then((u) => authActions.fetch(u));
//   }, []); // eslint-disable-line

//   if (!customer && token) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <Suspense
//         fallback={
//           <div className="text-red-500">Loading App container Page</div>
//         }
//       >
//         <BrowserRouter>
//           <Switch>
//             <Route path="/" exact>
//               {customer ? (
//                 <Redirect to="/dashboard" />
//               ) : (
//                 <Redirect to="/login" />
//               )}
//             </Route>
//             <Route path={["/login", "/signup"]} exact>
//               {customer ? <Redirect to="/dashboard" /> : <AuthPageLazy />}
//             </Route>
//             <Route
//               path={[
//                 "/dashboard",
//                 "/recordings",
//                 "/groups/:groupId",
//                 "/batch/:batchNumber/lecture/:lectureNumber",
//               ]}
//               exact
//             >
//               {customer ? <AppContainerPageLazy /> : <Redirect to="/login" />}
//             </Route>
//             <Route component={NotFoundPage} />
//           </Switch>
//         </BrowserRouter>
//       </Suspense>
//     </div>
//   );
// };

// export default App;
