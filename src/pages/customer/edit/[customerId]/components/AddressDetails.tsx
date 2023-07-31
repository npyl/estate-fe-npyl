import * as React from "react";

import {
    selectCity,
    selectCountry,
    selectNumber,
    selectRegion,
    selectStreet,
    selectZipCode,
    selectLatitude,
    selectLongitude,
    // setters
    setStreet,
    setZipCode,
    setCity,
    setCountry,
    setNumber,
    setRegion,
    setLatitude,
    setLongitude,
} from "src/slices/customer";

import { useSelector } from "react-redux";

import LocationSection from "src/components/Location/Location";

const AddressDetails: React.FC<any> = (props) => {
    const street = useSelector(selectStreet);
    const number = useSelector(selectNumber);
    const city = useSelector(selectCity);
    const zipCode = useSelector(selectZipCode);
    const region = useSelector(selectRegion);
    const country = useSelector(selectCountry);
    const lat = useSelector(selectLatitude);
    const lng = useSelector(selectLongitude);

    return (
        <LocationSection
            street={street}
            number={number}
            city={city}
            zipCode={zipCode}
            region={region}
            country={country}
            lat={lat}
            lng={lng}
            // setters
            setStreet={setStreet}
            setNumber={setNumber}
            setCity={setCity}
            setZipCode={setZipCode}
            setRegion={setRegion}
            setCountry={setCountry}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
        />
    );
};
export default AddressDetails;
