import { Grid, Paper } from "@mui/material";
import CarouselThumbnail from "src/components/CarouselThumbnail";

import { IPropertyImage } from "src/types/file";
import { IProperties } from "src/types/properties";

interface ImageSectionProps {
    data: IProperties;
}

const defaultImage = "/static/noImage.png";

const ImageSection: React.FC<ImageSectionProps> = (props) => {
    const { data } = props;
    const images: IPropertyImage[] = data.images;

    const carouselImages =
        images && images.length > 0
            ? images.map((image, index) => ({
                  id: index.toString(),
                  title: "Image",
                  image: image.url || "",
                  description: "One of the images",
                  hidden: image.hidden,
                  path: "/repository",
              }))
            : [
                  {
                      id: "default",
                      title: "Default Image",
                      image: defaultImage,
                      description: "Default image description",
                      hidden: false,
                      path: "/repository",
                  },
              ];

    return (
        <Paper elevation={10} sx={{ overflow: "auto" }}>
            <Grid container>
                <Grid item xs={12}>
                    <CarouselThumbnail data={carouselImages} />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ImageSection;
