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
import { Dispatch, FC, useCallback, useEffect, useRef, useState } from "react";
import { IMapCoordinates } from "@/components/Map";
import { useDebouncedCallback } from "use-debounce";
import { IProperties } from "@/types/properties";
import { actionTypes } from "./reducer";

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

interface INearbySearchRes {
    results: google.maps.places.PlaceResult[];
    status: google.maps.places.PlacesServiceStatus;
}

interface IDirectionsRes {
    response: google.maps.DirectionsResult;
    status: google.maps.DirectionsStatus;
}

interface MapContentProps {
    center: IMapCoordinates;
    data: IProperties;
    setPlaces: (p: google.maps.places.PlaceResult[]) => void;
    dispatchState: Dispatch<any>;
}

const MapContent: FC<MapContentProps> = ({
    center,
    data,
    setPlaces,
    dispatchState,
}) => {
    const theme = useTheme();

    const [alignment, setAlignment] = useState("hospital");
    const [radius, setRadius] = useState<number | number[]>(1);

    const mapRef = useRef<any>(null);
    const serviceRef = useRef<google.maps.places.PlacesService>();
    const directoryServiceRef = useRef<google.maps.DirectionsService>(
        new google.maps.DirectionsService()
    );

    const circleRef = useRef<any>(null);
    const markerRef = useRef<google.maps.Marker>();
    const markersRef = useRef<google.maps.Marker[]>([]);

    const getSearchNearby = useCallback(
        async (request: any) =>
            new Promise<INearbySearchRes | undefined>((resolve) => {
                serviceRef.current?.nearbySearch(
                    request,
                    (
                        results: google.maps.places.PlaceResult[] | null,
                        status: google.maps.places.PlacesServiceStatus
                    ) => {
                        const res = results
                            ? {
                                  results,
                                  status,
                              }
                            : undefined;

                        resolve(res);
                    }
                );
            }),
        []
    );

    // Call the DirectionsService route method to calculate the directions
    const getDirections = useCallback(
        async (request: any) =>
            new Promise<IDirectionsRes | undefined>((resolve) => {
                directoryServiceRef.current.route(
                    request,
                    (
                        response: google.maps.DirectionsResult | null,
                        status: google.maps.DirectionsStatus
                    ) => {
                        const res = response ? { response, status } : undefined;
                        resolve(res);
                    }
                );
            }),
        []
    );

    const searchNearbyHospitals = useCallback(async () => {
        if (!mapRef.current || !serviceRef.current) return;

        markersRef.current = [];

        const request = {
            location: new google.maps.LatLng(center),
            radius: 500 + +radius * 1000, // Specify the radius in meters
            type: alignment,
        };

        circleRef.current = new window.google.maps.Circle({
            strokeColor: theme.palette.info.main, // Color of the circle's outline
            strokeOpacity: 0.8, // Opacity of the circle's outline
            strokeWeight: 2, // Width of the circle's outline
            fillColor: theme.palette.info.light, // Color of the circle's fill
            fillOpacity: 0.35, // Opacity of the circle's fill
            radius: 500 + +radius * 1000, // Radius of the circle in meters,
            center: center,
            map: mapRef.current,
        });

        const res = await getSearchNearby(request);
        if (!res) return;

        const { status, results } = res;

        if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            setPlaces([]);
            dispatchState({ type: actionTypes.RESET });
        }

        if (status === google.maps.places.PlacesServiceStatus.OK) {
            dispatchState({ type: actionTypes.RESET });
            setPlaces(results);

            // Process the results and add markers to the map
            for (const result of results) {
                // Define the request parameters
                const request = {
                    origin: center, // Marker position
                    destination: {
                        lat: result?.geometry?.location?.lat() ?? -1,
                        lng: result?.geometry?.location?.lng() ?? -1,
                    }, // Center position
                    travelMode: google.maps.TravelMode.DRIVING, // Can be DRIVING or WALKING
                };

                const res = await getDirections(request);
                if (!res) break;

                const { status, response } = res;

                if (status === google.maps.DirectionsStatus.OK) {
                    const duration = response?.routes[0].legs[0];
                    dispatchState({
                        type: actionTypes.ADD,
                        payload: duration,
                    });
                } else {
                    console.error("Error calculating directions:", status);
                }

                const m = new google.maps.Marker({
                    position: result.geometry?.location,
                    map: mapRef.current,
                    icon: getIconPathForType(alignment),
                });

                markersRef.current.push(m);
            }
        }
    }, [radius, alignment]);

    useEffect(() => {
        if (data?.location?.lat === null || data?.location?.lng === null)
            return;
        searchNearbyHospitals();
    }, [radius, searchNearbyHospitals]);

    useEffect(() => {
        if (!window.google || !document.getElementById("map")) return;

        mapRef.current = new window.google.maps.Map(
            document.getElementById("map")!,
            {
                center,
                zoom: 15 - +radius * 0.6,
                gestureHandling: "greedy", // enable zoom in/out with mouse scroll
            }
        );
        // Check if latitude and longitude are available before adding a marker

        markerRef.current = new google.maps.Marker({
            position: center,
            map: mapRef.current,
            icon: "https://img.icons8.com/external-bearicons-flat-bearicons/64/external-Home-location-bearicons-flat-bearicons.png",
            zIndex: 50,
        });

        serviceRef.current = new window.google.maps.places.PlacesService(
            mapRef.current
        );
    }, []);

    const handleChange = useCallback(
        (_: any, a: string) => setAlignment(a),
        []
    );

    const handleSliderRadius = useDebouncedCallback((e) => setRadius(e), 300);

    return (
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
                    onChange={(e, value) => handleSliderRadius(value)}
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
    );
};

export default MapContent;
