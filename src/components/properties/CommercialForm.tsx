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

const CommercialFormSection: React.FC<any> = (props) => {
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [fileData, setFileData] = useState<(File | string)[]>([]);

  return (
    <>
      <Grid container paddingTop={1} paddingRight={1} spacing={1}>
        <Grid item xs={6} spacing={1} order={"row"}>
          <Stack spacing={1}>
            <BasicSection />

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
