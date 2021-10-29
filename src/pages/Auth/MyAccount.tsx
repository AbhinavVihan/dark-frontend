import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import { me } from "../../api/auth";
import { AUTH_TOKEN } from "../../api/base";
import { meSelector } from "../../selectors/auth.selectors";
import { useAppSelector } from "../../store";

function MyAccount() {
  const customer = useAppSelector(meSelector);

  const [src, setSrc] = useState("");

  const token = localStorage.getItem(AUTH_TOKEN);

  //   useEffect(() => {
  //     if (!token) {
  //       return;
  //     }

  //     me();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  if (!customer && token) {
    return <div>loading...</div>;
  }
  const imageName = customer?.photo;

  const url = `http://localhost:8000/public/img/customers/${imageName}`;

  axios.get(url).then((res) => {
    const imageUrl = URL.createObjectURL(res.data);
    setSrc(imageUrl);
  });
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
        {/* {customer && setPhoto(customer.photo)} */}
        {/* PHOTO: <span className="text-blue-700">{customer?.photo}</span> */}
        {<img alt="customer" src={src} />}
      </div>
      <div>
        ROLE: <span className="text-blue-700">{customer?.role}</span>
      </div>
    </div>
  );
}

MyAccount.defaultProps = {};

export default memo(MyAccount);
