import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import * as React from "react";
import BasicSection from "../Basic";
import ConstructionForOtherSection from "../ConstructionForOther";
import DescriptionSection from "../Description";
import FeaturesForOtherSection from "../FeaturesForOther";
import FileSection from "../Files";
import HeatingAndEnergyForCommercialSection from "../HeatingAndEnergyForCommercial";
import ImageSection from "../Images";
import LocationSection from "../Location";
import PropertyDescriptionForOtherSection from "../PropertyDescriptionForOther";
import SuitableForForOtherSection from "../SuitableForForOther";
import TechnicalFeaturesAndInteriorForOtherSection from "../TechnicalFeaturesAndInteriorForOther";
import ROISection from "../ROI";
import { useDispatch, useSelector } from "react-redux";

import {
  selectPropertyBlueprints,
  selectPropertyImages,
  setPropertyBlueprints,
  setPropertyImages,
} from "src/slices/property/files";

import { selectState, setState } from "src/slices/property";
const OtherFormSection: React.FC<any> = (props) => {
  const dispatch = useDispatch();

  const state = useSelector(selectState);
  const images = useSelector(selectPropertyImages);
  const blueprints = useSelector(selectPropertyBlueprints);

  return (
    <>
      <Grid container paddingTop={1} paddingRight={1} spacing={1}>
        <Grid item xs={6} spacing={1} order={"row"}>
          <Stack spacing={1}>
            <BasicSection />
            {state === "Sale" && <ROISection />}

            <PropertyDescriptionForOtherSection />
            <ConstructionForOtherSection />
            <FeaturesForOtherSection />
            <SuitableForForOtherSection />
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
