import {
  takeLatest,
  takeEvery,
  call,
  put,
  all,
  delay,
} from "@redux-saga/core/effects";
import { AnyAction } from "redux";
import {
  PRODUCTS_FETCH_SINGLE,
  PRODUCTS_QUERY_CHANGED,
} from "../actions/action.constants";
import {
  fetchOneProductComplete,
  productQueryCompletedAction,
} from "../actions/products.actions";
import {
  fetchOneProduct,
  fetchProducts as fetchProductsApi,
} from "../api/products";

function* fetchProducts(action: AnyAction): Generator<any> {
  yield delay(300);

  const output: any = yield call(fetchProductsApi, {
    query: action.payload,
  });
  yield put(productQueryCompletedAction(action.payload, output));
}

function* fetchOne(action: AnyAction): Generator<any> {
  const res: any = yield call(fetchOneProduct, action.payload);
  yield put(fetchOneProductComplete(res.data));
}

export function* watchProductQueryChanged() {
  yield all([
    (takeLatest(PRODUCTS_QUERY_CHANGED, fetchProducts),
    takeEvery(PRODUCTS_FETCH_SINGLE, fetchOne)),
  ]);
}
