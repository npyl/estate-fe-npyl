import { useGetPropertyByIdQuery } from "src/services/properties";
import { useRouter } from "next/router";
import { StreetViewMap } from "src/components/Map";
import MapUnavailable from "@/components/Map/MapUnavailable";
import Box from "@mui/material/Box";

export interface IMapCoord {
    lat: number;
    lng: number;
}

export const StreetView = () => {
    const router = useRouter();
    const { propertyId } = router.query;

    const { data } = useGetPropertyByIdQuery(+propertyId!);

    if (
        !(
            data?.location?.lat &&
            data?.location?.lat > 0 &&
            data?.location?.lng &&
            data?.location?.lng > 0
        )
    ) {
        return <MapUnavailable />;
    }

    return (
        <Box height="100vh" width="100%">
            <StreetViewMap
                center={{ lat: data?.location?.lat, lng: data?.location?.lng }}
            />
        </Box>
    );
};

export default StreetView;
