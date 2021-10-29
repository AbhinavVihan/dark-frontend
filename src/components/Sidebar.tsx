import { FC, memo } from "react";
import { Link } from "react-router-dom";
import { logout } from "../api/auth";
import { meSelector } from "../selectors/auth.selectors";
import { useAppSelector } from "../store";

interface Props {}

const Sidebar: FC<Props> = (props) => {
  const customer = useAppSelector(meSelector);

  return (
    <div className="h-screen bg-gray-400">
      This is the sidebar
      <div className="text-red-700">
        Hello
        <Link to="/my-account">
          <span className="text-blue-700">{customer?.name}</span>
        </Link>
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
