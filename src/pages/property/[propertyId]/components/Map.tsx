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
  Typography,
  useTheme,
} from "@mui/material";
import { useJsApiLoader } from "@react-google-maps/api";
import { useRouter } from "next/router";
import React, { useMemo, useReducer, useState } from "react";
import { useGetPropertyByIdQuery } from "src/services/properties";
import { useDebouncedCallback } from "use-debounce";
import RelatedPlaces from "./RelatedPlaces";
const containerStyle = {
  width: "100%",
  height: "65vh",
};
const libraries = ["places"];
const initialState: any[] = [];

const actionTypes = {
  ADD: "ADD",
  RESET: "RESET",
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
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries as any,
  });
  const theme = useTheme();
  const router = useRouter();
  const { propertyId } = router.query;
  const [radius, setRadius] = useState<number | number[]>(1);
  const { data } = useGetPropertyByIdQuery(parseInt(propertyId as string)); // basic details
  const [alignment, setAlignment] = React.useState("hospital");
  const [places, setPlaces] = useState<any>([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const center = useMemo(() => {
    return {
      lat: data?.location.lat!,
      lng: data?.location.lng!,
    };
  }, [data]);
  const mapRef = React.useRef<any>(null);
  const serviceRef = React.useRef<any>(null);

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
        (results: any[], status: google.maps.places.PlacesServiceStatus) => {
          if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
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
              const directionsService = new google.maps.DirectionsService();
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
              directionsService.route(request, (response, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                  const duration = response?.routes[0].legs[0];
                  dispatch({ type: actionTypes.ADD, payload: duration });
                  // const durationInMinutes = Math.ceil(totalDuration / 60);
                } else {
                  console.error("Error calculating directions:", status);
                }
              });

              new google.maps.Marker({
                position: result.geometry.location,
                map: mapRef.current,
                icon: "/static/img/hospital.png",
              });
            });
          }
        }
      );
    }
  };

  React.useEffect(() => {
    if (isLoaded) {
      mapRef.current = new window.google.maps.Map(
        document.getElementById("map")!,
        {
          center,
          zoom: 15 - +radius * 0.6,
        }
      );
      new google.maps.Marker({
        position: center,
        map: mapRef.current,
        icon: "/static/img/home.png",
        zIndex: 50,
      });
      serviceRef.current = new window.google.maps.places.PlacesService(
        mapRef.current
      );

      searchNearbyHospitals();
    }
  }, [isLoaded, radius, alignment]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  const handleSliderRadius = useDebouncedCallback((e) => {
    setRadius(e);
  }, 300);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <Box display={"flex"} gap={2}>
      <div style={{ height: "65vh", width: "60vw", position: "relative" }}>
        {isLoaded ? (
          <Box>
            <div id='map' style={containerStyle} />
          </Box>
        ) : (
          <div>Loading maps</div>
        )}

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
          <Typography variant='caption'>
            Επέκταση ακτίνας κατά {radius}χλμ.{" "}
          </Typography>
          <Slider
            onChange={(e, value) => handleSliderRadius(value)}
            aria-label='Always visible'
            defaultValue={0}
            getAriaValueText={valuetext}
            step={0.2}
            marks={marks}
            valueLabelDisplay='off'
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
          orientation='vertical'
          color='primary'
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label='Platform'
        >
          <ToggleButton value='hospital'>
            <LocalHospitalIcon />
          </ToggleButton>
          <ToggleButton value='supermarket'>
            <LocalGroceryStoreIcon />
          </ToggleButton>
          <ToggleButton value='restaurant'>
            <LocalDiningIcon />
          </ToggleButton>
          <ToggleButton value='bar'>
            <LocalBarIcon />
          </ToggleButton>
          <ToggleButton value='school'>
            <SchoolIcon />
          </ToggleButton>
          <ToggleButton value='airport'>
            <LocalAirportIcon />
          </ToggleButton>
          <ToggleButton value='transit_station'>
            <DirectionsBusIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <Box width={"40vw"} height={"65vh"} overflow={"auto"}>
        <RelatedPlaces
          title='Κοντινότερα σημεία'
          list={places}
          duration={state}
        />
      </Box>
    </Box>
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
