import { Grid, Stack } from "@mui/material";
import * as React from "react";

import {
    Areas,
    BasicDetails,
    Blueprints,
    Images,
    VideoLink,
    Notes,
    Documents,
    DescriptionEditor,
} from "./_general";

import {
    Construction,
    Description,
    Features,
    HeatingAndEnergy,
    SuitableFor,
    TechnicalFeaturesAndInterior,
} from "./_commercial";
import LocationSection from "./_general/Location";
import Public from "./_general/Public";
import ROISection from "./_general/ROI";
import GoogleEarth from "./_general/GoogleEarth";

const CommercialFormSection: React.FC<any> = () => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                    <BasicDetails />
                    <ROISection />
                    <Description />
                    <HeatingAndEnergy />
                    <Areas />
                    <Blueprints />
                    <Documents />
                    <GoogleEarth />
                    <VideoLink />
                    <Notes />
                </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                    <Images />
                    <LocationSection />
                    <SuitableFor />
                    <Construction />
                    <TechnicalFeaturesAndInterior />
                    <DescriptionEditor />
                    <Public />
                </Stack>
            </Grid>

            <Grid item xs={12}>
                <Features />
            </Grid>
        </Grid>
    );
};
export default CommercialFormSection;
