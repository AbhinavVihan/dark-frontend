import { FC, memo } from "react";
import { Route, Switch } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import MyAccount from "../Auth/MyAccount";
import CategoriesPage from "./Categories.page";
import CategoriesDetailPage from "./CategoriesDetail.page";
import OverViewPage from "./OverView.page";
import ProductsPage from "./Products.page";
import ProductsDetailPage from "./ProductsDetail.page";
import LoggedinResetPasswordPage from "../Auth/LoggedinResetPassword";
import CategoryProductsPage from "./Category-Products.page";
import CartPage from "./Cart.page";
import ProductDetailForRetailorsPage from "./ProductDetailForRetailors.page";
import UploadCategoryPhotoPage from "./UploadCategoryPhoto.page";

interface Props {}

const AppContainer: FC<Props> = () => {
  return (
    <div className="flex flex-row">
      <Sidebar></Sidebar>
      <Switch>
        <Route path="/overview">
          <OverViewPage></OverViewPage>
        </Route>
        <Route path="/my-account" exact>
          <MyAccount></MyAccount>
        </Route>

        <Route path="/my-password" exact>
          <LoggedinResetPasswordPage></LoggedinResetPasswordPage>
        </Route>

        <Route path="/categories" exact>
          <CategoriesPage></CategoriesPage>
        </Route>
        <Route path="/products" exact>
          <ProductsPage></ProductsPage>
        </Route>
        <Route path="/cart" exact>
          <CartPage></CartPage>
        </Route>
        <Route path="/categories/:categoryId" exact>
          <CategoriesDetailPage></CategoriesDetailPage>
        </Route>
        <Route path="/categories/:categoryId/products" exact>
          <CategoryProductsPage></CategoryProductsPage>
        </Route>
        <Route path="/products/:productId" exact>
          <ProductsDetailPage></ProductsDetailPage>
        </Route>
        <Route path="/products/:productId/retailor" exact>
          <ProductDetailForRetailorsPage></ProductDetailForRetailorsPage>
        </Route>
      </Switch>
    </div>
  );
};

AppContainer.defaultProps = {};

export default memo(AppContainer);
