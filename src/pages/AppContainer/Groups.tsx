import React, { memo } from "react";
import { QueryChangedAction } from "../../actions/groups.actions";
import Input from "../../components/input/Input";
import {
  groupsLoadingSelector,
  groupQuerySelector,
  groupsSelector,
} from "../../selectors/groups.selectors";
import { useAppSelector } from "../../store";
import { FaSpinner } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Groups: React.FC = () => {
  const query = useAppSelector(groupQuerySelector);
  const loading = useAppSelector(groupsLoadingSelector);
  const groups = useAppSelector(groupsSelector);

  const dispatch = useDispatch();

  return (
    <div>
      <div className="flex">
        <Input
          type="text"
          placeholder="write something here"
          value={query}
          onChange={(e) => {
            dispatch(QueryChangedAction(e.target.value));
          }}
        ></Input>
        {loading && <FaSpinner className="mt-5 animate-spin"></FaSpinner>}
      </div>
      <div>
        {groups &&
          groups.map((group) => (
            <div
              className="w-full mb-10 space-y-5 border-2 border-black"
              key={group.id}
            >
              <div className="flex justify-between ">
                <Link className="hover:text-red-700" to={"/groups/" + group.id}>
                  <div>{group.name.toUpperCase()}</div>
                </Link>
                <div className="text-green-500">
                  <span className="text-black"> Description : </span>
                  {group.description}
                </div>
              </div>
              <div>
                <img
                  className="w-20 h-20 text-gray-500 rounded-full"
                  src={group.group_image_url}
                  alt="nothing to display"
                />
              </div>
            </div>
          ))}
        {!loading && groups.length === 0 && (
          <div className="text-3xl">
            Oops! No data can be fount regarding your Query :(
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Groups);
