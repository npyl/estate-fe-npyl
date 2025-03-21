import { MarkerF, MarkerProps } from "@react-google-maps/api";
import { FC } from "react";
import isPositionValid from "./util/validation";

const Marker: FC<MarkerProps> = ({ position, ...props }) => {
    if (!isPositionValid(position)) return null;

    return (
        <MarkerF
            position={position}
            icon="/static/map/mapIcon.svg"
            {...props}
        />
    );
};

export type { MarkerProps };
export default Marker;
