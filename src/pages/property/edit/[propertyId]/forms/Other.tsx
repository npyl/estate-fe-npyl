import { Grid, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import * as React from "react";

import {
    BasicDetails,
    DescriptionEditor,
    Blueprints,
    Images,
    ROI,
    VideoLink,
    Documents,
    Notes,
} from "./_general";

// TODO: is this wrong?
import { HeatingAndEnergy } from "./_commercial";

import {
    Construction,
    Features,
    Description,
    SuitableFor,
    TechnicalFeaturesAndInterior,
} from "./_other";

import LocationSection from "src/components/Location/Location";

import { selectState } from "src/slices/property";

const OtherFormSection: React.FC = () => {
    const state = useSelector(selectState);

    return (
        <>
            <Grid container paddingTop={1} spacing={1}>
                <Grid item xs={6} order={"row"}>
                    <Stack spacing={1}>
                        <BasicDetails />
                        {state === "Sale" && <ROI />}

                        <Description />
                        <Construction />
                        <Features />
                        <SuitableFor />
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
                        <HeatingAndEnergy />
                        <TechnicalFeaturesAndInterior />
                        <DescriptionEditor />
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
};
export default OtherFormSection;
