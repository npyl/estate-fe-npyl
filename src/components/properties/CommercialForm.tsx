import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useState } from "react";
import { useAllPropertyGlobalQuery } from "src/services/global";
import { IGlobalProperty } from "../../types/global";
import AreasSection from "./Areas";
import BasicSection from "./Basic";
import ConstructionForCommercialSection from "./ConstructionForCommercial";
import DescriptionSection from "./Description";
import DistancesSection from "./Distances";
import FeaturesForCommercialSection from "./FeaturesForCommercial";
import FileSection from "./Files";
import HeatingAndEnergyForResidentialSection from "./HeatingAndEnergyForCommercial";
import ImageSection from "./Images";
import LocationSection from "./Location";
import PropertyDescriptionForCommercialSection from "./PropertyDescriptionForCommercial";
import SuitableForForCommercialSection from "./SuitableForForCommercial";
import TechnicalFeaturesAndInteriorForCommercialSection from "./TechnicalFeaturesAndInteriorForCommercial";
import DetailsSection from "./Details";

import BalconiesSection from "./Balconies";

import ConstructionForResidentialSection from "./ConstructionForResidential";

import FeaturesSection from "./Features";

import HeatingAndEnergySection from "./HeatingAndEnergy";

import ParkingSection from "./Parking";
import PropertyDescriptionSection from "./PropertyDescription";
import SuitableForForResidentialSection from "./SuitableForForResidential";
import TechnicalFeaturesAndInteriorForResidentialSection from "./TechnicalFeaturesAndInteriorForResidential";
import ROISection from "./ROI";
import { useDispatch, useSelector } from "react-redux";

import { selectState, setState } from "src/slices/property";

const CommercialFormSection: React.FC<any> = (props) => {
  const { data } = useAllPropertyGlobalQuery();
  const enums: IGlobalProperty = data?.property as IGlobalProperty;
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [fileData, setFileData] = useState<(File | string)[]>([]);
  const state = useSelector(selectState);
  const stateEnum = enums?.state;

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
            <FileSection fileData={fileData} setFileData={setFileData} />
          </Stack>
        </Grid>
        <Grid item xs={6} spacing={1}>
          <Stack spacing={1}>
            <ImageSection files={files} setFiles={setFiles} />
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
