//auth
export const ME_FETCH = "me/fetch";
export const ME_LOGIN = "me/login";
export const LOGIN_BEGIN = "login/begin";
// export const LOGIN_COMPLETE = "login/complete";
export const LOGIN_ERROR = "login/error";
export const FORGOT_PASSWORD_BEGIN = "forgot_password/begin";
export const RESET_PASSWORD_COMPLETED = "reset_password/completed";
export const LOGGEDIN_PASSWORD_CHANGE_BEGIN = "loggedin/password_change_begin";
export const LOGGEDIN_PASSWORD_CHANGE_COMPLETED =
  "loggedin/password_change_completed";
export const CUSTOMER_UPDATEME_BEGIN = "customer/updateme_begin";
export const CUSTOMER_UPDATEME_COMPLETED = "customer/updateme_completed";
export const CUSTOMER_UPDATEME_ERROR = "customer/updateme_error";
export const CREATE_PRODUCT_BEGIN = "create/product_begin";
export const CREATE_PRODUCT_COMPLETE = "create/product_complete";
export const CREATE_PRODUCT_ERROR = "create/product_error";

//products
export const PRODUCTS_FETCH_SINGLE = "products/fetch_single";
export const FETCH_PRODUCTS_FOR_CATEGORY = "fetch/products_for_category";
export const PRODUCTS_FETCH_SINGLE_COMPLETE = "products/fetch_single_complete";
export const PRODUCTS_FETCH_SINGLE_ERROR = "products/fetch_single_error";

export const PRODUCTS_QUERY_CHANGED = "products/query_changed";
export const PRODUCTS_QUERY_COMPLETED = "products/query_completed";
export const PRODUCT_IMAGES_LOADED = "products/images_loaded";

//categories
export const CATEGORIES_FETCH_SINGLE = "categories/fetch_single";
export const CATEGORIES_FETCH_SINGLE_COMPLETE =
  "categories/fetch_single_complete";
export const CATEGORIES_FETCH_SINGLE_ERROR = "categories/fetch_single_error";
export const CATEGORY_CHOOSE = "category/choose";
export const CATEGORIES_QUERY_CHANGED = "categories/query_changed";
export const CATEGORIES_QUERY_COMPLETED = "categories/query_completed";

//cart
export const CREATE_CART_REQUEST_BEGIN = "create/cart_request_begin";
export const CREATE_CART_REQUEST_COMPLETE = "create/cart_request_complete";
export const GET_CART_BEGIN = "get/cart_begin";
export const GET_CART_COMPLETE = "get/cart_complete";
export const GET_CART_ERROR = "get/cart_error";
export const ADD_TO_CART_BEGIN = "add/to_cart_begin";
export const ADD_TO_CART_COMPLETE = "add/to_cart_complete";
export const ADD_TO_CART_ERROR = "add/to_cart_error";
export const BUYING_PROCESS_BEGIN = "buying/process_begin";
export const BUYING_PROCESS_ERROR = "buying/process_error";
export const BUYING_PROCESS_COMPLETE = "buying/process_complete";
