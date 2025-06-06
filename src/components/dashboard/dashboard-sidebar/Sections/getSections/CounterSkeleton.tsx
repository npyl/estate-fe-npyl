import Skeleton from "@mui/material/Skeleton";

const CounterSkeleton = () => (
    <Skeleton
        width="20px"
        height="20px"
        variant="circular"
        sx={{
            position: "absolute",
            right: "-8px",
            top: "10px",
        }}
    />
);

export default CounterSkeleton;
