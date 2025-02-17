import { Grid, Stack } from "@mui/material";
import * as React from "react";

import {
    Areas,
    BasicDetails,
    DescriptionEditor,
    Blueprints,
    Images,
    VideoLink,
    Notes,
    Documents,
    Parking,
    Balconies,
    Features,
} from "./_general";

import {
    Description,
    Construction,
    SuitableFor,
    TechnicalFeaturesAndInterior,
    HeatingAndEnergy,
} from "./_residential";
import LocationSection from "./_general/Location";
import Public from "./_general/Public";
import ROISection from "./_general/ROI";
import GoogleEarth from "./_general/GoogleEarth";

const ResidentialFormSection: React.FC = () => {
    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <BasicDetails />

                        <ROISection />

                        <Description />
                        <Construction />
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
                        <HeatingAndEnergy />
                        <Parking />
                        <Balconies />
                        <TechnicalFeaturesAndInterior />
                        <SuitableFor />
                        <DescriptionEditor />
                        <Public />
                    </Stack>
                </Grid>

                <Grid item xs={12}>
                    <Features />
                </Grid>
            </Grid>
        </>
    );
};
export default ResidentialFormSection;
