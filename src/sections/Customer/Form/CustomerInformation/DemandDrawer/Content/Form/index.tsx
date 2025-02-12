import { Grid, Stack } from "@mui/material";
import { FC } from "react";
import Fields from "./Fields";
import dynamic from "next/dynamic";
import MapSkeleton from "./AreaOfPreference/MapSkeleton";
import FeaturesList from "./FeaturesList";
import Sliders from "./Sliders";
import CategoriesSelect from "./CategoriesSelect";
const AreaOfPreference = dynamic(() => import("./AreaOfPreference"), {
    loading: () => <MapSkeleton />,
});

interface DemandFormProps {
    index: number;
}

const DemandForm: FC<DemandFormProps> = ({ index }) => (
    <>
        <Stack gap={1.5} mt={1}>
            <Grid container spacing={1.5}>
                <Fields index={index} />
            </Grid>

            <CategoriesSelect index={index} />

            <Grid container spacing={1.5}>
                <Sliders index={index} />
            </Grid>
        </Stack>

        <AreaOfPreference index={index} />

        <FeaturesList index={index} />
    </>
);

export default DemandForm;
