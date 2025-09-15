import { FC, useLayoutEffect } from "react";
import { drawShape } from "../../../util";
import { TShape } from "@/types/shape";
import { useMapContext } from "../../../Main/context";
import setShapeEvents from "../../../util/draw/setShapeEvents";
import useShapeChange from "./useShapeChange";

// ---------------------------------------------------------------------------

const getShapeKey = (s: TShape) => JSON.stringify(s);

// ---------------------------------------------------------------------------

const removeListener = (l: google.maps.MapsEventListener) => l.remove();

// ---------------------------------------------------------------------------

interface ShapeProps {
    s: TShape;
    onShapeChange?: (oldShape: TShape, newShape: TShape) => void;
}

const Shape: FC<ShapeProps> = ({ s, onShapeChange: _onShapeChange }) => {
    const { mapRef } = useMapContext();

    const isChangeable = Boolean(_onShapeChange);

    const onShapeChange = useShapeChange(s, _onShapeChange);

    /**
     * Renders shapes that are passed as prop
     */
    useLayoutEffect(() => {
        if (!mapRef.current) return;

        const res = drawShape(s, mapRef.current, isChangeable);
        if (!res) return;

        // Support shape drag/change
        let listeners: google.maps.MapsEventListener[] = [];

        if (isChangeable) listeners = setShapeEvents(res, onShapeChange(res));

        return () => {
            listeners.forEach(removeListener);
            res?.setMap(null);
        };
    }, [s, isChangeable, onShapeChange]);

    return null;
};

// ---------------------------------------------------------------------------

const getShape =
    (onShapeChange?: (oldShape: TShape, newShape: TShape) => void) =>
    (s: TShape) => (
        <Shape key={getShapeKey(s)} s={s} onShapeChange={onShapeChange} />
    );

// ---------------------------------------------------------------------------

export default getShape;
