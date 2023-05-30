import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import * as React from "react";
import AreasSection from "../Areas";
import BalconiesSection from "../Balconies";
import BasicSection from "../BasicDetails";
import ConstructionForResidentialSection from "../ConstructionForResidential";
import DescriptionSection from "../Description";
import DistancesSection from "../Distances";
import FeaturesSection from "../Features";
import FileSection from "../Files";
import HeatingAndEnergySection from "../HeatingAndEnergy";
import ImageSection from "../Images";
import LocationSection from "../Location";
import ParkingSection from "../Parking";
import PropertyDescriptionSection from "../PropertyDescription";
import SuitableForForResidentialSection from "../SuitableForForResidential";
import TechnicalFeaturesAndInteriorForResidentialSection from "../TechnicalFeaturesAndInteriorForResidential";
import ROISection from "../ROI";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";

import {
  setPropertyImages,
  setPropertyBlueprints,
} from "src/slices/property/files";

import { selectState } from "src/slices/property";
import {
  selectPropertyBlueprints,
  selectPropertyImages,
} from "src/slices/property/files";

const ResidentialFormSection: React.FC<any> = (props) => {
  const dispatch = useDispatch();

  const images = useSelector(selectPropertyImages);
  const blueprints = useSelector(selectPropertyBlueprints);

  const state = useSelector(selectState);

  return (
    <>
      <Grid container paddingTop={1} paddingRight={1} spacing={1}>
        <Grid item xs={6} order={"row"}>
          <Stack spacing={1}>
            <BasicSection />
            {/* <ROISection /> */}
            {state === "Sale" && <ROISection />}

            <PropertyDescriptionSection />
            <ConstructionForResidentialSection />
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
        <Grid item xs={6} >
          <Stack spacing={1}>
            <ImageSection
              files={images}
              setFiles={(images) => {
                dispatch(setPropertyImages(images));
              }}
            />
            <LocationSection />
            <HeatingAndEnergySection />

            <ParkingSection />

            <BalconiesSection />

            <TechnicalFeaturesAndInteriorForResidentialSection />
            <SuitableForForResidentialSection />

            <DescriptionSection />
          </Stack>
        </Grid>

        {/* <DetailsSection enums={property} /> */}
        <Grid item xs={12}>
          <FeaturesSection />
        </Grid>
      </Grid>
    </>
  );
};
export default ResidentialFormSection;
