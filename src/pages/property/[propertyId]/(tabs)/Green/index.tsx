import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLoadApi } from "src/components/Map";
import { useGetPropertyByIdQuery } from "src/services/properties";
import { useDebouncedCallback } from "use-debounce";
import Grid from "@mui/material/Grid";
import Placeholder from "./Placeholder";
import ModesButtons from "./ModesButtons";
import SolarDetails from "./Solar";
import SolarPanelService from "./services/SolarPanelService";
import AirQualityDetails from "./AirQuality";
import PanelCountSlider from "./PanelCountSlider";
import { useGetBuildingInsightsQuery } from "@/services/googleapi";

const mapOptions = {
    zoom: 18,
    mapTypeId: "satellite",
    tilt: 0,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
};

function GreenMapComponent() {
    const router = useRouter();
    const { propertyId } = router.query;

    const { isLoaded } = useLoadApi();

    const { data } = useGetPropertyByIdQuery(+propertyId!);

    const [projection, setProjection] = useState<any>(null);

    const [panel_data, setPanelData] = useState<any>(null);

    const [alignment, setAlignment] = useState("solar");
    const [slider_value, setSliderValue] = useState(4);

    const center = useMemo(
        () => ({
            lat: data?.location?.lat ?? 37.98381,
            lng: data?.location?.lng ?? 23.727539,
        }),
        [data?.location?.lat, data?.location?.lng]
    );

    const { data: solar_info } = useGetBuildingInsightsQuery(center);

    const mapRef = useRef<any>(null);

    const handleChange = (_: any, newAlignment: string) =>
        setAlignment(newAlignment);

    useEffect(() => {
        if (!isLoaded) return;
        if (!data?.location?.lat || !data?.location?.lng) return;

        if (window.google && document.getElementById("map")) {
            mapRef.current = new window.google.maps.Map(
                document.getElementById("map")!,
                {
                    ...mapOptions,
                    center,
                }
            );

            google.maps.event.addListenerOnce(
                mapRef.current,
                "projection_changed",
                function () {
                    console.log("Projection changed");
                    setProjection(mapRef.current.getProjection());
                }
            );

            new google.maps.Marker({
                position: center,
                map: mapRef.current,
                icon: "https://img.icons8.com/external-bearicons-flat-bearicons/64/external-Home-location-bearicons-flat-bearicons.png",
                zIndex: 50,
            });

            updateSolar(center);
        }
    }, [isLoaded, center]);

    useEffect(() => {
        if (projection != null) {
            updateSolar(center);
        }
    }, [projection]);

    const updateSolar = (center: any) => {
        // SolarPanelService.getBuildingInsights(center)
        //     .then((buildingInsights) => {
        // setSolarInfo(buildingInsights as BuildingInsights);

        console.log("Got building insights..", solar_info);

        setSliderValue(4);

        // SolarPanelService.plotSolar(
        //     buildingInsights,
        //     projection,
        //     4,
        //     mapRef.current
        // );

        // const info = SolarPanelService.updatePanelData(buildingInsights, 0);
        // setPanelData(info);
    };

    const handleSliderChange = useDebouncedCallback((e) => {
        const info = SolarPanelService.updatePanelData(solar_info, e);
        setSliderValue(e);
        setPanelData(info);
    }, 100);

    if (!data?.location?.lat || !data?.location?.lng) {
        return <Placeholder />;
    }

    return (
        <Grid container spacing={2} mt={2}>
            <Grid
                item
                xs={12}
                md={6}
                position="relative"
                height={{ xs: "65vh", sm: "100vh" }}
            >
                <Box id="map" height={1} />

                {solar_info ? (
                    <PanelCountSlider
                        value={slider_value}
                        maxPanelsAllowed={
                            solar_info.solarPotential.solarPanelConfigs.length
                        }
                        onChange={handleSliderChange}
                    />
                ) : null}

                <ModesButtons alignment={alignment} onClick={handleChange} />
            </Grid>

            <Grid item xs={12} md={6}>
                {solar_info && alignment == "solar" ? (
                    <SolarDetails
                        solarInsights={solar_info}
                        panel_data={panel_data}
                    />
                ) : null}
                {alignment == "air_quality" ? (
                    <AirQualityDetails center={center} />
                ) : null}
            </Grid>
        </Grid>
    );
}

export default GreenMapComponent;
