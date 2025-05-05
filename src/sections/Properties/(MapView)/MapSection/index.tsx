import { FC, useState } from "react";
import { useGetPropertyLocationMarkersQuery } from "src/services/properties";
import getMarkerId from "../getMarkerId";
import dynamic from "next/dynamic";
import { useMarkerRefsContext } from "../context";
import Marker, { MarkerProps } from "@/components/Map/Marker";
import { useAllFilters } from "@/sections/Properties/FiltersContext";
import MapFilter from "@/sections/Properties/(FiltersBar)/Filters/Map";
const PropertyInfoWindow = dynamic(() => import("./PropertyInfoWindow"));

// ----------------------------------------------------------------------------------

interface ReferencableMarkerProps extends MarkerProps {
    propertyId: number;
}

const ReferencableMarker: FC<ReferencableMarkerProps> = ({
    propertyId,
    ...props
}) => {
    const { onMarkerLoad } = useMarkerRefsContext();
    return <Marker onLoad={(m) => onMarkerLoad(propertyId, m)} {...props} />;
};

// ----------------------------------------------------------------------------------

const MarkerList = () => {
    const allFilters = useAllFilters();

    const { data: markers } = useGetPropertyLocationMarkersQuery(allFilters);

    const [activeMarker, setActiveMarker] = useState<number>();

    return (
        <>
            {markers?.map((marker, index) => (
                <ReferencableMarker
                    key={getMarkerId(marker)}
                    propertyId={marker.propertyId}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    onClick={() => setActiveMarker(index)}
                >
                    {activeMarker === index ? (
                        <PropertyInfoWindow
                            marker={marker}
                            setActiveMarker={setActiveMarker}
                        />
                    ) : null}
                </ReferencableMarker>
            ))}
        </>
    );
};

const MapSection = () => (
    <MapFilter>
        <MarkerList />
    </MapFilter>
);

export default MapSection;
