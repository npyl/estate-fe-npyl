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
    ROI,
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

import { useFormContext } from "react-hook-form";
import Public from "./_general/Public";

const CommercialFormSection: React.FC<any> = () => {
    const { watch } = useFormContext();
    const state = watch("state");

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <BasicDetails />
                        {state === "Sale" && <ROI />}
                        <Description />
                        <HeatingAndEnergy />
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
        </>
    );
};
export default CommercialFormSection;
