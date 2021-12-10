import { FC, memo, useEffect, useState } from "react";

import { BASE_URL } from "../../api/base";
import { getAllReviews } from "../../api/products";
import { useParams } from "react-router-dom";
import { Reviewss } from "../../models/Reviews";

interface Props {}

const Reviews: FC<Props> = (props) => {
  const { productId } = useParams<{ productId: string }>();

  const [arrr, setArrr] = useState<Reviewss[]>();

  useEffect(() => {
    getAllReviews(productId).then((r) => {
      setArrr(r);
      console.log(r);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      {arrr &&
        arrr.map((r) => (
          <div className="flex flex-row items-center justify-center text-center border-2 border-black rounded xxxsm:w-40 xxsm:w-56 xsm:w-64 sm:w-96 w-96">
            <div className="items-center">
              <div className="flex justify-center">
                <img
                  className="w-20 rounded-full"
                  src={BASE_URL + "/img/customers/" + r.customer.photo}
                  alt="whdgwh"
                />
              </div>
              <div className="text-left">
                <div className="font-extrabold">
                  Review:{"    "}
                  <span className="font-normal">{r.review}</span>
                </div>
                <div className="font-extrabold">
                  Placed By:{"    "}{" "}
                  <span className="font-normal">{r.customer.name}</span>
                </div>

                <div className="font-extrabold">
                  Created At:{"    "}
                  <span className="font-normal">
                    {r.createdAt.slice(0, 10)}
                  </span>
                </div>
              </div>
            </div>
            ;
          </div>
        ))}
    </div>
  );
};

Reviews.defaultProps = {};

export default memo(Reviews);
