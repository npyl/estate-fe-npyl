import { Grid, Stack } from "@mui/material";
import * as React from "react";

import {
    BasicDetails,
    Description,
    Features,
    SuitableFor,
    TechnicalFeaturesAndInterior,
} from "./_land";

import {
    Blueprints,
    Images,
    VideoLink,
    Notes,
    Documents,
    DescriptionEditor,
} from "./_general";

import LocationSection from "./_general/Location";
import Public from "./_general/Public";
import ROISection from "./_general/ROI";
import GoogleEarth from "./_general/GoogleEarth";

const LandFormSection: React.FC<any> = () => {
    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} order={"row"}>
                    <Stack spacing={1}>
                        <BasicDetails />
                        <ROISection />
                        <TechnicalFeaturesAndInterior />
                        <Description />
                        <Features />
                        <Blueprints />
                        <Documents />
                        <GoogleEarth />
                        <VideoLink />
                        <Notes />
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                        <Images />
                        <LocationSection />
                        <SuitableFor />
                        <DescriptionEditor />
                        <Public />
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
};
export default LandFormSection;
