const SolarPanelService = {
    solar_panels: [],
    buildingInsights: {},
    getBuildingInsights(homeLocation: { lat: any; lng: any }) {
        let endpoint = `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${homeLocation.lat}&location.longitude=${homeLocation.lng}&requiredQuality=MEDIUM&key=${process.env.NEXT_PUBLIC_MAP_API_KEY}`;
        return new Promise((resolve, reject) => {
            try {
                // resolve(insights)
                fetch(endpoint)
                    .then((response) => response.json())
                    .then((result) => {
                        console.log(result);
                        if (result.error) {
                            reject(result.error);
                        } else {
                            resolve(result);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            } catch (err) {
                reject(err);
            }
        });
    },

    getBoundingBoxAroundCoordinate(
        center: any,
        widthMeters: number,
        heightMeters: number
    ) {
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
    },

    rotatePolygon(
        polygonCoords: any[],
        center: any,
        angle: number,
        projection: any
    ) {
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
        // console.log(rotatedPolygonCoords)
        return rotatedPolygonCoords;
    },

    plotSolar(
        buildingInsights: any,
        projection: any,
        LIMIT_COUNT: number,
        mapRef: any
    ) {
        console.log("Plotting solar panels...", LIMIT_COUNT);
        this.solar_panels.forEach((polygon: any) => polygon?.setMap(null));
        var solarPotential = buildingInsights.solarPotential;
        let placed_panels: any[] = [];
        let widthMeters = solarPotential.panelHeightMeters;
        let heightMeters = solarPotential.panelWidthMeters;
        let count = 0;
        // LIMIT_COUNT = solarPotential.maxArrayPanelsCount;//maxArrayPanelsCount
        let yearlyEnergyDcKwh = 0;
        let yearlyEnergyDcKwhMAX =
            solarPotential.solarPanelConfigs[
                solarPotential.solarPanelConfigs.length - 1
            ].yearlyEnergyDcKwh;
        let panelsArray: any = [];
        solarPotential.solarPanelConfigs.forEach(
            (
                config: {
                    panelsCount: number;
                    yearlyEnergyDcKwh: number;
                    roofSegmentSummaries: any[];
                },
                i: any
            ) => {
                if (config.panelsCount === LIMIT_COUNT) {
                    yearlyEnergyDcKwh = config.yearlyEnergyDcKwh;
                }
                config.roofSegmentSummaries.forEach((s) => {
                    const segmentIndex = s.segmentIndex;
                    const panelsCount = s.panelsCount;
                    const panels = solarPotential.solarPanels.filter(
                        (p: any) => p.segmentIndex === segmentIndex
                    );
                    for (let i = 0; i < panels.length; i++) {
                        if (count >= LIMIT_COUNT) return;
                        if (i < panelsCount) {
                            const objectMerged = { ...panels[i], ...s };
                            // console.log(objectMerged)
                            if (
                                !placed_panels.some(
                                    (e: any) => e.center === objectMerged.center
                                )
                            ) {
                                placed_panels.push(objectMerged);
                                let boundBox;
                                if (objectMerged.orientation === "PORTRAIT") {
                                    let heightMeters =
                                        solarPotential.panelHeightMeters;
                                    let widthMeters =
                                        solarPotential.panelWidthMeters;
                                    boundBox =
                                        this.getBoundingBoxAroundCoordinate(
                                            objectMerged.center,
                                            widthMeters,
                                            heightMeters
                                        );
                                } else {
                                    boundBox =
                                        this.getBoundingBoxAroundCoordinate(
                                            objectMerged.center,
                                            widthMeters,
                                            heightMeters
                                        );
                                }
                                let rotationCenter = {
                                    lat: objectMerged.center.latitude,
                                    lng: objectMerged.center.longitude,
                                };
                                const finalCoords = this.rotatePolygon(
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
            }
        );
        this.solar_panels = panelsArray.map((panel: any) =>
            this.renderPolygon(panel, mapRef)
        );
        return this.solar_panels;
    },
    renderPolygon(panel: any, mapRef: any) {
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
    },
    updatePanelData(buildingInsights: any, segmentIndex: string | number) {
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
        return null;
    },
};

export default SolarPanelService;
