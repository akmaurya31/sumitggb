import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export const CardSkeleton = ({ height, width }) => {
  return <Skeleton style={{ height: height, width: width, borderRadius: 15 }} />;
};
