import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import * as React from "react";
import BasicSection from "./components/BasicDetails";
import ConstructionForOtherSection from "./components/ConstructionForOther";
import DescriptionSection from "./components/Description";
import FeaturesForOtherSection from "./components/FeaturesForOther";
import BlueprintsSection from "./components/Blueprints";
import HeatingAndEnergyForCommercialSection from "./components/HeatingAndEnergyForCommercial";
import ImageSection from "./components/Images";
import LocationSection from "src/components/Location/Location";
import PropertyDescriptionForOtherSection from "./components/PropertyDescriptionForOther";
import SuitableForForOtherSection from "./components/SuitableForForOther";
import TechnicalFeaturesAndInteriorForOtherSection from "./components/TechnicalFeaturesAndInteriorForOther";
import ROISection from "./components/ROI";
import { useSelector } from "react-redux";

import {
    selectState,
    selectStreet,
    selectNumber,
    selectCity,
    selectZipCode,
    selectRegion,
    selectCountry,
    selectLatitude,
    selectLongitude,
    selectComplex,
    // setters
    setComplex,
    setStreet,
    setNumber,
    setCity,
    setZipCode,
    setRegion,
    setCountry,
    setLatitude,
    setLongitude,
} from "src/slices/property";

const OtherFormSection: React.FC = () => {
    const state = useSelector(selectState);

    const street = useSelector(selectStreet);
    const number = useSelector(selectNumber);
    const city = useSelector(selectCity);
    const zipCode = useSelector(selectZipCode);
    const complex = useSelector(selectComplex);
    const region = useSelector(selectRegion);
    const country = useSelector(selectCountry);
    const lat = useSelector(selectLatitude);
    const lng = useSelector(selectLongitude);

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
                        <BlueprintsSection />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <ImageSection />

                        <LocationSection
                            street={street}
                            number={number}
                            city={city}
                            zipCode={zipCode}
                            region={region}
                            country={country}
                            complex={complex}
                            lat={lat}
                            lng={lng}
                            // setters
                            setStreet={setStreet}
                            setNumber={setNumber}
                            setCity={setCity}
                            setZipCode={setZipCode}
                            setComplex={setComplex}
                            setRegion={setRegion}
                            setCountry={setCountry}
                            setLatitude={setLatitude}
                            setLongitude={setLongitude}
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
