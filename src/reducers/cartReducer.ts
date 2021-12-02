import { AnyAction, Reducer } from "redux";
import {
  ADD_TO_CART_ERROR,
  BUYING_PROCESS_COMPLETE,
  CREATE_CART_REQUEST_BEGIN,
  CREATE_CART_REQUEST_COMPLETE,
  GET_CART_BEGIN,
  GET_CART_COMPLETE,
  GET_CART_ERROR,
} from "../actions/action.constants";
import { buyingError } from "../actions/cart.actions";
import { Cart } from "../models/Cart";
import { EntityState, initialEntityState } from "./entity.reducer";

export interface cartState extends EntityState<Cart> {}

const initialState: cartState = {
  ...initialEntityState,
};

export const cartReducer: Reducer<cartState> = (
  state = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case CREATE_CART_REQUEST_BEGIN:
      return { ...state, loadingOne: true };
    case GET_CART_BEGIN:
      return { ...state, loadingOne: true };
    case CREATE_CART_REQUEST_COMPLETE:
    case GET_CART_COMPLETE:
    case BUYING_PROCESS_COMPLETE:
      const cart: Cart = action.payload;
      return {
        ...state,
        byId: { ...state.byId, [cart.id]: cart },
        loadingOne: false,
        selectedId: cart.id,
      };
    case GET_CART_ERROR:
    case buyingError:
    case ADD_TO_CART_ERROR:
      return { ...state, errorOne: action.payload, loadingOne: false };

    default:
      return state;
  }
};
