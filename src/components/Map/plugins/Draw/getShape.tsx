import { FC, useEffect } from "react";
import { drawingToPoints, drawShape } from "../../util";
import { TShape } from "@/types/shape";
import { useMapContext } from "../../Main/context";
import setShapeEvents from "../../util/draw/setShapeEvents";

// ---------------------------------------------------------------------------

const getShapeKey = (s: TShape) => {
    return JSON.stringify(s);
};

// ---------------------------------------------------------------------------

const removeListener = (l: google.maps.MapsEventListener) => l.remove();

// ---------------------------------------------------------------------------

interface ShapeProps {
    s: TShape;
    onShapeChange?: (oldShape: TShape, newShape: TShape) => void;
}

const Shape: FC<ShapeProps> = ({ s, onShapeChange }) => {
    const { mapRef } = useMapContext();

    /**
     * Renders shapes that are passed as prop
     */
    useEffect(() => {
        if (!mapRef.current) return;

        const isChangeable = Boolean(onShapeChange);

        const res = drawShape(s, mapRef.current, isChangeable);
        if (!res) return;

        // Support shape drag/change
        let listeners: google.maps.MapsEventListener[] = [];

        if (isChangeable) {
            const cb = () => {
                const newS = drawingToPoints(res);
                if (!newS) return;
                onShapeChange?.(s, newS);
            };

            listeners = setShapeEvents(res, cb);
        }

        return () => {
            listeners.forEach(removeListener);
            res?.setMap(null);
        };
    }, []);

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
