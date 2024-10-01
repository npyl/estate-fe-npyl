import MuiSkeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const Skeleton = () => (
    <Stack px={2}>
        <MuiSkeleton />
        <MuiSkeleton />
        <MuiSkeleton />
        <MuiSkeleton />
    </Stack>
);

export default Skeleton;
