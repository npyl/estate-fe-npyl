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
import LocationSection from "src/components/Location/Location";
import PropertyDescriptionForOtherSection from "./components/PropertyDescriptionForOther";
import SuitableForForOtherSection from "./components/SuitableForForOther";
import TechnicalFeaturesAndInteriorForOtherSection from "./components/TechnicalFeaturesAndInteriorForOther";
import ROISection from "./components/ROI";
import { useDispatch, useSelector } from "react-redux";

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
	setLatitude,
	setLongitude,
} from "src/slices/property";
import { IPropertyImage, IPropertyImagePOST } from "src/types/file";

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

	const handleAddFile = (images: IPropertyImage | IPropertyImagePOST) => {
		dispatch(addPropertyImage(images));
	};
	const handleSetCdnUrlForNextAvailable = (cdnUrl: string) => {
		dispatch(setCdnUrlForNextAvailable(cdnUrl));
	};
	const handleAddFiles = (images: (IPropertyImage | IPropertyImagePOST)[]) => {
		dispatch(setPropertyImages(images));
	};
	const handleDeleteFile = (imageKey: string) => {
		dispatch(deletePropertyImage(imageKey));
	};

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
							addFile={handleAddFile}
							deleteFile={handleDeleteFile}
							setCdnUrlForNextAvailable={handleSetCdnUrlForNextAvailable}
							setFiles={handleAddFiles}
						/>

						<LocationSection
							street={street}
							number={number}
							city={city}
							complex={complex}
							zipCode={zipCode}
							region={region}
							country={country}
							// setters
							setStreet={setStreet}
							setNumber={setNumber}
							setCity={setCity}
							setComplex={setComplex}
							setZipCode={setZipCode}
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
