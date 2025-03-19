import Skeleton, { SkeletonProps } from "@mui/material/Skeleton";
import { FC } from "react";

const AvatarSkeleton: FC<SkeletonProps> = (props) => (
    <Skeleton variant="circular" width="46px" height="46px" {...props} />
);

export default AvatarSkeleton;
