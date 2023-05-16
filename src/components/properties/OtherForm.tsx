import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useState } from "react";
import { useAllPropertyGlobalQuery } from "src/services/global";
import { IGlobalProperty } from "../../types/global";
import BasicSection from "./Basic";
import ConstructionForOtherSection from "./ConstructionForOther";
import DescriptionSection from "./Description";
import FeaturesForOtherSection from "./FeaturesForOther";
import FileSection from "./Files";
import HeatingAndEnergyForCommercialSection from "./HeatingAndEnergyForCommercial";
import ImageSection from "./Images";
import LocationSection from "./Location";
import PropertyDescriptionForOtherSection from "./PropertyDescriptionForOther";
import SuitableForForOtherSection from "./SuitableForForOther";
import TechnicalFeaturesAndInteriorForOtherSection from "./TechnicalFeaturesAndInteriorForOther";
import ROISection from "./ROI";
import { useDispatch, useSelector } from "react-redux";

import { selectState, setState } from "src/slices/property";
const OtherFormSection: React.FC<any> = (props) => {
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

            <PropertyDescriptionForOtherSection />
            <ConstructionForOtherSection />
            <FeaturesForOtherSection />
            <SuitableForForOtherSection />
            <FileSection fileData={fileData} setFileData={setFileData} />
          </Stack>
        </Grid>
        <Grid item xs={6} spacing={1}>
          <Stack spacing={1}>
            <ImageSection files={files} setFiles={setFiles} />
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
