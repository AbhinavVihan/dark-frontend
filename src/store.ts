import { TypedUseSelectorHook, useSelector } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./reducers/auth.reducer";
import { customerReducer } from "./reducers/customer.reducer";
import { productReducer } from "./reducers/products.reducer";

const reducer = combineReducers({
  customers: customerReducer,
  products: productReducer,
  auth: authReducer,
});

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware())
);

type AppState = ReturnType<typeof reducer>;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;