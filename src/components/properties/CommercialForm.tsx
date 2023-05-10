import { useState } from "react";
import Stack from "@mui/material/Stack";
import BasicSection from "./Basic";
import FeaturesSection from "./Features";
import { useAllPropertyGlobalQuery } from "src/services/global";
import { IGlobalProperty } from "../../types/global";
import DescriptionSection from "./Description";
import LocationSection from "./Location";
import AreasSection from "./Areas";
import { Grid, Paper, TextField, Typography, Box } from "@mui/material";
import HeatingSection from "./HeatingAndEnergy";
import ParkingSection from "./Parking";
import BalconiesSection from "./Balconies";
import DistancesSection from "./Distances";
import PropertyDescriptionSection from "./PropertyDescription";
import ImageSection from "./Images";
import FileSection from "./Files";
import * as React from "react";
import HeatingAndEnergySection from "./HeatingAndEnergy";
import ConstructionForCommercialSection from "./ConstructionForCommercial";
import BackendConnectedDatePickerSection from "./test";
import PropertyDescriptionForCommercialSection from "./PropertyDescriptionForCommercial";
import HeatingAndEnergyForResidentialSection from "./HeatingAndEnergyForCommercial";
import TechnicalFeaturesAndInteriorForCommercialSection from "./TechnicalFeaturesAndInteriorForCommercial";
import SuitableForForCommercialSection from "./SuitableForForCommercial";
import FeaturesForCommercialSection from "./FeaturesForCommercial";

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
            <FileSection
              fileData={fileData}
              setFileData={setFileData}
              enums={property}
            />
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
