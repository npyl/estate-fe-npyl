import { Grid, Paper } from "@mui/material";
import { OnlyPhotosCarousel } from "src/components/CarouselThumbnail";

import { IPropertyImage } from "src/types/file";
import { IProperties } from "src/types/properties";

interface ImageSectionProps {
    data: IProperties;
}

const PhotosOnly: React.FC<ImageSectionProps> = (props) => {
    const { data } = props;
    const images: IPropertyImage[] = data.images;

    const carouselImages = [
        ...images.map((image, index) => ({
            id: index.toString(),
            title: "Image",
            hidden: image.hidden,
            image: image.url || "",
            description: "One of the images",
            path: "/repository",
        })),
    ];

    return (
        <Paper elevation={10} sx={{ overflow: "auto", padding: "10px" }}>
            <Grid container>
                <Grid item xs={12}>
                    <OnlyPhotosCarousel data={carouselImages} />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PhotosOnly;
