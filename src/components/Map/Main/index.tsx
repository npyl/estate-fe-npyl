import { FC } from "react";
import dynamic from "next/dynamic";
import { IMapProps } from "../types";
import MapContainer from "./Container";

// plugins
const Draw = dynamic(() => import("../plugins/Draw/"));
const Search = dynamic(() => import("../plugins/Search"));

const PPMap: FC<IMapProps> = ({
    onDraw,
    onShapeChange,
    onSearchSelect,
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
                    shapes={props.shapes ?? []}
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

export default PPMap;
