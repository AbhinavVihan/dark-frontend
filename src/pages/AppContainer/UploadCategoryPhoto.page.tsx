import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
// import { authActions } from "../../actions/auth.actions";
import {
  uploadCategoryPhotoBegin,
  uploadCategoryPhotoComplete,
} from "../../actions/categories.actions";
import { AUTH_TOKEN, BASE_URL } from "../../api/base";
import { changeCategoryPhoto } from "../../api/categories";
import { meSelector } from "../../selectors/auth.selectors";
import { createdCategorySelector } from "../../selectors/categories.selectors";
import { useAppSelector } from "../../store";

const UploadCategoryPhoto = () => {
  const customer = useAppSelector(meSelector);
  const id = useAppSelector(createdCategorySelector);
  const [photo, setPhoto] = useState(undefined);
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const token = localStorage.getItem(AUTH_TOKEN);
  const history = useHistory();

  if (!customer && token) {
    return <div>loading...</div>;
  }

  const handleInputChange = (e: any) => {
    setPhoto(e.target.files[0]);
  };

  // const handleInputChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
  //   setPhoto(e.target.files[0])
  // }

  const submit = (e: any) => {
    e.preventDefault();
    // window.location.href = "/my-account";
    changeCategoryPhoto(id, photo)
      .then((c) => {
        uploadCategoryPhotoComplete();
        alert("photo uploaded successfully");
        history.push("/retailor-overview");
      })
      .catch((e) => {
        alert("some error occured");
      });
    // changeCustomerPhoto(photo).then((c) => {
    //   authActions.updatemeCompleted(c);
    //   authActions.login(c);
    // window.location.href = "/my-account";
    // });
  };

  return (
    <div className="h-screen font-bold bg-gray-100">
      <form onSubmit={submit}>
        <div>
          <label
            className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
            onClick={() => setDisabled(!disabled)}
            htmlFor="photo"
          >
            Choose a photo for your category
          </label>
          <input
            className="hidden"
            onChange={(e) => {
              handleInputChange(e);
              dispatch(uploadCategoryPhotoBegin());
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
                className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-green-800 border-2 border-black rounded cursor-pointer hover:bg-black w-28"
                type="submit"
                onClick={() => submit}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

UploadCategoryPhoto.defaultProps = {};

export default memo(UploadCategoryPhoto);
