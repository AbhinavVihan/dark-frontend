import { FC, memo } from "react";
import { Route, Switch } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import CategoriesPage from "./Categories.page";
import OverViewPage from "./OverView.page";
import ProductsPage from "./Products.page";

interface Props {}

const AppContainer: FC<Props> = (props) => {
  return (
    <div className="flex flex-row">
      <Sidebar></Sidebar>
      <Switch>
        <Route path="/overview">
          <OverViewPage></OverViewPage>
        </Route>
        <Route path="/categories">
          <CategoriesPage></CategoriesPage>
        </Route>
        <Route path="/products/:productId">
          <ProductsPage></ProductsPage>
        </Route>
      </Switch>
    </div>
  );
};

AppContainer.defaultProps = {};

export default memo(AppContainer);
