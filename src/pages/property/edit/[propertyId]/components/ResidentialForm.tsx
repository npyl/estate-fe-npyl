import { Grid, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import * as React from "react";

import AreasSection from "./components/Areas";
import BalconiesSection from "./components/Balconies";
import BasicSection from "./components/BasicDetails";
import ConstructionForResidentialSection from "./components/ConstructionForResidential";
import DescriptionSection from "./components/Description";
import DistancesSection from "./components/Distances";
import FeaturesSection from "./components/Features";
import BlueprintsSection from "./components/Blueprints";
import HeatingAndEnergySection from "./components/HeatingAndEnergy";
import ImageSection from "./components/Images";
import LocationSection from "src/components/Location/Location";
import ParkingSection from "./components/Parking";
import PropertyDescriptionSection from "./components/PropertyDescription";
import SuitableForForResidentialSection from "./components/SuitableForForResidential";
import TechnicalFeaturesAndInteriorForResidentialSection from "./components/TechnicalFeaturesAndInteriorForResidential";
import ROISection from "./components/ROI";
import NotesSection from "./components/NotesSection";
import VideoLinkSection from "./components/VideoLink";
import DocumentsSection from "./components/Documents";

import { selectState } from "src/slices/property";

const ResidentialFormSection: React.FC = () => {
    const state = useSelector(selectState);

    return (
        <>
            <Grid container paddingTop={1} spacing={1}>
                <Grid item xs={6} order={"row"}>
                    <Stack spacing={1}>
                        <BasicSection />
                        {/* <ROISection /> */}
                        {state === "Sale" && <ROISection />}

                        <PropertyDescriptionSection />
                        <ConstructionForResidentialSection />
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

                        <HeatingAndEnergySection />

                        <ParkingSection />

                        <BalconiesSection />

                        <TechnicalFeaturesAndInteriorForResidentialSection />
                        <SuitableForForResidentialSection />

                        <DescriptionSection />
                    </Stack>
                </Grid>

                <Grid item xs={12}>
                    <FeaturesSection />
                </Grid>
            </Grid>
        </>
    );
};
export default ResidentialFormSection;
