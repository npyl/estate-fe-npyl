import React, { useMemo } from "react";
import { IProperties } from "src/types/properties";

import CarouselWithLightbox from "src/components/CarouselWithLightbox";

import { Typography, Box, Paper, Divider } from "@mui/material";
import { IPropertyBlueprint } from "src/types/file";

interface BlueprintsSectionProps {
	data: IProperties;
}

const BlueprintsSection: React.FC<BlueprintsSectionProps> = (props) => {
	const { data } = props;
	const blueprints: IPropertyBlueprint[] = data?.blueprints;

	const _carouselData = useMemo(
		() =>
			blueprints.map((blueprint, index) => ({
				id: (index + 1).toString(),
				title: "Image",
				image: blueprint.url || "",
				description: "One of the images",
			})),
		[blueprints]
	);

	return (
		<Paper elevation={10} sx={{ overflow: "auto" }}>
			<Box
				sx={{
					px: 3,
					py: 1.5,
					display: "flex",
					justifyContent: "left",
				}}
			>
				<Typography variant="h6">Blueprints</Typography>
			</Box>
			<Divider></Divider>
			{_carouselData && _carouselData.length > 0 && (
				<CarouselWithLightbox data={_carouselData} />
			)}
		</Paper>
	);
};

export default BlueprintsSection;
