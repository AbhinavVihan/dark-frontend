import { takeEvery, call, put } from "@redux-saga/core/effects";
import { AnyAction } from "redux";
import { PRODUCTS_QUERY_CHANGED } from "../actions/action.constants";
import { productQueryCompletedAction } from "../actions/products.actions";
import { fetchProducts as fetchProductsApi } from "../api/products";

export function* fetchProducts(action: AnyAction): Generator<any> {
  const output: any = yield call(fetchProductsApi, {
    query: action.payload,
  });
  yield put(productQueryCompletedAction(action.payload, output));
}

export function* watchProductQueryChanged() {
  yield takeEvery(PRODUCTS_QUERY_CHANGED, fetchProducts);
}
