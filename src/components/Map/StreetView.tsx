"use client";

import { useEffect, useRef } from "react";
import useLoadApi from "./hook";
import { Box } from "@mui/material";

export interface IMapCoord {
    lat: number;
    lng: number;
}

interface MapProps {
    center?: IMapCoord;
}

const StreetView = ({ center }: MapProps) => {
    const mapRef = useRef<any>(null);

    const { isLoaded } = useLoadApi();

    useEffect(() => {
        if (!isLoaded) return;

        const map = new google.maps.StreetViewPanorama(
            document.getElementById("street-view") as HTMLElement,
            {
                position: center,
                pov: {
                    heading: 34,
                    pitch: 10,
                },
            }
        );

        map.setVisible(true);
    }, [isLoaded]);

    return (
        <div
            id="street-view"
            ref={mapRef}
            style={{ width: "100%", height: "100%" }}
        />
    );
};

export default StreetView;
