import { FC, memo } from "react";
import { Route, Switch } from "react-router-dom";
import Sidebar from "../../sidebars and all/Sidebar";
import DashboardPage from "./Dashboard.page";
import GroupDetailPagePage from "./GroupDetailPage.page";
import LecturePage from "./Lecture.page";
import RecordingsPage from "./Recordings.page";

interface Props {}

const AppContainer: FC<Props> = (props) => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <Switch>
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/groups/:groupId">
          <GroupDetailPagePage></GroupDetailPagePage>
        </Route>
        <Route path="/recordings" component={RecordingsPage} />
        <Route
          path="/batch/:batchNumber/lecture/:lectureNumber"
          component={LecturePage}
        />
      </Switch>
    </div>
  );
};

AppContainer.defaultProps = {};

export default memo(AppContainer);
