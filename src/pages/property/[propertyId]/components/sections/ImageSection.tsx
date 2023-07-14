import { Grid, Paper } from "@mui/material";

import { m } from "framer-motion";
import { varFade } from "src/components/animate";
import CarouselThumbnail from "src/components/CarouselThumbnail";
import PreviewImage from "src/components/PreviewImage";
import { IFileModel } from "src/types/file";
import { IProperties } from "src/types/properties";

interface ImageSectionProps {
	data: IProperties;
}

const ImageSection: React.FC<ImageSectionProps> = (props) => {
	const { data } = props;
	const images: IFileModel[] = data.images;

	const _carouselsExample = [
		// add main image
		{
			id: "1",
			title: "Main Image",
			image: data?.propertyImage,
			description: "A registry of multidisciplinar artefacts...",
			path: "/repository",
		},
	];

	// add all images
	images.forEach((image, index) => {
		_carouselsExample.push({
			id: (index + 1).toString(),
			title: "Image",
			image: images.at(index)?.url || "",
			description: "One of the images",
			path: "/repository",
		});
	});

	return (
		<Paper elevation={10} sx={{ overflow: "auto" }}>
			<Grid container>
				<Grid item xs={12}>
					<m.div variants={varFade().in}>
						{data?.propertyImage ? (
							<CarouselThumbnail data={_carouselsExample} />
						) : (
							<PreviewImage />
						)}
					</m.div>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default ImageSection;
