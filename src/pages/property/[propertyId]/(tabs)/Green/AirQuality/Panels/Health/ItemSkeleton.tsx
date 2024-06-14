import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const HealthRecommendationSkeleton = () => (
    <Stack direction="row" alignItems="center" spacing={1}>
        <Skeleton variant="circular" height="26px" width="26px" />
        <Skeleton variant="text" height="80px" width="100%" />
    </Stack>
);

export default HealthRecommendationSkeleton;
