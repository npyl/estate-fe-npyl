import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useState } from "react";
import { useAllPropertyGlobalQuery } from "src/services/global";
import { IGlobalProperty } from "../../types/global";
import AreasSection from "./Areas";
import BalconiesSection from "./Balconies";
import BasicSection from "./Basic";
import ConstructionForResidentialSection from "./ConstructionForResidential";
import DescriptionSection from "./Description";
import DistancesSection from "./Distances";
import FeaturesSection from "./Features";
// import FileSection from "./Files";
import HeatingAndEnergySection from "./HeatingAndEnergy";
import ImageSection from "./Images";
import LocationSection from "./Location";
import ParkingSection from "./Parking";
import PropertyDescriptionSection from "./PropertyDescription";
import SuitableForForResidentialSection from "./SuitableForForResidential";
import TechnicalFeaturesAndInteriorForResidentialSection from "./TechnicalFeaturesAndInteriorForResidential";

const ResidentialFormSection: React.FC<any> = (props) => {
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

            <PropertyDescriptionSection enums={property} />

            <AreasSection enums={property} />
            <DistancesSection enums={property} />
            <SuitableForForResidentialSection enums={property} />
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
            <HeatingAndEnergySection enums={property} />

            <ParkingSection enums={property} />

            <BalconiesSection enums={property} />
            <ConstructionForResidentialSection enums={property} />
            <TechnicalFeaturesAndInteriorForResidentialSection
              enums={property}
            />

            <DescriptionSection enums={property} />
          </Stack>
        </Grid>

        {/* <DetailsSection enums={property} /> */}
        <Grid item xs={12}>
          <FeaturesSection enums={property} />
        </Grid>
      </Grid>
    </>
  );
};
export default ResidentialFormSection;
