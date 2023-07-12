import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import * as React from "react";
import BasicSection from "./components/BasicDetails";
import ConstructionForOtherSection from "./components/ConstructionForOther";
import DescriptionSection from "./components/Description";
import FeaturesForOtherSection from "./components/FeaturesForOther";
import FileSection from "./components/Files";
import HeatingAndEnergyForCommercialSection from "./components/HeatingAndEnergyForCommercial";
import ImageSection from "./components/Images";
import LocationSection from "src/components/Location";
import PropertyDescriptionForOtherSection from "./components/PropertyDescriptionForOther";
import SuitableForForOtherSection from "./components/SuitableForForOther";
import TechnicalFeaturesAndInteriorForOtherSection from "./components/TechnicalFeaturesAndInteriorForOther";
import ROISection from "./components/ROI";
import { useDispatch, useSelector } from "react-redux";

import {
  selectPropertyBlueprints,
  selectPropertyImages,
  setPropertyBlueprints,
  setPropertyImages,
} from "src/slices/property/files";

import { 
  selectState, 

  selectStreet,
  selectNumber,
  selectCity,
  selectComplex,
  selectZipCode,
  selectRegion,
  selectCountry,

  setStreet,
  setNumber,
  setCity,
  setComplex,
  setZipCode,
  setRegion,
  setCountry,
} from "src/slices/property";

const OtherFormSection: React.FC<any> = (props) => {
  const dispatch = useDispatch();

  const state = useSelector(selectState);
  const images = useSelector(selectPropertyImages);
  const blueprints = useSelector(selectPropertyBlueprints);

  const street = useSelector(selectStreet);
  const number = useSelector(selectNumber);
  const city = useSelector(selectCity);
  const complex = useSelector(selectComplex);
  const zipCode = useSelector(selectZipCode);
  const region = useSelector(selectRegion);
  const country = useSelector(selectCountry);

  return (
    <>
      <Grid container paddingTop={1} spacing={1}>
        <Grid item xs={6} order={"row"}>
          <Stack spacing={1}>
            <BasicSection />
            {state === "Sale" && <ROISection />}

            <PropertyDescriptionForOtherSection />
            <ConstructionForOtherSection />
            <FeaturesForOtherSection />
            <SuitableForForOtherSection />
            <FileSection
              fileData={blueprints}
              setFileData={(blueprints) => {
                dispatch(setPropertyBlueprints(blueprints));
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            <ImageSection
              files={images}
              setFiles={(images) => {
                dispatch(setPropertyImages(images));
              }}
            />

            <LocationSection
              street={street}
              number={number}
              city={city}
              complex={complex}
              zipCode={zipCode}
              region={region}
              country={country}

              setStreet={setStreet}
              setNumber={setNumber}
              setCity={setCity}
              setComplex={setComplex}
              setZipCode={setZipCode}
              setRegion={setRegion}
              setCountry={setCountry}
            />

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
