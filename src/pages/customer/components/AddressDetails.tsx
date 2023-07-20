import * as React from "react";

import {
	selectCity,
	selectCountry,
	selectNumber,
	selectRegion,
	selectStreet,
	selectZipCode,
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

	return (
		<LocationSection
			street={street}
			number={number}
			city={city}
			zipCode={zipCode}
			region={region}
			country={country}
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
