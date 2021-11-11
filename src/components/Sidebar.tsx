import { FC, memo } from "react";
import { Link } from "react-router-dom";
import { logout } from "../api/auth";
import { meSelector } from "../selectors/auth.selectors";
import { useAppSelector } from "../store";

interface Props {}

const Sidebar: FC<Props> = (props) => {
  const customer = useAppSelector(meSelector);

  return (
    <div className="w-2/5 bg-gray-100">
      This is the sidebar
      {customer && (
        <div className="text-2xl font-bold text-red-700">
          Hello
          <Link to="/my-account">
            <span className="text-green-700 hover:text-blue-500">
              {customer?.name}
            </span>
          </Link>
        </div>
      )}
      <div>
        {customer && (
          <button
            className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
            onClick={() => {
              logout();
              // eslint-disable-next-line no-restricted-globals
              // location.href = location.href;
              window.location.href = "/products";
            }}
          >
            Logout
          </button>
        )}
      </div>
      <Link className="hover:text-red-500" to="/retailor-login">
        Be a retailor
      </Link>
    </div>
  );
};

Sidebar.defaultProps = {};

export default memo(Sidebar);
