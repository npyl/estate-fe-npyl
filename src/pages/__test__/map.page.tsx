import { useCallback, useState } from "react";
import Map, {
    DrawShape,
    IMapAddress,
    IMapMarker,
    StopDraw,
} from "../../../src/components/Map";
import Marker from "../../../src/components/Map/Marker";
import { TShape } from "@/types/shape";
import { drawingToPoints } from "@/components/Map/util";

// INFO: prevent from showing up on production
export const getStaticProps = async () => {
    if (process.env.NODE_ENV === "production") {
        return { notFound: true };
    }
    return { props: {} };
};

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

const SHAPE_RES_ID = "shape-res-testid";

interface IClickRes {
    lat: number;
    lng: number;
    address: IMapAddress;
}

const Tester = () => {
    const [clickRes, setClickRes] = useState<IClickRes>();
    const onMapClick = useCallback(
        (lat: number, lng: number, address: IMapAddress) =>
            setClickRes({ lat, lng, address }),
        []
    );

    // -------------------------------------------------------------

    const [shape, setShape] = useState<TShape>();
    const onDraw = useCallback((s: DrawShape | StopDraw) => {
        if (!s) setShape(undefined);
        else setShape(drawingToPoints(s));
    }, []);

    return (
        <div>
            <div
                data-testid={MAP_ID}
                style={{ width: "800px", height: "600px" }}
            >
                <Map
                    drawing
                    search
                    shapes={shape ? [shape] : []}
                    zoom={ZOOM}
                    onClick={onMapClick}
                    onSearchSelect={onMapClick}
                    onDraw={onDraw}
                >
                    <MapList />
                </Map>
            </div>

            {shape ? (
                <div data-testid={SHAPE_RES_ID}>{JSON.stringify(shape)}</div>
            ) : null}

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
    SHAPE_RES_ID,
    CLICK_RES_ID,
};
export type { TMarker, IClickRes };
export default Tester;
