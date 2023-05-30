import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import * as React from "react";
import BasicForLandSection from "../BasicDetailsForLand";
import DescriptionSection from "../Description";
import FeaturesForLandSection from "../FeaturesForLand";
import FileSection from "../Files";
import ImageSection from "../Images";
import LocationSection from "../Location";
import PropertyDescriptionForLandSection from "../PropertyDescriptionForLand";
import SuitableForForLandSection from "../SuitableForForLand";
import TechnicalFeaturesAndInteriorForLandSection from "../TechnicalFeaturesAndInteriorForLand";
import ROISection from "../ROI";
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
      <Grid container paddingTop={1} paddingRight={1} spacing={1}>
        <Grid item xs={6} spacing={1} order={"row"}>
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
        <Grid item xs={6} spacing={1}>
          <Stack spacing={1}>
            <ImageSection
              images={images}
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
