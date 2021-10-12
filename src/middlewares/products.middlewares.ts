import { useDispatch } from "react-redux";
// import {
//   ProductRequest,
//   fetchProducts as fetchProductsApi,
// } from "../api/products";
// import { productQueryMapSelector } from "../selectors/products.selectors";
// import { store } from "../store";

// export const fetchProducts = (request: ProductRequest) => {

//   const queryMap = productQueryMapSelector(store.getState());

//   const query = request.query;
//   const productIds = queryMap[query];

//   // productActions.queryChanged(query, !productIds);

//   if (productIds) {
//     return;
//   }

//   fetchProductsApi(request).then((products) => {
//     productActions.queryCompleted(query, products);
//   });
// };
