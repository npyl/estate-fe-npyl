import { useRef } from "react";
import { BuildingInsights, MinorPanelInfo } from "../types";

const renderPolygon = (panel: any, mapRef: any) => {
    const polygon = new google.maps.Polygon({
        paths: panel.paths,
        visible: panel.visible,
        fillColor: "#0dcaf0",
        fillOpacity: 0.5,
        strokeColor: "black",
        strokeOpacity: 1,
        strokeWeight: 1,
    });

    polygon.setMap(mapRef);

    return polygon;
};

const getBoundingBoxAroundCoordinate = (
    center: any,
    widthMeters: number,
    heightMeters: number
) => {
    const earthRadius = 6371000; // Earth's radius in meters
    // Convert center coordinates to radians
    const centerLatRadians = (center.latitude * Math.PI) / 180;
    const centerLngRadians = (center.longitude * Math.PI) / 180;
    // Calculate the offsets in latitude and longitude for the given size
    const latOffset = (heightMeters / earthRadius) * (180 / Math.PI);
    const lngOffset =
        (widthMeters / (earthRadius * Math.cos(centerLatRadians))) *
        (180 / Math.PI);
    // Calculate the coordinates of the perfect rectangle corners as an array
    const rectangle = [
        {
            lat: center.latitude + latOffset / 2,
            lng: center.longitude - lngOffset / 2,
        }, // Top-left corner
        {
            lat: center.latitude + latOffset / 2,
            lng: center.longitude + lngOffset / 2,
        }, // Top-right corner
        {
            lat: center.latitude - latOffset / 2,
            lng: center.longitude + lngOffset / 2,
        }, // Bottom-right corner
        {
            lat: center.latitude - latOffset / 2,
            lng: center.longitude - lngOffset / 2,
        }, // Bottom-left corner
    ];

    return rectangle;
};

const rotatePolygon = (
    polygonCoords: any[],
    center: any,
    angle: number,
    projection: any
) => {
    // Convert center and polygon coordinates to pixels
    const centerPixel = projection.fromLatLngToPoint(center);
    const polygonPixels = polygonCoords.map((coord) =>
        projection.fromLatLngToPoint(coord)
    );

    // Rotate each polygon vertex around the center
    const rotatedPolygonPixels = polygonPixels.map((pixel) => {
        const x =
            centerPixel.x +
            (pixel.x - centerPixel.x) * Math.cos(angle * (Math.PI / 180)) -
            (pixel.y - centerPixel.y) * Math.sin(angle * (Math.PI / 180));
        const y =
            centerPixel.y +
            (pixel.x - centerPixel.x) * Math.sin(angle * (Math.PI / 180)) +
            (pixel.y - centerPixel.y) * Math.cos(angle * (Math.PI / 180));
        return new window.google.maps.Point(x, y);
    });

    // Convert the rotated pixels back to LatLng and set them as the new polygon path
    const rotatedPolygonCoords = rotatedPolygonPixels.map((pixel) =>
        projection.fromPointToLatLng(pixel)
    );

    return rotatedPolygonCoords;
};

const useSolarPanelService = () => {
    const solar_panels = useRef<google.maps.Polygon[]>();

    const plotSolar = (
        buildingInsights: BuildingInsights,
        projection: any,
        LIMIT_COUNT: number,
        mapRef: any
    ) => {
        solar_panels.current?.forEach((polygon: any) => polygon?.setMap(null));

        var solarPotential = buildingInsights.solarPotential;
        let placed_panels: any[] = [];
        let widthMeters = solarPotential.panelHeightMeters;
        let heightMeters = solarPotential.panelWidthMeters;
        let count = 0;
        let panelsArray: any = [];

        solarPotential.solarPanelConfigs.forEach((config, i: any) => {
            config.roofSegmentSummaries.forEach((s: any) => {
                const segmentIndex = s.segmentIndex;
                const panelsCount = s.panelsCount;
                const panels = solarPotential.solarPanels.filter(
                    (p) => p.segmentIndex === segmentIndex
                );
                for (let i = 0; i < panels.length; i++) {
                    if (count >= LIMIT_COUNT) return;
                    if (i < panelsCount) {
                        const objectMerged = { ...panels[i], ...s };

                        if (
                            !placed_panels.some(
                                (e) => e.center === objectMerged.center
                            )
                        ) {
                            placed_panels.push(objectMerged);

                            let boundBox;
                            if (objectMerged.orientation === "PORTRAIT") {
                                let heightMeters =
                                    solarPotential.panelHeightMeters;
                                let widthMeters =
                                    solarPotential.panelWidthMeters;
                                boundBox = getBoundingBoxAroundCoordinate(
                                    objectMerged.center,
                                    widthMeters,
                                    heightMeters
                                );
                            } else {
                                boundBox = getBoundingBoxAroundCoordinate(
                                    objectMerged.center,
                                    widthMeters,
                                    heightMeters
                                );
                            }
                            let rotationCenter = {
                                lat: objectMerged.center.latitude,
                                lng: objectMerged.center.longitude,
                            };
                            const finalCoords = rotatePolygon(
                                boundBox,
                                rotationCenter,
                                objectMerged.azimuthDegrees,
                                projection
                            );

                            objectMerged["paths"] = finalCoords;
                            // objectMerged["visible"] = false;
                            panelsArray.push(objectMerged);
                            count++;
                        }
                    }
                }
            });
        });

        solar_panels.current = panelsArray.map((panel: any) =>
            renderPolygon(panel, mapRef)
        );
    };

    const getMinorPanelInfo = (
        buildingInsights: any,
        segmentIndex: string | number
    ): MinorPanelInfo | undefined => {
        if (
            segmentIndex >=
            buildingInsights.solarPotential.solarPanelConfigs.length
        ) {
            segmentIndex =
                buildingInsights.solarPotential.solarPanelConfigs.length - 1;
        }
        const solarPanelConfig =
            buildingInsights.solarPotential.solarPanelConfigs[segmentIndex];
        if (solarPanelConfig) {
            const lastSolarPanelConfig =
                buildingInsights.solarPotential.solarPanelConfigs[
                    buildingInsights.solarPotential.solarPanelConfigs.length - 1
                ];
            let panelCountPercent =
                (solarPanelConfig?.panelsCount /
                    lastSolarPanelConfig?.panelsCount) *
                75;
            let panelCountText =
                solarPanelConfig?.panelsCount.toString() +
                "/" +
                lastSolarPanelConfig?.panelsCount.toString();
            let panelEnergyPercent =
                (solarPanelConfig?.yearlyEnergyDcKwh /
                    lastSolarPanelConfig?.yearlyEnergyDcKwh) *
                75;
            let panelEnergyPercentText =
                Math.round(solarPanelConfig?.yearlyEnergyDcKwh).toString() +
                " kwh";

            return {
                panel: { percent: panelCountPercent, text: panelCountText },
                energy: {
                    percent: panelEnergyPercent,
                    text: panelEnergyPercentText,
                },
            };
        }

        return undefined;
    };

    return {
        plotSolar,
        getMinorPanelInfo,
    };
};

export default useSolarPanelService;
