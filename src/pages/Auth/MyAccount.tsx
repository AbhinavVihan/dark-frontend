import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authActions } from "../../actions/auth.actions";
import { changeCustomerPhoto, me } from "../../api/auth";
import { AUTH_TOKEN } from "../../api/base";
import { meSelector } from "../../selectors/auth.selectors";
import { useAppSelector } from "../../store";

const MyAccount = () => {
  const customer = useAppSelector(meSelector);

  const [photo, setPhoto] = useState(undefined);
  const [disabled, setDisabled] = useState(true);

  const token = localStorage.getItem(AUTH_TOKEN);

  if (!customer && token) {
    return <div>loading...</div>;
  }
  const imageName = customer?.photo;

  const handleInputChange = (e: any) => {
    setPhoto(e.target.files[0]);
  };

  // const handleInputChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
  //   setPhoto(e.target.files[0])
  // }

  const submit = (e: any) => {
    e.preventDefault();
    // window.location.href = "/my-account";
    changeCustomerPhoto(photo).then((c) => {
      authActions.updatemeCompleted(c);
      authActions.login(c);
      // window.location.href = "/my-account";
    });
  };

  return (
    <div className="h-screen bg-gray-400">
      My Account
      <div className="text-red-700">
        NAME : <span className="text-blue-700">{customer?.name}</span>
      </div>
      <div>
        EMAIL: <span className="text-blue-700">{customer?.email}</span>
      </div>
      <div>
        ADDRESS: <span className="text-blue-700">{customer?.address}</span>
      </div>
      <div>
        {
          <img
            alt="customer"
            src={`http://localhost:8000/img/customers/${imageName}`}
          />
        }
      </div>
      <form onSubmit={submit}>
        <div>
          <label
            className="cursor-pointer hover:text-red-500"
            onClick={() => setDisabled(!disabled)}
            htmlFor="photo"
          >
            Choose new photo
          </label>
          <input
            className="hidden"
            onChange={(e) => {
              handleInputChange(e);
              authActions.updatemeBegin();
            }}
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            // name="file"
            defaultValue={photo}
            // value={photo}
          />
          <div>
            {!disabled && (
              <button
                className="border-4 border-black hover:text-red-500"
                type="submit"
                onClick={() => submit}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
      <div>
        ROLE: <span className="text-blue-700">{customer?.role}</span>
      </div>
      <div>
        <Link
          onClick={authActions.loggedinPasswordChangeBegin}
          className="hover:text-blue-500"
          to="/my-password"
        >
          Change Your Password
        </Link>
      </div>
    </div>
  );
};

MyAccount.defaultProps = {};

export default memo(MyAccount);
