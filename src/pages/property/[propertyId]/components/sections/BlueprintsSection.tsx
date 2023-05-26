import React from "react";
import { IProperties } from "src/types/properties";

import CarouselWithLightbox from "src/components/CarouselWithLightbox";

import { Typography, Box, Paper, Divider } from "@mui/material";
import { IFileModel } from "src/types/fileModel";

interface BlueprintsSectionProps {
  data: IProperties;
}

interface ICarouselData {
  id: string;
  title: string;
  image: string;
  description: string;
}

const BlueprintsSection: React.FC<BlueprintsSectionProps> = (props) => {
  const { data } = props;
  const blueprints: IFileModel[] = data?.blueprints;

  const _carouselData = blueprints.map((blueprint, index) => {
    return {
      id: (index + 1).toString(),
      title: "Image",
      image: `data:image/jpeg;base64,${blueprint.data}` || "",
      description: "One of the images",
    };
  });

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
