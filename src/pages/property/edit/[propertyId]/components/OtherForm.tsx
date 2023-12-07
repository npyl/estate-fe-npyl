import { Grid, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import * as React from "react";

import BasicSection from "./components/BasicDetails";
import ConstructionForOtherSection from "./components/ConstructionForOther";
import DescriptionSection from "./components/Description";
import FeaturesForOtherSection from "./components/FeaturesForOther";
import BlueprintsSection from "./components/Blueprints";
import HeatingAndEnergyForCommercialSection from "./components/HeatingAndEnergyForCommercial";
import ImageSection from "./components/Images";
import LocationSection from "src/components/Location/Location";
import PropertyDescriptionForOtherSection from "./components/PropertyDescriptionForOther";
import SuitableForForOtherSection from "./components/SuitableForForOther";
import TechnicalFeaturesAndInteriorForOtherSection from "./components/TechnicalFeaturesAndInteriorForOther";
import ROISection from "./components/ROI";
import VideoLinkSection from "./components/VideoLink";
import DocumentsSection from "./components/Documents";
import { selectState } from "src/slices/property";

const OtherFormSection: React.FC = () => {
    const state = useSelector(selectState);

    return (
        <>
            <Grid container paddingTop={1} spacing={1}>
                <Grid item xs={6} order={"row"}>
                    <Stack spacing={1}>
                        <BasicSection />
                        {state === "Sale" && <ROISection />}

                        <PropertyDescriptionForOtherSection />
                        <ConstructionForOtherSection />
                        <FeaturesForOtherSection />
                        <SuitableForForOtherSection />
                        <BlueprintsSection />
                        <DocumentsSection />
                        <VideoLinkSection />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <ImageSection />
                        <LocationSection />
                        <HeatingAndEnergyForCommercialSection />
                        <TechnicalFeaturesAndInteriorForOtherSection />
                        <DescriptionSection />
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
};
export default OtherFormSection;
