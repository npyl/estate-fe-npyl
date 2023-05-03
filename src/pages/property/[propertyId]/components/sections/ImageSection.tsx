import { m } from "framer-motion";
import { MotionViewport, varFade } from "src/components/animate";
import CarouselThumbnail from "src/components/CarouselThumbnail";
import { IFileModel } from "src/types/fileModel";
import { IProperties } from "src/types/properties";

import { Box } from "@mui/material";

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
      image: `data:image/jpeg;base64,${data?.propertyImage}`,
      description: "A registry of multidisciplinar artefacts...",
      path: "/repository",
    },
  ];

  // add all images
  images.forEach((image, index) => {
    _carouselsExample.push({
      id: (index + 1).toString(),
      title: "Image",
      image: `data:image/jpeg;base64,${images.at(index)?.data}` || "",
      description: "One of the images",
      path: "/repository",
    });
  });

  return (
    // <Box component={MotionViewport}>
    <m.div variants={varFade().in}>
      <CarouselThumbnail data={_carouselsExample} />
    </m.div>
    // </Box>
  );
};

export default ImageSection;
