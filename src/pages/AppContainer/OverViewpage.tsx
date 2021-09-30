import { FC, memo } from "react";

interface Props {}

const OverView: FC<Props> = (props) => {
  return <div>This is OverView Page</div>;
};

OverView.defaultProps = {};

export default memo(OverView);
