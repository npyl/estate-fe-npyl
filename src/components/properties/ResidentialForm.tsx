import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useState } from "react";
import { useAllGlobalsQuery } from "src/services/global";
import { IGlobalProperty } from "../../types/global";
import AreasSection from "./Areas";
import BalconiesSection from "./Balconies";
import BasicSection from "./Basic";
import ConstructionForResidentialSection from "./ConstructionForResidential";
import DescriptionSection from "./Description";
import DistancesSection from "./Distances";
import FeaturesSection from "./Features";
import FileSection from "./Files";
import HeatingAndEnergySection from "./HeatingAndEnergy";
import ImageSection from "./Images";
import LocationSection from "./Location";
import ParkingSection from "./Parking";
import PropertyDescriptionSection from "./PropertyDescription";
import SuitableForForResidentialSection from "./SuitableForForResidential";
import TechnicalFeaturesAndInteriorForResidentialSection from "./TechnicalFeaturesAndInteriorForResidential";
import ROISection from "./ROI";
import { useDispatch, useSelector } from "react-redux";

import { selectState, setState } from "src/slices/property";

const ResidentialFormSection: React.FC<any> = (props) => {
  const { data } = useAllGlobalsQuery();
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
            {/* <ROISection /> */}
            {state === "Sale" && <ROISection />}

            <PropertyDescriptionSection />
            <ConstructionForResidentialSection />
            <AreasSection />
            <DistancesSection />

            <FileSection fileData={fileData} setFileData={setFileData} />
          </Stack>
        </Grid>
        <Grid item xs={6} spacing={1}>
          <Stack spacing={1}>
            <ImageSection files={files} setFiles={setFiles} />
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
