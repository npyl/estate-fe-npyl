import { getBorderColor2 } from "@/theme/borderColor";
import { Skeleton } from "@mui/material";
import Stack from "@mui/material/Stack";

const OptionSkeleton = () => (
    <Stack
        direction="row"
        alignItems="center"
        width={1}
        px={1}
        borderBottom="1px solid"
        borderColor={getBorderColor2}
        sx={{
            "&:last-child": {
                border: "none",
            },
        }}
    >
        <Skeleton variant="circular" />
        <Stack width={1}>
            <Skeleton width="70%" height="35px" variant="text" />
            <Skeleton width="30%" height="35px" variant="text" />
        </Stack>
    </Stack>
);

const SidebarSkeleton = () => (
    <>
        <OptionSkeleton />
        <OptionSkeleton />
        <OptionSkeleton />
        <OptionSkeleton />
    </>
);

export default SidebarSkeleton;
