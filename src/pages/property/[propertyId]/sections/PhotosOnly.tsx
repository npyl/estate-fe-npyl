import { Grid, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { OnlyPhotosCarousel } from "src/components/CarouselThumbnail";
import { useGetPropertyByIdQuery } from "src/services/properties";

export const PhotosOnly: React.FC = () => {
    const router = useRouter();
    const { propertyId } = router.query;

    const { data } = useGetPropertyByIdQuery(+propertyId!); // basic details

    const carouselImages =
        data?.images?.map((image, index) => ({
            id: index.toString(),
            title: "Image",
            hidden: image.hidden,
            image: image.url || "",
            description: "One of the images",
            path: "/repository",
        })) || [];

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
