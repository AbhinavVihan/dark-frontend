import { takeEvery, call, put, all } from "@redux-saga/core/effects";
import { AnyAction } from "redux";
import {
  ADD_TO_CART_BEGIN,
  BUYING_PROCESS_BEGIN,
  CATEGORIES_FETCH_SINGLE,
  GET_CART_BEGIN,
  PRODUCTS_FETCH_SINGLE,
} from "../actions/action.constants";
import {
  fetchOneCategoryComplete,
  fetchSingleCategoryError,
} from "../actions/categories.actions";
import {
  fetchOneProductComplete,
  fetchSingleProductError,
} from "../actions/products.actions";
import {
  fetchOneProduct as fetchOneProd,
  getCart,
  addToCart as addProdToCart,
  deleteFromCart,
} from "../api/products";
import { fetchOneCategory as fetchOneCate } from "../api/categories";
import {
  addToCartComplete,
  addToCartError,
  buyingComplete,
  buyingError,
  getCartComplete as getYourCart,
  getCartError,
} from "../actions/cart.actions";
// import { authActions, loginActionComplete } from "../actions/auth.actions";

// function* fetchProducts(action: AnyAction): Generator<any> {
//   const { query } = action.payload;
//   yield delay(800);

//   const res: any = yield call(fetchProductsApi, { query });
//   yield put(productQueryCompletedAction(query, res));
// }

function* fetchOneProduct(action: AnyAction): Generator<any> {
  try {
    const res: any = yield call(fetchOneProd, action.payload);
    yield put(fetchOneProductComplete(res.data));
  } catch (e: any) {
    const error = e.response.statusText || "some error occured";
    // console.log(e.response);
    yield put(fetchSingleProductError(action.payload, error));
  }
}

function* fetchOneCart(action: AnyAction): Generator<any> {
  try {
    const res: any = yield call(getCart);
    // console.log(res.data.doc);
    yield put(getYourCart(res.data.doc));
  } catch (e: any) {
    const error = e.response.statusText || "some error occured";
    yield put(getCartError(error));
  }
}

function* deleteProductFromCart(action: AnyAction): Generator<any> {
  try {
    const res: any = yield call(
      deleteFromCart,
      action.payload.pId,
      action.payload.cId
    );
    // console.log(res.data.doc);
    yield put(buyingComplete(res.data.doc));
  } catch (e: any) {
    const error = e.response.statusText || "some error occured";
    yield put(buyingError(error));
  }
}

function* fetchOneCategory(action: AnyAction): Generator<any> {
  try {
    const res: any = yield call(fetchOneCate, action.payload);
    yield put(fetchOneCategoryComplete(res.data));
    // console.log(res.data);
  } catch (e: any) {
    const error = e.response.statusText || "some error occured";
    // console.log(e.response);
    yield put(fetchSingleCategoryError(action.payload, error));
  }
}

function* addToCart(action: AnyAction): Generator<any> {
  try {
    const res: any = yield call(
      addProdToCart,
      action.payload.pId,
      action.payload.cId
    );
    console.log(action.payload.pId);
    yield put(addToCartComplete(res.data));
    alert("added successfully");
    // console.log(res.data);
  } catch (e: any) {
    const error = e.response.statusText || "some error occured";
    yield put(addToCartError(error));
    alert("this product is already in your cart");
  }
}

// function* fetchProductsForCategory(action: AnyAction): Generator<any> {
//   try {
//     const res: any = yield call(fetchOneCate, action.payload);
//     yield put(fetchOneCategoryComplete(res.data));
//     console.log(res.data);
//   } catch (e: any) {
//     const error = e.response.statusText || "some error occured";
//     // console.log(e.response);
//     yield put(fetchSingleCategoryError(action.payload, error));
//   }
// }

export function* watchAll() {
  yield all([
    // takeEvery(LOGIN_BEGIN, login),

    takeEvery(PRODUCTS_FETCH_SINGLE, fetchOneProduct),
    takeEvery(CATEGORIES_FETCH_SINGLE, fetchOneCategory),
    takeEvery(GET_CART_BEGIN, fetchOneCart),
    takeEvery(ADD_TO_CART_BEGIN, addToCart),
    takeEvery(BUYING_PROCESS_BEGIN, deleteProductFromCart),

    // takeEvery(FETCH_PRODUCTS_FOR_CATEGORY, fetchProductsForCategory),
  ]);
}
