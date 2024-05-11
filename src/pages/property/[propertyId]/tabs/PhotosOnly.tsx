import { Paper } from "@mui/material";
import { useRouter } from "next/router";
import { OnlyPhotosCarousel } from "src/components/CarouselThumbnail";
import ICarouselImage from "src/components/carousel/types";
import { useGetPropertyByIdQuery } from "src/services/properties";

const PhotosOnly: React.FC = () => {
    const router = useRouter();
    const { propertyId } = router.query;

    const { data } = useGetPropertyByIdQuery(+propertyId!); // basic details

    return (
        <Paper elevation={10} sx={{ overflow: "auto", padding: "10px" }}>
            <OnlyPhotosCarousel
                data={(data?.images || []) as ICarouselImage[]}
            />
        </Paper>
    );
};

export default PhotosOnly;
