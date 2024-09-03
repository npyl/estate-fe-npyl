import { Grid, Stack } from "@mui/material";
import * as React from "react";

import {
    Areas,
    BasicDetails,
    DescriptionEditor,
    Distances,
    Blueprints,
    Images,
    VideoLink,
    Notes,
    Documents,
    Parking,
    ROI,
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

import { useFormContext } from "react-hook-form";
import Public from "./_general/Public";

const ResidentialFormSection: React.FC = () => {
    const { watch } = useFormContext();
    const state = watch("state");

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <BasicDetails />
                        {/* <ROISection /> */}
                        {state === "Sale" && <ROI />}

                        <Description />
                        <Construction />
                        <Areas />
                        <Blueprints />
                        <Documents />
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
