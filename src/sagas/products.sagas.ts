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
  fetchSingleProductError,
  productQueryCompletedAction,
} from "../actions/products.actions";
import {
  fetchOneProduct,
  fetchProducts as fetchProductsApi,
} from "../api/products";

function* fetchProducts(action: AnyAction): Generator<any> {
  const { query } = action.payload;
  yield delay(800);

  const res: any = yield call(fetchProductsApi, { query });
  yield put(productQueryCompletedAction(query, res));
}

function* fetchOne(action: AnyAction): Generator<any> {
  try {
    const res: any = yield call(fetchOneProduct, action.payload);
    yield put(fetchOneProductComplete(res.data));
  } catch (e: any) {
    const error = e.response.statusText || "some error occured";
    // console.log(e.response);
    yield put(fetchSingleProductError(action.payload, error));
  }
}

export function* watchProductQueryChanged() {
  yield takeLatest(PRODUCTS_QUERY_CHANGED, fetchProducts);
  yield takeEvery(PRODUCTS_FETCH_SINGLE, fetchOne);
}
