import Skeleton from "@mui/material/Skeleton";

const MapSkeleton = () => (
    <div
        style={{
            padding: "20px",
            maxWidth: "600px",
            margin: "auto",
        }}
    >
        <Skeleton
            variant="rectangular"
            width={600}
            height={400}
            animation="wave"
        />
    </div>
);

export default MapSkeleton;
