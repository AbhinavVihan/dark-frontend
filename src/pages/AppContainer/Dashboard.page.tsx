import { FC, memo } from "react";
import Groups from "./Groups";

interface Props {}

const Dashboard: FC<Props> = () => {
  return (
    <div>
      <div className="pb-10 text-3xl">This is Dashboard Page</div>
      <Groups />
    </div>
  );
};

Dashboard.defaultProps = {};
export default memo(Dashboard);
