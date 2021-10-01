import { FC, memo, useEffect } from "react";

interface Props {}

const FrontImage: FC<Props> = (props) => {
  // console.log("Front image rendering");
  useEffect(() => {
    // console.log("front image rendering for the first time");
  }, []);

  return (
    <div className="w-1/2 h-screen text-white bg-black">Logo will go here</div>
  );
};

FrontImage.defaultProps = {};

export default memo(FrontImage);
