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
  const { query } = action.payload;
  yield delay(300);

  const res: any = yield call(fetchProductsApi, { query });
  yield put(productQueryCompletedAction(query, res));
}

function* fetchOne(action: AnyAction): Generator<any> {
  const res: any = yield call(fetchOneProduct, action.payload);
  yield put(fetchOneProductComplete(res.data));
}

export function* watchProductQueryChanged() {
  yield takeLatest(PRODUCTS_QUERY_CHANGED, fetchProducts);
  yield takeEvery(PRODUCTS_FETCH_SINGLE, fetchOne);
}
