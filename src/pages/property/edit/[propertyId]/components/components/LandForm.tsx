import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import * as React from "react";
import BasicForLandSection from "./components/BasicDetailsForLand";
import DescriptionSection from "./components/Description";
import FeaturesForLandSection from "./components/FeaturesForLand";
import FileSection from "./components/Files";
import ImageSection from "./components/Images";
import LocationSection from "src/components/Location/Location";
import PropertyDescriptionForLandSection from "./components/PropertyDescriptionForLand";
import SuitableForForLandSection from "./components/SuitableForForLand";
import TechnicalFeaturesAndInteriorForLandSection from "./components/TechnicalFeaturesAndInteriorForLand";
import ROISection from "./components/ROI";
import { useSelector, useDispatch } from "react-redux";

import {
	selectPropertyBlueprints,
	selectPropertyImages,
	setPropertyBlueprints,
	addPropertyImage,
	deletePropertyImage,
	setPropertyImages,
	setCdnUrlForNextAvailable,
} from "src/slices/property/files";

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
	// setters
	setStreet,
	setNumber,
	setCity,
	setZipCode,
	setRegion,
	setCountry,
	setLatitude,
	setLongitude,
} from "src/slices/property";
import { IPropertyImage, IPropertyImagePOST } from "src/types/file";

const LandFormSection: React.FC<any> = () => {
	const dispatch = useDispatch();

	const state = useSelector(selectState);
	const images = useSelector(selectPropertyImages);
	const blueprints = useSelector(selectPropertyBlueprints);

	const street = useSelector(selectStreet);
	const number = useSelector(selectNumber);
	const city = useSelector(selectCity);
	const zipCode = useSelector(selectZipCode);
	const region = useSelector(selectRegion);
	const country = useSelector(selectCountry);
	const lat = useSelector(selectLatitude);
	const lng = useSelector(selectLongitude);

	const handleAddFile = (images: IPropertyImage | IPropertyImagePOST) => {
		dispatch(addPropertyImage(images));
	};
	const handleSetCdnUrlForNextAvailable = (cdnUrl: string) => {
		dispatch(setCdnUrlForNextAvailable(cdnUrl));
	};
	const handleAddFiles = (images: (IPropertyImage | IPropertyImagePOST)[]) => {
		dispatch(setPropertyImages(images));
	};

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
							addFile={handleAddFile}
							setCdnUrlForNextAvailable={handleSetCdnUrlForNextAvailable}
							setFiles={handleAddFiles}
						/>
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

						<SuitableForForLandSection />
						<DescriptionSection />
					</Stack>
				</Grid>
			</Grid>
		</>
	);
};
export default LandFormSection;
