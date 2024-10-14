import { SpaceBetween } from "@/components/styled";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";

const ItemSkeleton = () => (
    <Paper elevation={10}>
        <SpaceBetween
            sx={{
                px: 2,
                py: 1.5,
                alignItems: "center",
            }}
            gap={1}
            direction={{
                xs: "column",
                lg: "row",
            }}
        >
            <Skeleton width="100px" height="58px" />
            <Skeleton width="100px" height="58px" />
        </SpaceBetween>
    </Paper>
);

export default ItemSkeleton;
