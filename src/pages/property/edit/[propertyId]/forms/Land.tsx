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
    Distances,
    Blueprints,
    Images,
    VideoLink,
    Notes,
    Documents,
    ROI,
    DescriptionEditor,
} from "./_general";

import LocationSection from "./_general/Location";
import { useFormContext } from "react-hook-form";
import Public from "./_general/Public";

const LandFormSection: React.FC<any> = () => {
    const { watch } = useFormContext();
    const state = watch("state");

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} order={"row"}>
                    <Stack spacing={1}>
                        <BasicDetails />
                        {state === "Sale" && <ROI />}
                        <TechnicalFeaturesAndInterior />
                        <Description />
                        <Features />
                        <Blueprints />
                        <Documents />
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
