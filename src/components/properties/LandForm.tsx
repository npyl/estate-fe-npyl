import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useState } from "react";
import { useAllPropertyGlobalQuery } from "src/services/global";
import { IGlobalProperty } from "../../types/global";
import BasicForLandSection from "./BasicDetailsForLand";
import DescriptionSection from "./Description";
import FeaturesForLandSection from "./FeaturesForLand";
import FileSection from "./Files";
import ImageSection from "./Images";
import LocationSection from "./Location";
import PropertyDescriptionForLandSection from "./PropertyDescriptionForLand";
import SuitableForForLandSection from "./SuitableForForLand";
import TechnicalFeaturesAndInteriorForLandSection from "./TechnicalFeaturesAndInteriorForLand";

const LandFormSection: React.FC<any> = (props) => {
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [fileData, setFileData] = useState<(File | string)[]>([]);

  return (
    <>
      <Grid container paddingTop={1} paddingRight={1} spacing={1}>
        <Grid item xs={6} spacing={1} order={"row"}>
          <Stack spacing={1}>
            <BasicForLandSection />
            <PropertyDescriptionForLandSection />
            <FeaturesForLandSection />
            <FileSection fileData={fileData} setFileData={setFileData} />
          </Stack>
        </Grid>
        <Grid item xs={6} spacing={1}>
          <Stack spacing={1}>
            <ImageSection files={files} setFiles={setFiles} />
            <LocationSection />

            <TechnicalFeaturesAndInteriorForLandSection />
            <SuitableForForLandSection />
            <DescriptionSection />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
export default LandFormSection;
