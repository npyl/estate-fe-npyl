import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import * as React from "react";
import AreasSection from "./components/Areas";
import BasicSection from "./components/BasicDetails";
import ConstructionForCommercialSection from "./components/ConstructionForCommercial";
import DescriptionSection from "./components/Description";
import DistancesSection from "./components/Distances";
import FeaturesForCommercialSection from "./components/FeaturesForCommercial";
import BlueprintsSection from "./components/Blueprints";
import HeatingAndEnergyForResidentialSection from "./components/HeatingAndEnergyForCommercial";
import ImageSection from "./components/Images";
import LocationSection from "src/components/Location/Location";
import PropertyDescriptionForCommercialSection from "./components/PropertyDescriptionForCommercial";
import SuitableForForCommercialSection from "./components/SuitableForForCommercial";
import TechnicalFeaturesAndInteriorForCommercialSection from "./components/TechnicalFeaturesAndInteriorForCommercial";

import ROISection from "./components/ROI";
import { useSelector, useDispatch } from "react-redux";

import NotesSection from "./components/NotesSection";
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
    setCity,
    setZipCode,
    setComplex,
    setRegion,
    setCountry,
    setLatitude,
    setLongitude,
} from "src/slices/property";
import { IPropertyImage, IPropertyImagePOST } from "src/types/file";
import DocumentsSection from "./components/Documents";

const CommercialFormSection: React.FC<any> = () => {
    const dispatch = useDispatch();

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
                        <PropertyDescriptionForCommercialSection />
                        <HeatingAndEnergyForResidentialSection />
                        <AreasSection />
                        <DistancesSection />
                        <BlueprintsSection />
                        <DocumentsSection />
                        <NotesSection />
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
