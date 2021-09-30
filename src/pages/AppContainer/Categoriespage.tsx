import { FC, memo } from "react";

interface Props {}

const Categories: FC<Props> = (props) => {
  return <div>This is Categories Page</div>;
};

Categories.defaultProps = {};

export default memo(Categories);
