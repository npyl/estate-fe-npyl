import { Grid, Stack } from "@mui/material";
import * as React from "react";
import AreasSection from "./components/Areas";
import BalconiesSection from "./components/Balconies";
import BasicSection from "./components/BasicDetails";
import ConstructionForResidentialSection from "./components/ConstructionForResidential";
import DescriptionSection from "./components/Description";
import DistancesSection from "./components/Distances";
import FeaturesSection from "./components/Features";
import BlueprintsSection from "./components/Blueprints";
import HeatingAndEnergySection from "./components/HeatingAndEnergy";
import ImageSection from "./components/Images";
import LocationSection from "src/components/Location/Location";
import ParkingSection from "./components/Parking";
import PropertyDescriptionSection from "./components/PropertyDescription";
import SuitableForForResidentialSection from "./components/SuitableForForResidential";
import TechnicalFeaturesAndInteriorForResidentialSection from "./components/TechnicalFeaturesAndInteriorForResidential";
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
    selectComplex,
    selectLatitude,
    selectLongitude,
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

import NotesSection from "./components/NotesSection";
import VideoLinkSection from "./components/VideoLink";

const ResidentialFormSection: React.FC<any> = (props) => {
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
                        {/* <ROISection /> */}
                        {state === "Sale" && <ROISection />}

                        <PropertyDescriptionSection />
                        <ConstructionForResidentialSection />
                        <AreasSection />
                        <DistancesSection />
                        <BlueprintsSection />
                        <VideoLinkSection></VideoLinkSection>
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
