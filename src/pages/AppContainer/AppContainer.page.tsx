import { FC, memo } from "react";
import { Route, Switch } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { Customer } from "../../models/Customer";
import CategoriesPage from "./Categories.page";
import OverViewPage from "./OverView.page";
import ProductsPage from "./Products.page";

interface Props {
  customer: Customer;
}

const AppContainer: FC<Props> = ({ customer }) => {
  return (
    <div className="flex flex-row">
      <Sidebar customer={customer}></Sidebar>
      <Switch>
        <Route path="/overview">
          <OverViewPage></OverViewPage>
        </Route>
        <Route path="/categories">
          <CategoriesPage></CategoriesPage>
        </Route>
        <Route path="/products">
          <ProductsPage></ProductsPage>
        </Route>
      </Switch>
    </div>
  );
};

AppContainer.defaultProps = {};

export default memo(AppContainer);
