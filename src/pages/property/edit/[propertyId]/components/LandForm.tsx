import { Grid, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import * as React from "react";

import BasicForLandSection from "./components/BasicDetailsForLand";
import DescriptionSection from "./components/Description";
import FeaturesForLandSection from "./components/FeaturesForLand";
import BlueprintsSection from "./components/Blueprints";
import ImageSection from "./components/Images";
import LocationSection from "src/components/Location/Location";
import PropertyDescriptionForLandSection from "./components/PropertyDescriptionForLand";
import SuitableForForLandSection from "./components/SuitableForForLand";
import TechnicalFeaturesAndInteriorForLandSection from "./components/TechnicalFeaturesAndInteriorForLand";
import ROISection from "./components/ROI";
import VideoLinkSection from "./components/VideoLink";
import DocumentsSection from "./components/Documents";
import DistancesSection from "./components/Distances";

import { selectState } from "src/slices/property";

const LandFormSection: React.FC<any> = () => {
    const state = useSelector(selectState);

    return (
        <>
            <Grid container paddingTop={1} spacing={1}>
                <Grid item xs={6} order={"row"}>
                    <Stack spacing={1}>
                        <BasicForLandSection />
                        {state === "Sale" && <ROISection />}
                        <TechnicalFeaturesAndInteriorForLandSection />
                        <PropertyDescriptionForLandSection />
                        <FeaturesForLandSection />
                        <BlueprintsSection />
                        <DocumentsSection />
                        <VideoLinkSection />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <ImageSection />
                        <LocationSection />
                        <SuitableForForLandSection />
                        <DistancesSection />
                        <DescriptionSection />
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
};
export default LandFormSection;
