import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import * as React from "react";
import AreasSection from "./components/Areas";
import BasicSection from "./components/BasicDetails";
import ConstructionForCommercialSection from "./components/ConstructionForCommercial";
import DescriptionSection from "./components/Description";
import DistancesSection from "./components/Distances";
import FeaturesForCommercialSection from "./components/FeaturesForCommercial";
import FileSection from "./components/Files";
import HeatingAndEnergyForResidentialSection from "./components/HeatingAndEnergyForCommercial";
import ImageSection from "./components/Images";
import LocationSection from "./components/Location";
import PropertyDescriptionForCommercialSection from "./components/PropertyDescriptionForCommercial";
import SuitableForForCommercialSection from "./components/SuitableForForCommercial";
import TechnicalFeaturesAndInteriorForCommercialSection from "./components/TechnicalFeaturesAndInteriorForCommercial";

import ROISection from "./components/ROI";
import { useSelector, useDispatch } from "react-redux";

import {
  selectPropertyBlueprints,
  selectPropertyImages,
  setPropertyBlueprints,
  setPropertyImages,
} from "src/slices/property/files";

import { selectState } from "src/slices/property";

const CommercialFormSection: React.FC<any> = (props) => {
  const dispatch = useDispatch();

  const images = useSelector(selectPropertyImages);
  const blueprints = useSelector(selectPropertyBlueprints);
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
            <FileSection
              fileData={blueprints}
              setFileData={(blueprints) => {
                dispatch(setPropertyBlueprints(blueprints));
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            <ImageSection
              files={images}
              setFiles={(images) => {
                dispatch(setPropertyImages(images));
              }}
            />
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
