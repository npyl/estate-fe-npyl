import MuiSkeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const Skeleton = () => (
    <Stack px={2} mt={2} spacing={0.5} alignItems="center">
        <MuiSkeleton height={38} width="80%" />
        <MuiSkeleton height={38} width="80%" />
        <MuiSkeleton height={38} width="80%" />
        <MuiSkeleton height={38} width="80%" />
    </Stack>
);

export default Skeleton;
