import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useState } from "react";
import { useAllPropertyGlobalQuery } from "src/services/global";
import { IGlobalProperty } from "../../types/global";
import BasicForLandSection from "./BasicDetailsForLand";
import DescriptionSection from "./Description";
import FeaturesForLandSection from "./FeaturesForLand";
// import FileSection from "./Files";
import ImageSection from "./Images";
import LocationSection from "./Location";
import PropertyDescriptionForLandSection from "./PropertyDescriptionForLand";
import SuitableForForLandSection from "./SuitableForForLand";
import TechnicalFeaturesAndInteriorForLandSection from "./TechnicalFeaturesAndInteriorForLand";

const LandFormSection: React.FC<any> = (props) => {
  const { data } = useAllPropertyGlobalQuery();
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [fileData, setFileData] = useState<(File | string)[]>([]);
  const property: IGlobalProperty = data?.property as IGlobalProperty;

  return (
    <>
      <Grid container paddingTop={1} paddingRight={1} spacing={1}>
        <Grid item xs={6} spacing={1} order={"row"}>
          <Stack spacing={1}>
            <BasicForLandSection enums={property} />
            <PropertyDescriptionForLandSection enums={property} />
            <FeaturesForLandSection enums={property} />
            {/* <FileSection
              fileData={fileData}
              setFileData={setFileData}
              enums={property}
            /> */}
          </Stack>
        </Grid>
        <Grid item xs={6} spacing={1}>
          <Stack spacing={1}>
            <ImageSection files={files} setFiles={setFiles} enums={property} />
            <LocationSection enums={property} />

            <TechnicalFeaturesAndInteriorForLandSection enums={property} />
            <SuitableForForLandSection enums={property} />
            <DescriptionSection enums={property} />
          </Stack>
        </Grid>

        <Grid item xs={12}></Grid>
      </Grid>
    </>
  );
};
export default LandFormSection;
