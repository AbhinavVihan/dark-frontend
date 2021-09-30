import { useEffect } from "react";
import { useMemo } from "react";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOneGroup } from "../../actions/groups.actions";
import {
  queryIdSelector,
  selectedErrorSelector,
  selectedGroupSelector,
  selectedLoadingSelector,
} from "../../selectors/groups.selectors";
import { useAppSelector } from "../../store";

const GroupDetailPage: React.FC = () => {
  const groupId = +useParams<{ groupId: string }>().groupId;

  const group = useAppSelector(selectedGroupSelector);
  const error = useAppSelector(selectedErrorSelector);
  const loading = useAppSelector(selectedLoadingSelector);

  const groupIds = useAppSelector(queryIdSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOneGroup(groupId));
  }, [groupId]);

  if (error) {
    return (
      <div>
        <div className="text-3xl font-bold text-red-700">{error}</div>

        <div>
          <Link className="text-blue-700 hover:underline font-" to="/dashboard">
            Back to dashboard
          </Link>
        </div>
        <div>
          <span className="hover:underline hover:text-blue-500">
            <Link to={"/groups/" + (groupId + 1)}>next Group</Link>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Link className="text-blue-700 hover:underline font-" to="/dashboard">
          Back to dashboard
        </Link>
      </div>
      {loading && <div>Loading group...</div>}

      {group && (
        <div className="text-3xl">
          This is the detail page of
          <span className="font-bold text-blue-700">
            {" "}
            {group.name.toUpperCase()}{" "}
          </span>
          of
          <span className="font-bold text-blue-700"> id: {group.id}</span>
        </div>
      )}
      <Link
        className="hover:underline hover:text-blue-500"
        to={"/groups/" + (groupId + 1)}
      >
        next Group
      </Link>
    </div>
  );
};

export default memo(GroupDetailPage);
