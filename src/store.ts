import { TypedUseSelectorHook, useSelector } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./reducers/auth.reducer";
import { categoryReducer } from "./reducers/categories.reducer";
import { customerReducer } from "./reducers/customer.reducer";
import { productReducer } from "./reducers/products.reducer";
import { SagaMiddleware } from "./sagas";
import { watchProductQueryChanged } from "./sagas/products.sagas";

const reducer = combineReducers({
  customers: customerReducer,
  products: productReducer,
  auth: authReducer,
  categories: categoryReducer,
});

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(SagaMiddleware))
);

SagaMiddleware.run(watchProductQueryChanged);

export type AppState = ReturnType<typeof reducer>;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
