import Grid from "@mui/material/Grid";
import MuiSkeleton from "@mui/material/Skeleton";

const Skeleton = () => (
    <Grid item xs={6}>
        <MuiSkeleton width={25} height={25} variant="circular" />
    </Grid>
);

const Skeletons = () => (
    <>
        <Skeleton /> <Skeleton />
        <Skeleton /> <Skeleton />
    </>
);

export default Skeletons;
