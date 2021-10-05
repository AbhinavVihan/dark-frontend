import { TypedUseSelectorHook, useSelector } from "react-redux";
import { AnyAction, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Categories } from "./models/Categories";
import { Customer } from "./models/Customer";
import { Products } from "./models/Products";
import { Review } from "./models/ProductSingle";

const ME_FETCH = "me/fetch";

export interface AppState {
  me?: Customer;
  customers: Customer[];
  products: Products[];
  categories: Categories[];
  reviews: Review[];
}

const initialState: AppState = {
  me: undefined,
  customers: [],
  products: [],
  categories: [],
  reviews: [],
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case "me/login":
    case ME_FETCH:
      return { ...state, me: action.payload };
    default:
      return state;
  }
};

// export const store = createStore(reducer);

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware())
);

export const meFetchAction = (c: Customer) => ({
  type: ME_FETCH,
  payload: c,
});

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
