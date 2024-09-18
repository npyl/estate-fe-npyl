import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SchoolIcon from "@mui/icons-material/School";
import {
    Box,
    Paper,
    Slider,
    ToggleButton,
    ToggleButtonGroup,
    useTheme,
    Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { useLoadApi } from "src/components/Map";
import { useGetPropertyByIdQuery } from "src/services/properties";
import { useDebouncedCallback } from "use-debounce";
import RelatedPlaces from "./RelatedPlaces";
import Grid from "@mui/material/Grid";
import MapUnavailable from "@/components/Map/MapUnavailable";
import { useTranslation } from "react-i18next";

const initialState: any[] = [];

const actionTypes = {
    ADD: "ADD",
    RESET: "RESET",
};

const getIconPathForType = (type: string) => {
    switch (type) {
        case "hospital":
            return "https://img.icons8.com/external-bearicons-flat-bearicons/40/000000/external-Hospital-location-bearicons-flat-bearicons.png";
        case "supermarket":
            return "https://img.icons8.com/external-bearicons-flat-bearicons/40/external-Market-location-bearicons-flat-bearicons.png";
        case "restaurant":
            return "https://img.icons8.com/external-bearicons-flat-bearicons/40/external-Restaurant-location-bearicons-flat-bearicons.png";
        case "bar":
            return "https://img.icons8.com/external-bearicons-flat-bearicons/40/000000/external-Pub-location-bearicons-flat-bearicons.png";
        case "school":
            return "https://img.icons8.com/external-bearicons-flat-bearicons/40/000000/external-School-location-bearicons-flat-bearicons.png";
        case "airport":
            return "https://img.icons8.com/external-bearicons-flat-bearicons/40/000000/external-Airport-location-bearicons-flat-bearicons.png";
        case "transit_station":
            return "https://img.icons8.com/external-bearicons-flat-bearicons/40/000000/external-Bus-location-bearicons-flat-bearicons.png";
        default:
            return "/static/img/default.png";
    }
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case actionTypes.ADD:
            return [...state, action.payload];
        case actionTypes.RESET:
            return initialState;
        default:
            return state;
    }
};

