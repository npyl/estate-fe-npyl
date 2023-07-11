import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import * as React from "react";
import BasicForLandSection from "./components/BasicDetailsForLand";
import DescriptionSection from "./components/Description";
import FeaturesForLandSection from "./components/FeaturesForLand";
import FileSection from "./components/Files";
import ImageSection from "./components/Images";
import LocationSection from "./components/Location";
import PropertyDescriptionForLandSection from "./components/PropertyDescriptionForLand";
import SuitableForForLandSection from "./components/SuitableForForLand";
import TechnicalFeaturesAndInteriorForLandSection from "./components/TechnicalFeaturesAndInteriorForLand";
import ROISection from "./components/ROI";
import { useSelector, useDispatch } from "react-redux";

import {
  selectPropertyBlueprints,
  selectPropertyImages,
  setPropertyBlueprints,
  setPropertyImages,
} from "src/slices/property/files";

import { selectState } from "src/slices/property";

const LandFormSection: React.FC<any> = (props) => {
  const dispatch = useDispatch();

  const state = useSelector(selectState);
  const images = useSelector(selectPropertyImages);
  const blueprints = useSelector(selectPropertyBlueprints);

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

            <SuitableForForLandSection />
            <DescriptionSection />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
export default LandFormSection;
