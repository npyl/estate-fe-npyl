import Grid from "@mui/material/Grid";
const PropertiesView = dynamic(() => import("./PropertiesSection"));
const MapSection = dynamic(() => import("./MapSection"));
import dynamic from "next/dynamic";
import { FC } from "react";

// ---------------------------------------------------------------------

interface MapViewProps {
    sortBy: string;
    direction: string;
}

const MapView: FC<MapViewProps> = ({ sortBy, direction }) => (
    <Grid container mt={1} spacing={1} order="revert">
        <Grid
            item
            xs={12}
            lg={6}
            order={{
                xs: 2,
                lg: 1,
            }}
        >
            <PropertiesView sortBy={sortBy} direction={direction} />
        </Grid>

        <Grid
            height={`calc(100vh - 136px)`}
            item
            xs={12}
            lg={6}
            order={{
                xs: 1,
                lg: 2,
            }}
            position={{
                xs: "inherit",
                lg: "sticky",
            }}
            top="120px"
            right="0px"
        >
            <MapSection />
        </Grid>
    </Grid>
);

export default MapView;