function MyComponent() {
    const { t } = useTranslation();
    const theme = useTheme();
    const router = useRouter();

    const { isLoaded } = useLoadApi();

    const { propertyId } = router.query;

    const { data } = useGetPropertyByIdQuery(+propertyId!);

    const [alignment, setAlignment] = useState("hospital");
    const [radius, setRadius] = useState<number | number[]>(1);
    const [places, setPlaces] = useState<any>([]);
    const [state, dispatch] = useReducer(reducer, initialState);

    const center = useMemo(
        () => ({
            lat: data?.location?.lat || 37.98381,
            lng: data?.location?.lng || 23.727539,
        }),
        [data?.location]
    );

    const mapRef = useRef<any>(null);
    const serviceRef = useRef<any>(null);

    useEffect(() => {
        if (isLoaded) {
            if (data?.location?.lat != null && data?.location?.lng != null) {
                if (window.google && document.getElementById("map")) {
                    mapRef.current = new window.google.maps.Map(
                        document.getElementById("map")!,
                        {
                            center,
                            zoom: 15 - +radius * 0.6,
                            gestureHandling: "greedy", // enable zoom in/out with mouse scroll
                        }
                    );
                    // Check if latitude and longitude are available before adding a marker

                    new google.maps.Marker({
                        position: center,
                        map: mapRef.current,
                        icon: "https://img.icons8.com/external-bearicons-flat-bearicons/64/external-Home-location-bearicons-flat-bearicons.png",
                        zIndex: 50,
                    });

                    serviceRef.current =
                        new window.google.maps.places.PlacesService(
                            mapRef.current
                        );
                }
            } else {
            }
            searchNearbyHospitals();
        }
    }, [isLoaded, radius, alignment]);

    const searchNearbyHospitals = () => {
        if (mapRef.current && serviceRef.current) {
            const request = {
                location: new google.maps.LatLng(center),
                radius: 500 + +radius * 1000, // Specify the radius in meters
                type: alignment,
            };
            new window.google.maps.Circle({
                strokeColor: theme.palette.info.main, // Color of the circle's outline
                strokeOpacity: 0.8, // Opacity of the circle's outline
                strokeWeight: 2, // Width of the circle's outline
                fillColor: theme.palette.info.light, // Color of the circle's fill
                fillOpacity: 0.35, // Opacity of the circle's fill
                radius: 500 + +radius * 1000, // Radius of the circle in meters,
                center: center,
                map: mapRef.current,
            });
            const service = serviceRef.current;
            service.nearbySearch(
                request,
                (
                    results: any[],
                    status: google.maps.places.PlacesServiceStatus
                ) => {
                    if (
                        status ===
                        google.maps.places.PlacesServiceStatus.ZERO_RESULTS
                    ) {
                        setPlaces([]);
                        dispatch({ type: actionTypes.RESET });
                    }
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        dispatch({ type: actionTypes.RESET });
                        setPlaces(results);
                        // Process the results and add markers to the map
                        results.forEach((result) => {
                            // Assuming you have initialized the map and have the marker and center coordinates

                            // Create a DirectionsService object
                            const directionsService =
                                new google.maps.DirectionsService();
                            // Define the request parameters
                            const request = {
                                origin: center, // Marker position
                                destination: {
                                    lat: result?.geometry.location.lat(),
                                    lng: result?.geometry.location.lng(),
                                }, // Center position
                                travelMode: google.maps.TravelMode.DRIVING, // Can be DRIVING or WALKING
                            };

                            // Call the DirectionsService route method to calculate the directions
                            directionsService.route(
                                request,
                                (
                                    response: google.maps.DirectionsResult | null,
                                    status: google.maps.DirectionsStatus
                                ) => {
                                    if (
                                        status ===
                                        google.maps.DirectionsStatus.OK
                                    ) {
                                        const duration =
                                            response?.routes[0].legs[0];
                                        dispatch({
                                            type: actionTypes.ADD,
                                            payload: duration,
                                        });
                                        // const durationInMinutes = Math.ceil(totalDuration / 60);
                                    } else {
                                        console.error(
                                            "Error calculating directions:",
                                            status
                                        );
                                    }
                                }
                            );

                            new google.maps.Marker({
                                position: result.geometry.location,
                                map: mapRef.current,
                                icon: getIconPathForType(alignment),
                            });
                        });
                    }
                }
            );
        }
    };

    const handleChange = (_: any, newAlignment: string) =>
        setAlignment(newAlignment);

    const handleSliderRadius = useDebouncedCallback((e) => setRadius(e), 300);

    if (
        !(
            data?.location?.lat &&
            data?.location?.lat > 0 &&
            data?.location?.lng &&
            data?.location?.lng > 0
        )
    ) {
        return <MapUnavailable />;
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
                {isLoaded ? (
                    <>
                        <Box id="map" height={1} width={1} />

                        <Paper
                            sx={{
                                width: 240,
                                position: "absolute",
                                top: "10px",
                                left: "50%",
                                paddingX: 3,
                                textAlign: "center",
                                transform: "translateX(-50%)",
                            }}
                        >
                            <Typography variant="caption">
                                Επέκταση ακτίνας κατά {radius}χλμ.{" "}
                            </Typography>
                            <Slider
                                onChange={(e, value) =>
                                    handleSliderRadius(value)
                                }
                                aria-label="Always visible"
                                defaultValue={0}
                                getAriaValueText={valuetext}
                                step={0.2}
                                marks={marks}
                                valueLabelDisplay="off"
                                min={0}
                                max={5}
                            />
                        </Paper>

                        <ToggleButtonGroup
                            sx={{
                                position: "absolute",
                                bottom: "30px",
                                left: "10px",
                                background: "white",
                            }}
                            orientation="vertical"
                            color="primary"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                        >
                            <ToggleButton value="hospital">
                                <LocalHospitalIcon />
                            </ToggleButton>
                            <ToggleButton value="supermarket">
                                <LocalGroceryStoreIcon />
                            </ToggleButton>
                            <ToggleButton value="restaurant">
                                <LocalDiningIcon />
                            </ToggleButton>
                            <ToggleButton value="bar">
                                <LocalBarIcon />
                            </ToggleButton>
                            <ToggleButton value="school">
                                <SchoolIcon />
                            </ToggleButton>
                            <ToggleButton value="airport">
                                <LocalAirportIcon />
                            </ToggleButton>
                            <ToggleButton value="transit_station">
                                <DirectionsBusIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </>
                ) : (
                    <div>Loading maps</div>
                )}
            </Grid>
            <Grid item xs={12} md={6}>
                <RelatedPlaces
                    data={data}
                    title={t("Closest points") || ""}
                    list={places}
                    duration={state}
                />
            </Grid>
        </Grid>
    );
}

export default MyComponent;

const marks = [
    {
        value: 0,
        label: "0",
    },
    {
        value: 1,
        label: "1",
    },
    {
        value: 2,
        label: "2",
    },
    {
        value: 3,
        label: "3",
    },
    {
        value: 4,
        label: "4",
    },
    {
        value: 5,
        label: "5",
    },
];

function valuetext(value: number) {
    return `${value}klm`;
}
