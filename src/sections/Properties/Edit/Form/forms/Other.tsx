import { Grid, Stack } from "@mui/material";
import * as React from "react";

import {
    BasicDetails,
    DescriptionEditor,
    Blueprints,
    Images,
    VideoLink,
    Documents,
    Notes,
} from "./_general";

import { HeatingAndEnergy } from "./_commercial";

import {
    Construction,
    Features,
    Description,
    SuitableFor,
    TechnicalFeaturesAndInterior,
} from "./_other";

import LocationSection from "./_general/Location";
import Public from "./_general/Public";
import ROISection from "./_general/ROI";
import GoogleEarth from "./_general/GoogleEarth";

const OtherFormSection: React.FC = () => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={6} order={"row"}>
                <Stack spacing={1}>
                    <BasicDetails />

                    <ROISection />

                    <Description />
                    <Construction />
                    <Features />
                    <SuitableFor />
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
                    <HeatingAndEnergy />
                    <TechnicalFeaturesAndInterior />
                    <DescriptionEditor />
                    <Public />
                </Stack>
            </Grid>
        </Grid>
    );
};
export default OtherFormSection;
