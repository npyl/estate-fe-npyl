import { FC } from "react";
import MapControl from "./Control";
import { IMapControls } from "@/components/Map/types";

const Controls: FC<IMapControls> = ({
    centerTop,
    leftCenter,
    leftTop,
    rightTop,
}) => (
    <>
        {leftTop ? (
            <MapControl position={google.maps.ControlPosition.TOP_LEFT} p={1}>
                {leftTop}
            </MapControl>
        ) : null}
        {leftCenter ? (
            <MapControl
                position={google.maps.ControlPosition.LEFT_CENTER}
                p={1}
            >
                {leftCenter}
            </MapControl>
        ) : null}
        {rightTop ? (
            <MapControl position={google.maps.ControlPosition.TOP_RIGHT} p={1}>
                {rightTop}
            </MapControl>
        ) : null}
        {centerTop ? (
            <MapControl position={google.maps.ControlPosition.TOP_CENTER} p={1}>
                {centerTop}
            </MapControl>
        ) : null}
    </>
);

export default Controls;
