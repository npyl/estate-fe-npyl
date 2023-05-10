import React from "react";
import { IProperties } from "src/types/properties";

import CarouselWithLightbox from "src/components/CarouselWithLightbox";

import { Typography, Box } from "@mui/material";
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
    <>
      <Box
        sx={{
          px: 3,
          py: 1.5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Blueprints</Typography>
      </Box>
      {_carouselData && _carouselData.length > 0 && (
        <CarouselWithLightbox data={_carouselData} />
      )}
    </>
  );
};

export default BlueprintsSection;
