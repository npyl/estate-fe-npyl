import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import * as React from "react";
import BasicSection from "./components/BasicDetails";
import ConstructionForOtherSection from "./components/ConstructionForOther";
import DescriptionSection from "./components/Description";
import FeaturesForOtherSection from "./components/FeaturesForOther";
import FileSection from "./components/Files";
import HeatingAndEnergyForCommercialSection from "./components/HeatingAndEnergyForCommercial";
import ImageSection from "./components/Images";
import LocationSection from "./components/Location";
import PropertyDescriptionForOtherSection from "./components/PropertyDescriptionForOther";
import SuitableForForOtherSection from "./components/SuitableForForOther";
import TechnicalFeaturesAndInteriorForOtherSection from "./components/TechnicalFeaturesAndInteriorForOther";
import ROISection from "./components/ROI";
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
      <Grid container paddingTop={1} spacing={1}>
        <Grid item xs={6} order={"row"}>
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
        <Grid item xs={6}>
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
