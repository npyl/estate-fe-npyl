import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import * as React from "react";
import BasicForLandSection from "./components/BasicDetailsForLand";
import DescriptionSection from "./components/Description";
import FeaturesForLandSection from "./components/FeaturesForLand";
import BlueprintsSection from "./components/Blueprints";
import ImageSection from "./components/Images";
import LocationSection from "src/components/Location/Location";
import PropertyDescriptionForLandSection from "./components/PropertyDescriptionForLand";
import SuitableForForLandSection from "./components/SuitableForForLand";
import TechnicalFeaturesAndInteriorForLandSection from "./components/TechnicalFeaturesAndInteriorForLand";
import ROISection from "./components/ROI";
import { useSelector } from "react-redux";
import VideoLinkSection from "./components/VideoLink";

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
    setStreet,
    setNumber,
    setComplex,
    setCity,
    setZipCode,
    setRegion,
    setCountry,
    setLatitude,
    setLongitude,
} from "src/slices/property";
import DocumentsSection from "./components/Documents";

const LandFormSection: React.FC<any> = () => {
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
                        <BasicForLandSection />
                        {state === "Sale" && <ROISection />}
                        <TechnicalFeaturesAndInteriorForLandSection />
                        <PropertyDescriptionForLandSection />
                        <FeaturesForLandSection />
                        <BlueprintsSection />
                        <DocumentsSection />
                        <VideoLinkSection />
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
                        <SuitableForForLandSection />
                        <DescriptionSection />
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
};
export default LandFormSection;
