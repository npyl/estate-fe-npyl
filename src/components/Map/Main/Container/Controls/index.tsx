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
            <MapControl position={google.maps.ControlPosition.TOP_LEFT}>
                {leftTop}
            </MapControl>
        ) : null}
        {leftCenter ? (
            <MapControl position={google.maps.ControlPosition.LEFT_CENTER}>
                {leftCenter}
            </MapControl>
        ) : null}
        {rightTop ? (
            <MapControl position={google.maps.ControlPosition.TOP_RIGHT}>
                {rightTop}
            </MapControl>
        ) : null}
        {centerTop ? (
            <MapControl position={google.maps.ControlPosition.TOP_CENTER}>
                {centerTop}
            </MapControl>
        ) : null}
    </>
);

export default Controls;
