import { useGetPropertyByIdQuery } from "src/services/properties";
import { useRouter } from "next/router";
import { StreetViewMap } from "src/components/Map";
import MapUnavailable from "./MapUnavailable";

export interface IMapCoord {
    lat: number;
    lng: number;
}

export const StreetView = () => {
    const router = useRouter();
    const { propertyId } = router.query;

    const { data } = useGetPropertyByIdQuery(+propertyId!);

    if (!data?.location) return <MapUnavailable />;

    return (
        <StreetViewMap
            center={{ lat: data?.location?.lat, lng: data?.location?.lng }}
        />
    );
};

export default StreetView;
