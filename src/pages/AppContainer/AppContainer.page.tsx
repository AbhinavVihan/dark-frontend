import { FC, memo } from "react";
import { Route, Switch } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import CategoriesPage from "./Categories.page";
import CategoriesDetailPage from "./CategoriesDetail.page";
import OverViewPage from "./OverView.page";
import ProductsPage from "./Products.page";
import ProductsDetailPage from "./ProductsDetail.page";

interface Props {}

const AppContainer: FC<Props> = () => {
  return (
    <div className="flex flex-row">
      <Sidebar></Sidebar>
      <Switch>
        <Route path="/overview">
          <OverViewPage></OverViewPage>
        </Route>
        <Route path="/categories" exact>
          <CategoriesPage></CategoriesPage>
        </Route>
        <Route path="/products" exact>
          <ProductsPage></ProductsPage>
        </Route>
        <Route path="/categories/:categoryId" exact>
          <CategoriesDetailPage></CategoriesDetailPage>
        </Route>
        <Route path="/products/:productId" exact>
          <ProductsDetailPage></ProductsDetailPage>
        </Route>
      </Switch>
    </div>
  );
};

AppContainer.defaultProps = {};

export default memo(AppContainer);
