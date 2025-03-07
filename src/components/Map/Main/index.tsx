import { FC } from "react";
import dynamic from "next/dynamic";
import { IMapProps } from "../types";
import MapContainer from "./Container";

// plugins
const Draw = dynamic(() => import("../plugins/Draw"));
const Search = dynamic(() => import("../plugins/Search"));
const DrawMultiple = dynamic(() => import("../plugins/DrawMultiple"));

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

const Map: FC<IMapProps> = ({
    onDraw,
    onShapeChange,
    onSearchSelect,
    shape,
    shapes,
    multipleShapes = false,
    drawing = true,
    search = false,
    // ...
    children,
    ...props
}) => (
    <MapContainer {...props}>
        {!multipleShapes ? (
            <Draw
                drawing={drawing}
                shape={shape}
                onDraw={onDraw}
                onShapeChange={(newShape) => onShapeChange?.([], newShape)}
            />
        ) : null}

        {multipleShapes ? (
            <DrawMultiple
                drawing={drawing}
                shapes={shapes}
                onDraw={onDraw}
                onShapeChange={onShapeChange}
            />
        ) : null}

        {search ? <Search onSearchSelect={onSearchSelect} /> : null}

        {children}
    </MapContainer>
);

export default Map;
