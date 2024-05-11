import { Paper } from "@mui/material";
import { useRouter } from "next/router";
import OnlyPhotosCarousel from "./Carousel";
import { useGetPropertyByIdQuery } from "src/services/properties";

const PhotosOnly: React.FC = () => {
    const router = useRouter();
    const { propertyId } = router.query;

    const { data } = useGetPropertyByIdQuery(+propertyId!); // basic details

    return (
        <Paper elevation={10} sx={{ overflow: "auto", padding: "10px" }}>
            <OnlyPhotosCarousel data={data?.images || []} />
        </Paper>
    );
};

export default PhotosOnly;
