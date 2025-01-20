import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const SidebarSkeleton = () => (
    <Stack spacing={1} p={1} mt={1}>
        <Skeleton animation="pulse" width="100%" height="38px" />
        <Skeleton animation="pulse" width="100%" height="38px" />
        <Skeleton animation="pulse" width="100%" height="38px" />
        <Skeleton animation="pulse" width="100%" height="38px" />
        <Skeleton animation="pulse" width="100%" height="38px" />
    </Stack>
);

export default SidebarSkeleton;
