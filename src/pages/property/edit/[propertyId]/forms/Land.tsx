import { Grid, Stack } from "@mui/material";
import { useSelector } from "react-redux";
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
} from "./_general";

import LocationSection from "src/components/Location/Location";

import { selectState } from "src/slices/property";

const LandFormSection: React.FC<any> = () => {
    const state = useSelector(selectState);

    return (
        <>
            <Grid container paddingTop={1} spacing={1}>
                <Grid item xs={6} order={"row"}>
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
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <Images />
                        <LocationSection />
                        <SuitableFor />
                        <Distances />
                        <Description />
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
};
export default LandFormSection;
