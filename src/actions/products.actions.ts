import { createProductRequest } from "../api/interfaces/productInterfaces";
import { Product, Products } from "../models/Products";
import {
  CREATE_PRODUCT_BEGIN,
  CREATE_PRODUCT_COMPLETE,
  FETCH_PRODUCTS_FOR_CATEGORY,
  PRODUCTS_FETCH_SINGLE,
  PRODUCTS_FETCH_SINGLE_COMPLETE,
  PRODUCTS_FETCH_SINGLE_ERROR,
  PRODUCTS_QUERY_CHANGED,
  PRODUCTS_QUERY_COMPLETED,
  PRODUCT_CHOOSE,
  UPLOAD_IMAGE_1_BEGIN,
  UPLOAD_IMAGE_1_COMPLETED,
  UPLOAD_IMAGE_2_BEGIN,
  UPLOAD_IMAGE_2_COMPLETED,
  UPLOAD_IMAGE_3_BEGIN,
  UPLOAD_IMAGE_3_COMPLETED,
  UPLOAD_IMAGE_COVER_BEGIN,
  UPLOAD_IMAGE_COVER_COMPLETED,
  UPLOAD_IMAGE_FRONT_BEGIN,
  UPLOAD_IMAGE_FRONT_COMPLETED,
  UPLOAD_PRODUCT_BEGIN,
  UPLOAD_PRODUCT_COMPLETED,
  UPLOAD_PRODUCT_ERROR,
} from "./action.constants";

export const productQueryChangedAction = (
  query: string,
  loadingList: boolean
) => ({
  type: PRODUCTS_QUERY_CHANGED,
  payload: { query, loadingList },
});

export const productQueryCompletedAction = (
  query: string,
  products: Product[]
) => ({
  type: PRODUCTS_QUERY_COMPLETED,
  payload: { query, products },
});

export const fetchOneProduct = (id: string) => ({
  type: PRODUCTS_FETCH_SINGLE,
  payload: id,
});

export const fetchProductsForCategory = (id: string, products: Product[]) => ({
  type: FETCH_PRODUCTS_FOR_CATEGORY,
  payload: { id, products },
});

export const fetchOneProductComplete = (product: Products) => ({
  type: PRODUCTS_FETCH_SINGLE_COMPLETE,
  payload: product,
});

export const fetchSingleProductError = (id: string, msg: string) => ({
  type: PRODUCTS_FETCH_SINGLE_ERROR,
  payload: { id, msg },
});

export const createProductBegin = (id: string, data: createProductRequest) => ({
  type: CREATE_PRODUCT_BEGIN,
  payload: { id, data },
});

export const createProductComplete = (product: Product) => ({
  type: CREATE_PRODUCT_COMPLETE,
  payload: product,
});

export const createProductError = (msg: string) => ({
  type: CREATE_PRODUCT_COMPLETE,
  payload: msg,
});

export const uploadProductBegin = () => ({
  type: UPLOAD_PRODUCT_BEGIN,
});

export const uploadProductCompleted = () => ({
  type: UPLOAD_PRODUCT_COMPLETED,
});

export const uploadProductError = () => ({
  type: UPLOAD_PRODUCT_ERROR,
});

export const uploadFrontImageBegin = () => ({
  type: UPLOAD_IMAGE_FRONT_BEGIN,
});

export const uploadFrontImageCompleted = () => ({
  type: UPLOAD_IMAGE_FRONT_COMPLETED,
});

export const uploadCoverImageBegin = () => ({
  type: UPLOAD_IMAGE_COVER_BEGIN,
});

export const uploadCoverImageCompleted = () => ({
  type: UPLOAD_IMAGE_COVER_COMPLETED,
});

export const uploadImage1Begin = () => ({
  type: UPLOAD_IMAGE_1_BEGIN,
});

export const uploadImage1Completed = () => ({
  type: UPLOAD_IMAGE_1_COMPLETED,
});

export const uploadImage2Begin = () => ({
  type: UPLOAD_IMAGE_2_BEGIN,
});

export const uploadImage2Completed = () => ({
  type: UPLOAD_IMAGE_2_COMPLETED,
});

export const uploadImage3Begin = () => ({
  type: UPLOAD_IMAGE_3_BEGIN,
});

export const uploadImage3Completed = () => ({
  type: UPLOAD_IMAGE_3_COMPLETED,
});

export const productChoose = (id: string) => ({
  type: PRODUCT_CHOOSE,
  payload: id,
});
