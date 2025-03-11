import { FC } from "react";
import dynamic from "next/dynamic";
import { IMapProps } from "../types";
import MapContainer from "./Container";

// plugins
const Draw = dynamic(() => import("../plugins/Draw/"));
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

const Map: FC<IMapProps> = ({
    onDraw,
    onShapeChange,
    onSearchSelect,
    shapes = [],
    drawing = false,
    search = false,
    // ...
    leftCenter,
    centerTop,
    // ...
    children,
    ...props
}) => (
    <MapContainer
        leftCenter={
            <>
                <Draw
                    drawing={drawing}
                    shapes={shapes}
                    onDraw={onDraw}
                    onShapeChange={onShapeChange}
                />

                {leftCenter}
            </>
        }
        centerTop={
            <>
                {search ? <Search onSearchSelect={onSearchSelect} /> : null}
                {centerTop}
            </>
        }
        {...props}
    >
        {children}
    </MapContainer>
);

export default Map;
