import {
  takeLatest,
  takeEvery,
  call,
  put,
  all,
} from "@redux-saga/core/effects";
import { AnyAction } from "redux";
import {
  CATEGORIES_FETCH_SINGLE,
  FETCH_PRODUCTS_FOR_CATEGORY,
  PRODUCTS_FETCH_SINGLE,
  PRODUCTS_QUERY_CHANGED,
} from "../actions/action.constants";
import {
  fetchOneCategoryComplete,
  fetchSingleCategoryError,
} from "../actions/categories.actions";
import {
  fetchOneProductComplete,
  fetchSingleProductError,
  productQueryCompletedAction,
} from "../actions/products.actions";
import { fetchOneProduct as fetchOneProd } from "../api/products";
import { fetchOneCategory as fetchOneCate } from "../api/categories";

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
    takeEvery(PRODUCTS_FETCH_SINGLE, fetchOneProduct),
    takeEvery(CATEGORIES_FETCH_SINGLE, fetchOneCategory),
    // takeEvery(FETCH_PRODUCTS_FOR_CATEGORY, fetchProductsForCategory),
  ]);
}
