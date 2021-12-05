import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  customerUpdatemeBegin,
  customerUpdatemeCompleted,
  loggedinResetPasswordBegin,
  loginActionBegin,
} from "../../actions/auth.actions";
import { changeCustomerPhoto } from "../../api/auth";
import { AUTH_TOKEN, BASE_URL } from "../../api/base";
import { meSelector } from "../../selectors/auth.selectors";
import { useAppSelector } from "../../store";

const MyAccount = () => {
  const dispatch = useDispatch();

  const customer = useAppSelector(meSelector);

  const [photo, setPhoto] = useState(undefined);
  const [disabled, setDisabled] = useState(true);

  const token = localStorage.getItem(AUTH_TOKEN);
  const baseUrl = BASE_URL;

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
      // authActions.updatemeCompleted(c);
      dispatch(customerUpdatemeCompleted(c));

      dispatch(loginActionBegin(c));
      window.location.href = "/my-account";
      // authActions.login(c);
      // window.location.href = "/my-account";
    });
  };

  return (
    <div className="flex flex-col justify-around h-screen font-bold bg-gray-100">
      <div className="py-10 text-2xl">My Account</div>
      <div className="">
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
            className="rounded"
            alt="customer"
            src={`${baseUrl}/img/customers/${imageName}`}
          />
        }
      </div>
      <form onSubmit={submit}>
        <div>
          {customer?.photo.startsWith("default") ? (
            <label
              className="cursor-pointer hover:text-red-500"
              onClick={() => setDisabled(!disabled)}
              htmlFor="photo"
            >
              Upload my photo
            </label>
          ) : (
            <label
              className="text-green-500 cursor-pointer hover:text-red-500"
              onClick={() => setDisabled(!disabled)}
              htmlFor="photo"
            >
              Choose new photo
            </label>
          )}

          <input
            className="hidden"
            onChange={(e) => {
              handleInputChange(e);
              alert("click on submit button");
              dispatch(customerUpdatemeBegin());
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
                className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
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
          onClick={() => dispatch(loggedinResetPasswordBegin())}
          className="text-green-500 hover:text-red-500"
          to="/my-password"
        >
          Change Your Password
        </Link>
      </div>

      <span className="text-red-500">or</span>
      <div>
        <Link
          className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-red-800 border-2 border-black rounded hover:bg-red-900 w-28"
          to="update-myaccount"
        >
          Update my credentials
        </Link>
      </div>
    </div>
  );
};

MyAccount.defaultProps = {};

export default memo(MyAccount);
