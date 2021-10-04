import { FC, memo } from "react";
import { logout } from "../api/auth";
import { Customer } from "../models/Customer";

interface Props {
  customer: Customer;
}

const Sidebar: FC<Props> = (props) => {
  return (
    <div className="h-screen bg-gray-400">
      This is the sidebar
      <div className="text-red-700">
        Hello{" "}
        <span className="text-blue-700">
          {props.customer.name.toUpperCase()}
        </span>
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
