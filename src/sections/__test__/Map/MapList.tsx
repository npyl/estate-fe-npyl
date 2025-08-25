import Marker from "@/components/Map/Marker";
import { MARKERS } from "./constants";
import { TMarker } from "./type";

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

export { getMarkerTestId };
export default MapList;
