import { use, useCallback, useEffect, useRef, useState } from "react";
import Map, { IMapAddress, IMapMarker } from "../../../src/components/Map";
import Marker from "../../../src/components/Map/Marker";

type TMarker = Required<IMapMarker>;

const MARKERS: TMarker[] = [
    {
        propertyId: 323,
        lat: 38.2679,
        lng: 21.7412,
    },
    {
        propertyId: 2408,
        lat: 38.2577036,
        lng: 21.7429353,
    },
    {
        propertyId: 3244,
        lat: 38.26432547603325,
        lng: 21.748536811051878,
    },
    {
        propertyId: 3692,
        lat: 38.25737296212507,
        lng: 21.743098597692967,
    },
];

const getMarkerTestId = (id: number) => `marker-testid-${id}`;

const getMarker = ({ propertyId, ...position }: TMarker) => (
    <div
        key={propertyId}
        data-testid={getMarkerTestId(propertyId)}
        style={{ width: "fit-content", height: "fit-content" }}
    >
        <Marker position={position} />
    </div>
);

const MapList = () => MARKERS.map(getMarker);

const MAP_ID = "map-testid";

// INFO: zoom into lowest level so that we can click a street and help geolocation recognize it
const ZOOM = 16;
const CLICK_RES_ID = "click-res-testid";

interface IClickRes {
    lat: number;
    lng: number;
    address: IMapAddress;
}

const Tester = () => {
    const mapRef = useRef<google.maps.Map>();
    const onReady = useCallback((m: google.maps.Map) => {
        // m.getDiv().setAttribute("data-testid", MAP_ID);
        mapRef.current = m;
    }, []);

    const [clickRes, setClickRes] = useState<IClickRes>();

    const onMapClick = useCallback(
        (lat: number, lng: number, address: IMapAddress) =>
            setClickRes({ lat, lng, address }),
        []
    );

    return (
        <div>
            <div
                data-testid={MAP_ID}
                style={{ width: "800px", height: "600px" }}
            >
                <Map zoom={ZOOM} onClick={onMapClick} onReady={onReady}>
                    <MapList />
                </Map>
            </div>

            {/* Click Result */}
            {clickRes ? (
                <div data-testid={CLICK_RES_ID}>{JSON.stringify(clickRes)}</div>
            ) : null}
        </div>
    );
};

export {
    MAP_ID,
    // ...
    MARKERS,
    getMarkerTestId,
    // ...
    CLICK_RES_ID,
};
export type { TMarker, IClickRes };
export default Tester;
