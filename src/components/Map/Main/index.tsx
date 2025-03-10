import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import dynamic from "next/dynamic";
import { IMapProps } from "../types";
import MapContainer from "./Container";

// plugins
import Draw, { DrawRef } from "../plugins/Draw/";
const Search = dynamic(() => import("../plugins/Search"));

//--------------------------------------------------------
//
//  markers: ...
//  activeMarker:
//      The marker clicked; show a bouncing animation
//  mainMarker: ...
//      If set, centering is based on mainMarker
//      NOTE: mainMarker must be contained in markers prop if you wish for it to be visible
//
//--------------------------------------------------------

interface MapRef {
    // INFO: shapes are only rendered once on mount so you are responsible for re-rendering them on change
    refreshShapes: VoidFunction;
}

const Map = forwardRef<MapRef, IMapProps>(
    (
        {
            onDraw,
            onShapeChange,
            onSearchSelect,
            shapes,
            multipleShapes = false,
            drawing = true,
            search = false,
            // ...
            leftCenter,
            centerTop,
            // ...
            children,
            ...props
        },
        ref
    ) => {
        const drawRef = useRef<DrawRef>(null);

        const refreshShapes = useCallback(() => drawRef.current?.load(), []);

        useImperativeHandle(
            ref,
            () => ({
                refreshShapes,
            }),
            []
        );

        return (
            <MapContainer
                leftCenter={
                    <>
                        {drawing ? (
                            <Draw
                                ref={drawRef}
                                mode={multipleShapes ? "MULTIPLE" : "SINGLE"}
                                shapes={shapes}
                                onDraw={onDraw}
                                onShapeChange={onShapeChange}
                            />
                        ) : null}

                        {leftCenter}
                    </>
                }
                centerTop={
                    <>
                        {search ? (
                            <Search onSearchSelect={onSearchSelect} />
                        ) : null}
                        {centerTop}
                    </>
                }
                {...props}
            >
                {children}
            </MapContainer>
        );
    }
);

Map.displayName = "Map";

export type { MapRef };
export default Map;
