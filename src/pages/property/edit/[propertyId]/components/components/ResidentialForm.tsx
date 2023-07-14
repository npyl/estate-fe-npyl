import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import * as React from "react";
import AreasSection from "./components/Areas";
import BalconiesSection from "./components/Balconies";
import BasicSection from "./components/BasicDetails";
import ConstructionForResidentialSection from "./components/ConstructionForResidential";
import DescriptionSection from "./components/Description";
import DistancesSection from "./components/Distances";
import FeaturesSection from "./components/Features";
import FileSection from "./components/Files";
import HeatingAndEnergySection from "./components/HeatingAndEnergy";
import ImageSection from "./components/Images";
import LocationSection from "src/components/Location";
import ParkingSection from "./components/Parking";
import PropertyDescriptionSection from "./components/PropertyDescription";
import SuitableForForResidentialSection from "./components/SuitableForForResidential";
import TechnicalFeaturesAndInteriorForResidentialSection from "./components/TechnicalFeaturesAndInteriorForResidential";
import ROISection from "./components/ROI";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";

import {
	setPropertyImages,
	setPropertyBlueprints,
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

import {
	selectPropertyBlueprints,
	selectPropertyImages,
	addPropertyImage,
} from "src/slices/property/files";
import NotesSection from "./components/NotesSection";
import VideoLinkSection from "./components/VideoLink";

import { IPropertyImage, IPropertyImagePOST } from "src/types/file";

const ResidentialFormSection: React.FC<any> = (props) => {
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
						{/* <ROISection /> */}
						{state === "Sale" && <ROISection />}

						<PropertyDescriptionSection />
						<ConstructionForResidentialSection />
						<AreasSection />
						<DistancesSection />

						<FileSection
							fileData={blueprints}
							setFileData={(blueprints) => {
								dispatch(setPropertyBlueprints(blueprints));
							}}
						/>
						<VideoLinkSection></VideoLinkSection>
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

						<HeatingAndEnergySection />

						<ParkingSection />

						<BalconiesSection />

						<TechnicalFeaturesAndInteriorForResidentialSection />
						<SuitableForForResidentialSection />

						<DescriptionSection />
						<NotesSection />
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
