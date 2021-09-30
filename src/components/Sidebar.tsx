import { FC, memo } from "react";

interface Props {}

const Sidebar: FC<Props> = (props) => {
  return <div className="h-screen bg-gray-400">This is the sidebar</div>;
};

Sidebar.defaultProps = {};

export default memo(Sidebar);
