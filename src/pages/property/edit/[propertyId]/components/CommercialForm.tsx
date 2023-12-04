import { Grid, Stack } from "@mui/material";
import * as React from "react";

import { useSelector } from "react-redux";

import AreasSection from "./components/Areas";
import BasicSection from "./components/BasicDetails";
import ConstructionForCommercialSection from "./components/ConstructionForCommercial";
import DescriptionSection from "./components/Description";
import DistancesSection from "./components/Distances";
import FeaturesForCommercialSection from "./components/FeaturesForCommercial";
import BlueprintsSection from "./components/Blueprints";
import HeatingAndEnergyForResidentialSection from "./components/HeatingAndEnergyForCommercial";
import ImageSection from "./components/Images";
import LocationSection from "src/components/Location/Location";
import PropertyDescriptionForCommercialSection from "./components/PropertyDescriptionForCommercial";
import SuitableForForCommercialSection from "./components/SuitableForForCommercial";
import TechnicalFeaturesAndInteriorForCommercialSection from "./components/TechnicalFeaturesAndInteriorForCommercial";
import VideoLinkSection from "./components/VideoLink";
import NotesSection from "./components/NotesSection";
import DocumentsSection from "./components/Documents";
import ROISection from "./components/ROI";

import { selectState } from "src/slices/property";

const CommercialFormSection: React.FC<any> = () => {
    const state = useSelector(selectState);

    return (
        <>
            <Grid container paddingTop={1} spacing={1}>
                <Grid item xs={6} order={"row"}>
                    <Stack spacing={1}>
                        <BasicSection />
                        {state === "Sale" && <ROISection />}
                        <PropertyDescriptionForCommercialSection />
                        <HeatingAndEnergyForResidentialSection />
                        <AreasSection />
                        <DistancesSection />
                        <BlueprintsSection />
                        <DocumentsSection />
                        <VideoLinkSection />
                        <NotesSection />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <ImageSection />
                        <LocationSection />
                        <SuitableForForCommercialSection />
                        <ConstructionForCommercialSection />
                        <TechnicalFeaturesAndInteriorForCommercialSection />
                        <DescriptionSection />
                    </Stack>
                </Grid>

                <Grid item xs={12}>
                    <FeaturesForCommercialSection />
                </Grid>
            </Grid>
        </>
    );
};
export default CommercialFormSection;
