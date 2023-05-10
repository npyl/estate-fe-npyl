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
// import FileSection from "./Files";
import HeatingAndEnergyForCommercialSection from "./HeatingAndEnergyForCommercial";
import ImageSection from "./Images";
import LocationSection from "./Location";
import PropertyDescriptionForOtherSection from "./PropertyDescriptionForOther";
import SuitableForForOtherSection from "./SuitableForForOther";
import TechnicalFeaturesAndInteriorForOtherSection from "./TechnicalFeaturesAndInteriorForOther";

const OtherFormSection: React.FC<any> = (props) => {
  const { data } = useAllPropertyGlobalQuery();
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [fileData, setFileData] = useState<(File | string)[]>([]);
  const property: IGlobalProperty = data?.property as IGlobalProperty;

  return (
    <>
      <Grid container paddingTop={1} paddingRight={1} spacing={1}>
        <Grid item xs={6} spacing={1} order={"row"}>
          <Stack spacing={1}>
            <BasicSection enums={property} />

            <PropertyDescriptionForOtherSection enums={property} />
            <FeaturesForOtherSection enums={property} />
            <SuitableForForOtherSection enums={property} />
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
            <HeatingAndEnergyForCommercialSection enums={property} />
            <ConstructionForOtherSection enums={property} />
            <TechnicalFeaturesAndInteriorForOtherSection enums={property} />
            <DescriptionSection enums={property} />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
export default OtherFormSection;
