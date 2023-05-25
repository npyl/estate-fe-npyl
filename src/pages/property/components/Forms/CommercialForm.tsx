import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import * as React from "react";
import AreasSection from "../Areas";
import BasicSection from "../BasicDetails";
import ConstructionForCommercialSection from "../ConstructionForCommercial";
import DescriptionSection from "../Description";
import DistancesSection from "../Distances";
import FeaturesForCommercialSection from "../FeaturesForCommercial";
import FileSection from "../Files";
import HeatingAndEnergyForResidentialSection from "../HeatingAndEnergyForCommercial";
import ImageSection from "../Images";
import LocationSection from "../Location";
import PropertyDescriptionForCommercialSection from "../PropertyDescriptionForCommercial";
import SuitableForForCommercialSection from "../SuitableForForCommercial";
import TechnicalFeaturesAndInteriorForCommercialSection from "../TechnicalFeaturesAndInteriorForCommercial";

import ROISection from "../ROI";
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
      <Grid container paddingTop={1} paddingRight={1} spacing={1}>
        <Grid item xs={6} spacing={1} order={"row"}>
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
        <Grid item xs={6} spacing={1}>
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
