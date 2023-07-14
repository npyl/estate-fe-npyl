import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import * as React from "react";
import AreasSection from "./components/Areas";
import BasicSection from "./components/BasicDetails";
import ConstructionForCommercialSection from "./components/ConstructionForCommercial";
import DescriptionSection from "./components/Description";
import DistancesSection from "./components/Distances";
import FeaturesForCommercialSection from "./components/FeaturesForCommercial";
import FileSection from "./components/Files";
import HeatingAndEnergyForResidentialSection from "./components/HeatingAndEnergyForCommercial";
import ImageSection from "./components/Images";
import LocationSection from "src/components/Location";
import PropertyDescriptionForCommercialSection from "./components/PropertyDescriptionForCommercial";
import SuitableForForCommercialSection from "./components/SuitableForForCommercial";
import TechnicalFeaturesAndInteriorForCommercialSection from "./components/TechnicalFeaturesAndInteriorForCommercial";

import ROISection from "./components/ROI";
import { useSelector, useDispatch } from "react-redux";

import {
	addPropertyImage,
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
import { IPropertyImage, IPropertyImagePOST } from "src/types/file";

const CommercialFormSection: React.FC<any> = () => {
	const dispatch = useDispatch();

	const images = useSelector(selectPropertyImages);
	const blueprints = useSelector(selectPropertyBlueprints);
	const state = useSelector(selectState);

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
	const handleSetCdnUrlForFile = (orderNumber: number, cdnUrl: string) => {};
	const handleAddFiles = (images: (IPropertyImage | IPropertyImagePOST)[]) => {
		dispatch(setPropertyImages(images));
	};

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
							setCdnUrlForFile={handleSetCdnUrlForFile}
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
							setStreet={setStreet}
							setNumber={setNumber}
							setCity={setCity}
							setComplex={setComplex}
							setZipCode={setZipCode}
							setRegion={setRegion}
							setCountry={setCountry}
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
