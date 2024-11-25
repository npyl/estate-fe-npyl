import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { useLoadApi } from "src/components/Map";
import { useGetPropertyByIdQuery } from "src/services/properties";
import Grid from "@mui/material/Grid";
import ModesButtons from "./ModesButtons";
import PanelCountSlider from "./PanelCountSlider";
import { useGetBuildingInsightsQuery } from "@/services/googleapi";
import useSolarPanelService from "./services/SolarPanelService";
import { MinorPanelInfo } from "./types";
import MapUnavailable from "@/components/Map/MapUnavailable";
import SolarDetailsSkeleton from "./Solar/Skeleton";
const SolarDetails = lazy(() => import("./Solar"));
const AirQualityDetails = lazy(() => import("./AirQuality"));

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

    const [minorPanelInfo, setMinorPanelInfo] = useState<MinorPanelInfo>();

    const [alignment, setAlignment] = useState("solar");
    const [slider_value, setSliderValue] = useState(4);

    const center = useMemo(
        () => ({
            lat: data?.location?.lat || -1,
            lng: data?.location?.lng || -1,
        }),
        [data?.location]
    );

    const { data: solar_info } = useGetBuildingInsightsQuery(center, {
        skip: center.lat === -1 || center.lng === -1,
    });

    const { plotSolar, getMinorPanelInfo } = useSolarPanelService();

    const mapRef = useRef<google.maps.Map>();

    const handleChange = (_: any, newAlignment: string) =>
        setAlignment(newAlignment);

    useEffect(() => {
        if (!isLoaded) return;
        if (center.lat === -1 || center.lng === -1) return;

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
                () => setProjection(mapRef.current?.getProjection())
            );
        }
    }, [isLoaded, center]);

    useEffect(() => {
        if (!projection || !solar_info) return;

        plotSolar(solar_info, projection, slider_value, mapRef.current);
        setMinorPanelInfo(getMinorPanelInfo(solar_info, slider_value));
        mapRef.current?.setZoom(20);
    }, [projection, solar_info, slider_value]);

    if (!data?.location?.lat || !data?.location?.lng) {
        return <MapUnavailable />;
    }

    return (
        <Grid container spacing={2} mt={2}>
            <Grid
                item
                xs={12}
                md={6}
                position={{ xs: "relative", md: "sticky" }}
                top={{ xs: "0", md: "60px" }}
                height="90vh"
            >
                <Box id="map" height={1} />

                {isLoaded && solar_info ? (
                    <PanelCountSlider
                        value={slider_value}
                        maxPanelsAllowed={
                            solar_info.solarPotential.solarPanelConfigs.length
                        }
                        onChange={setSliderValue}
                    />
                ) : null}

                {isLoaded ? (
                    <ModesButtons
                        alignment={alignment}
                        onClick={handleChange}
                    />
                ) : null}
            </Grid>

            <Grid item xs={12} md={6}>
                {alignment == "solar" ? (
                    !solar_info ? (
                        <SolarDetailsSkeleton />
                    ) : (
                        <Suspense>
                            <SolarDetails
                                solarInsights={solar_info}
                                panel_data={minorPanelInfo}
                            />
                        </Suspense>
                    )
                ) : null}

                {alignment == "air_quality" ? (
                    <Suspense>
                        <AirQualityDetails center={center} />
                    </Suspense>
                ) : null}
            </Grid>
        </Grid>
    );
}

export default GreenMapComponent;
