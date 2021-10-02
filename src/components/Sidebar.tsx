import { FC, memo } from "react";
import { logout } from "../api/auth";

interface Props {}

const Sidebar: FC<Props> = (props) => {
  return (
    <div className="h-screen bg-gray-400">
      This is the sidebar
      <div>
        {" "}
        <button
          onClick={() => {
            logout();
            window.location.href = "/login";
          }}
        >
          logout
        </button>
      </div>
    </div>
  );
};

Sidebar.defaultProps = {};

export default memo(Sidebar);
