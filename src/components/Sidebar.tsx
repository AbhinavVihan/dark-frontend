import { FC, memo } from "react";
import { logout } from "../api/auth";
import { useAppSelector } from "../store";

interface Props {}

const Sidebar: FC<Props> = (props) => {
  const customer = useAppSelector((state) => state.me);

  return (
    <div className="h-screen bg-gray-400">
      This is the sidebar
      <div className="text-red-700">
        Hello <span className="text-blue-700">{customer?.name}</span>
      </div>
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
