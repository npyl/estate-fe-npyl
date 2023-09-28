import { Grid, Paper } from "@mui/material";

import { m } from "framer-motion";
import { varFade } from "src/components/animate";
import CarouselThumbnail from "src/components/CarouselThumbnail";
import { IPropertyImage } from "src/types/file";
import { IProperties } from "src/types/properties";

interface ImageSectionProps {
    data: IProperties;
}

const ImageSection: React.FC<ImageSectionProps> = (props) => {
    const { data } = props;
    const images: IPropertyImage[] = data.images;
    const carouselImages = [
        ...images.map((image, index) => ({
            id: index.toString(),
            title: "Image",
            image: image.url || "",
            description: "One of the images",
            path: "/repository",
        })),
    ];

    return (
        <Paper elevation={10} sx={{ overflow: "auto" }}>
            <Grid container>
                <Grid item xs={12}>
                    <m.div variants={varFade().in}>
                        <CarouselThumbnail data={carouselImages} />
                    </m.div>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ImageSection;
