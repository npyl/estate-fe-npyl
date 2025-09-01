import { useCallback, useRef } from "react";
import {
    BuildingInsights,
    MinorPanelInfo,
    RoofSegmentSummary,
    SolarPanel,
    SolarPanelConfig,
    SolarPotential,
} from "../types";

const renderPolygon = (mapEl: google.maps.Map) => (panel: any) => {
    const polygon = new google.maps.Polygon({
        paths: panel.paths,
        visible: panel.visible,
        fillColor: "#0dcaf0",
        fillOpacity: 0.5,
        strokeColor: "black",
        strokeOpacity: 1,
        strokeWeight: 1,
    });

    polygon.setMap(mapEl);

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

const getBoundBox = (
    widthMeters: number,
    heightMeters: number,
    objectMerged: MergedObject,
    solarPotential: SolarPotential
) => {
    if (objectMerged.orientation === "PORTRAIT") {
        const heightMeters = solarPotential.panelHeightMeters;
        const widthMeters = solarPotential.panelWidthMeters;
        return getBoundingBoxAroundCoordinate(
            objectMerged.center,
            widthMeters,
            heightMeters
        );
    }

    return getBoundingBoxAroundCoordinate(
        objectMerged.center,
        widthMeters,
        heightMeters
    );
};

type MergedObject = SolarPanel &
    RoofSegmentSummary & {
        paths: any;
    };

const getPanelsForSum =
    (
        widthMeters: number,
        heightMeters: number,
        LIMIT_COUNT: number,
        solarPotential: SolarPotential,
        projection: any,
        // ...
        placed_panels: any[],
        panelsArray: any[],
        count: number
    ) =>
    (s: RoofSegmentSummary) => {
        const segmentIndex = s.segmentIndex;
        const panelsCount = s.panelsCount;
        const panels = solarPotential.solarPanels.filter(
            (p) => p.segmentIndex === segmentIndex
        );

        for (let i = 0; i < panels.length; i++) {
            if (count >= LIMIT_COUNT) return;

            if (i < panelsCount) {
                let objectMerged: MergedObject = {
                    ...panels[i],
                    ...s,
                    paths: [],
                };

                if (
                    !placed_panels.some((e) => e.center === objectMerged.center)
                ) {
                    placed_panels.push(objectMerged);

                    const boundBox = getBoundBox(
                        widthMeters,
                        heightMeters,
                        objectMerged,
                        solarPotential
                    );

                    const rotationCenter = {
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
                    panelsArray.push(objectMerged);
                    count++;
                }
            }
        }
    };

const getPanelsForConfig =
    (
        widthMeters: number,
        heightMeters: number,
        LIMIT_COUNT: number,
        solarPotential: SolarPotential,
        projection: any,
        // ...
        placed_panels: any[],
        panelsArray: any[],
        count: number
    ) =>
    (config: SolarPanelConfig) => {
        const sums = config.roofSegmentSummaries;
        sums.forEach(
            getPanelsForSum(
                widthMeters,
                heightMeters,
                LIMIT_COUNT,
                solarPotential,
                projection,
                // ...
                placed_panels,
                panelsArray,
                count
            )
        );
    };

const useSolarPanelService = () => {
    const solar_panels = useRef<google.maps.Polygon[]>();

    const clearPolygons = useCallback(() => {
        solar_panels.current?.forEach((polygon: any) => polygon?.setMap(null));
    }, []);

    const plotSolar = (
        buildingInsights: BuildingInsights,
        projection: any,
        LIMIT_COUNT: number,
        mapRef: any
    ) => {
        clearPolygons();

        const solarPotential = buildingInsights.solarPotential;
        const widthMeters = solarPotential.panelHeightMeters;
        const heightMeters = solarPotential.panelWidthMeters;

        let placed_panels: any[] = [];
        let count = 0;
        let panelsArray: any = [];

        solarPotential.solarPanelConfigs.forEach(
            getPanelsForConfig(
                widthMeters,
                heightMeters,
                LIMIT_COUNT,
                solarPotential,
                projection,
                // ...
                placed_panels,
                panelsArray,
                count
            )
        );

        solar_panels.current = panelsArray.map(renderPolygon(mapRef));
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
