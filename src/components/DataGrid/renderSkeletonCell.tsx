import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const renderSkeletonCell = () => (
    <Stack justifyContent="center" alignItems="left" width={1} height={1}>
        <Skeleton width="50%" height={30} animation="wave" />
    </Stack>
);

export default renderSkeletonCell;
