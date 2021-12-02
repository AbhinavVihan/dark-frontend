import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { updateMyCredentialsBegin } from "../../actions/auth.actions";
import { changeCustomerPhoto } from "../../api/auth";
import { AUTH_TOKEN, BASE_URL } from "../../api/base";
import { meSelector } from "../../selectors/auth.selectors";
import { useAppSelector } from "../../store";

const UpdateMyAccount = () => {
  const customer = useAppSelector(meSelector);
  const [name, setName] = useState(customer?.name);
  const [email, setEmail] = useState(customer?.email);
  const [address, setAddress] = useState(customer?.address);
  const history = useHistory();
  const dispatch = useDispatch();

  const submit = (e: any) => {
    e.preventDefault();
    customer &&
      dispatch(
        updateMyCredentialsBegin(customer._id, { name, email, address })
      );
  };
  console.log(name);

  return (
    <div>
      <div>
        Name:
        <input
          className="h-10 border-2 border-black rounded w-96"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        Email:
        <input
          className="h-10 border-2 border-black rounded w-96"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        Address:
        <input
          className="h-10 border-2 border-black rounded w-96"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <button
        onClick={() => history.push("/my-account")}
        className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
      >
        {" "}
        Cancel
      </button>
      <button
        onClick={submit}
        className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-green-800 border-2 border-black rounded hover:bg-green-900 w-28"
      >
        {" "}
        Submit
      </button>
    </div>
  );
};

UpdateMyAccount.defaultProps = {};

export default memo(UpdateMyAccount);
