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
// import FileSection from "./Files";
import HeatingAndEnergyForResidentialSection from "./HeatingAndEnergyForCommercial";
import ImageSection from "./Images";
import LocationSection from "./Location";
import PropertyDescriptionForCommercialSection from "./PropertyDescriptionForCommercial";
import SuitableForForCommercialSection from "./SuitableForForCommercial";
import TechnicalFeaturesAndInteriorForCommercialSection from "./TechnicalFeaturesAndInteriorForCommercial";

const CommercialFormSection: React.FC<any> = (props) => {
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

            <PropertyDescriptionForCommercialSection enums={property} />

            <AreasSection enums={property} />
            <DistancesSection enums={property} />
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
            <HeatingAndEnergyForResidentialSection enums={property} />
            <SuitableForForCommercialSection enums={property} />
            <ConstructionForCommercialSection enums={property} />
            <TechnicalFeaturesAndInteriorForCommercialSection
              enums={property}
            />
            <DescriptionSection enums={property} />
          </Stack>
        </Grid>

        {/* <DetailsSection enums={property} /> */}
        <Grid item xs={12}>
          <FeaturesForCommercialSection enums={property} />
        </Grid>
      </Grid>
    </>
  );
};
export default CommercialFormSection;
