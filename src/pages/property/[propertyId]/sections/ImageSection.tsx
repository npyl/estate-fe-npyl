import { Grid, Paper } from "@mui/material";
import CarouselThumbnail from "src/components/CarouselThumbnail";
import ICarouselImage from "src/components/carousel/types";
import { IProperties } from "src/types/properties";

interface ImageSectionProps {
    data: IProperties;
}

const ImageSection: React.FC<ImageSectionProps> = ({ data: { images } }) => {
    return (
        <Paper elevation={10} sx={{ overflow: "auto" }}>
            <Grid container>
                <Grid item xs={12}>
                    <CarouselThumbnail data={images as ICarouselImage[]} />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ImageSection;
