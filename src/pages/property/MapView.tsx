import FlipIcon from "@mui/icons-material/Flip";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import Map, { IMapAddress, IMapMarker } from "src/components/Map/Map";
import { DrawShape, StopDraw } from "src/components/Map/types";
import {
    decodeShape,
    encodeShape,
    isPointInsideShapeData,
} from "src/components/Map/util";
import { useDebouncedCallback } from "use-debounce";
import InfoIcon from "@mui/icons-material/Info";
import PropertyCard, { PropertyCardH } from "@/components/PropertyCard";
import { useMapViewPropertiesMutation } from "src/services/properties";
import { selectAll } from "src/slices/filters";
import { useSelector } from "react-redux";
import useResponsive from "@/hooks/useResponsive";
import { IPropertyResultResponse } from "@/types/properties";

interface Props {
    toggleOrientation: VoidFunction;
}

const FlipOrientationButton = ({ toggleOrientation }: Props) => {
    const belowLg = useResponsive("down", "lg");

    return !belowLg ? (
        <Stack direction="row" justifyContent="flex-end">
            <Button
                onClick={toggleOrientation}
                sx={{ width: 30, justifyContent: "right" }}
            >
                <FlipIcon />
            </Button>
        </Stack>
    ) : null;
};

// ---------------------------------------------------------------------

const useResponsiveOrientation = (): [boolean, VoidFunction] => {
    const belowLg = useResponsive("down", "lg");

    const [orientation, setOrientation] = useState(false);
    const toggleOrientation = useCallback(
        () => setOrientation((old) => !old),
        []
    );

    // Revert to vertical orientation on mobile
    useEffect(() => {
        if (belowLg) setOrientation(false);
    }, []);

    return [orientation, toggleOrientation];
};

const Placeholder = () => (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column", // Changed to 'column' to stack icon and text
            justifyContent: "center",
            alignItems: "center",
            padding: 3, // Increased padding for more space
            backgroundColor: "background.default", // Use theme background color
            textAlign: "center",
            height: "100%", // Full height of the parent container
            gap: 2, // space between icon and text
        }}
    >
        <InfoIcon
            sx={{
                color: "primary.main",
                fontSize: "3rem",
            }}
        />
        <Typography
            variant="subtitle1"
            component="div"
            sx={{
                color: "text.primary",
                fontWeight: "medium",
            }}
        >
            Draw or drag to a location that has markers
        </Typography>
    </Box>
);

interface PropertiesListProps {
    filtered: IPropertyResultResponse[];
    activeMarker?: number;
    selectedMarker: IMapMarker | null;
}

const PropertiesList = ({
    filtered,
    // ...
    activeMarker,
    selectedMarker,
}: PropertiesListProps) => {
    const [orientation, toggleOrientation] = useResponsiveOrientation();

    return (
        <>
            <FlipOrientationButton toggleOrientation={toggleOrientation} />

            <Grid container spacing={1}>
                {filtered.map((item, index) => (
                    <Grid
                        mb={1}
                        key={index}
                        item
                        xs={12}
                        sm={orientation ? 12 : 6}
                        sx={{
                            backgroundColor: "background.default",
                        }}
                    >
                        {orientation ? (
                            <PropertyCardH
                                activeMarker={activeMarker || -1}
                                item={item}
                                selectedMarker={selectedMarker}
                            />
                        ) : (
                            <PropertyCard
                                item={item}
                                selectedMarker={selectedMarker}
                            />
                        )}
                    </Grid>
                ))}
            </Grid>

            {filtered.length === 0 && <Placeholder />}
        </>
    );
};

const MapView = () => {
    const [filter, { data }] = useMapViewPropertiesMutation({
        selectFromResult: ({ data }) => ({
            data: data?.content || [],
        }),
    });

    const [encodedShape, setEncodedShape] = useState<string>();

    const [activeMarker, setActiveMarker] = useState<number>();
    const [mainMarker, setMainMarker] = useState<IMapMarker>({
        lat: 37.98381,
        lng: 23.727539,
    });
    const [selectedMarker, setSelectedMarker] = useState<IMapMarker | null>(
        null
    );

    const allFilters = useSelector(selectAll);

    // filter only properties with valid location.{lat,lng}
    const nonNullProperties = useMemo(
        () => data.filter((p) => p.location?.lat && p.location?.lng),
        [data]
    );

    useEffect(() => {
        filter(allFilters);
    }, [allFilters]);

    // properties we show
    const filtered = useMemo(() => {
        if (!!selectedMarker) return nonNullProperties;

        if (encodedShape) {
            const shape = decodeShape(encodedShape);
            if (!shape) return [];

            return nonNullProperties.filter((p) =>
                isPointInsideShapeData(p.location.lat!, p.location.lng!, shape)
            );
        }

        return nonNullProperties;
    }, [selectedMarker, nonNullProperties, encodedShape]);

    // respective markers
    const markers: IMapMarker[] = useMemo(
        () =>
            data.map(({ location }) => ({
                lat: location.lat!,
                lng: location.lng!,
            })),
        [data]
    );

    const handleDraw = (shape: DrawShape | StopDraw) =>
        setEncodedShape(shape ? encodeShape(shape) : "");
    const handleChange = useDebouncedCallback(
        (oldEncodedShape: string, newEncodedShape: string) =>
            setEncodedShape(newEncodedShape),
        150
    );

    const updateMainMarkerCoordinates = (lat: number, lng: number) => {
        let newMarker = mainMarker;
        newMarker.lat = lat;
        newMarker.lng = lng;
        setMainMarker(newMarker);
    };

    const handleSearchSelect = (
        address: IMapAddress,
        lat: number,
        lng: number
    ) => {
        if (!lat || !lng) return;

        updateMainMarkerCoordinates(lat, lng);
    };

    return (
        <Grid container mt={1} spacing={1}>
            <Grid height={`calc(100vh - 266px)`} item xs={12} lg={6}>
                <Map
                    search
                    mainMarker={mainMarker}
                    activeMarker={activeMarker}
                    setActiveMarker={setActiveMarker}
                    onMarkerClick={setSelectedMarker}
                    markers={markers}
                    onDraw={handleDraw}
                    onShapeChange={handleChange}
                    onSearchSelect={handleSearchSelect}
                />
            </Grid>

            <Grid item xs={12} lg={6}>
                <PropertiesList
                    filtered={filtered}
                    activeMarker={activeMarker}
                    selectedMarker={selectedMarker}
                />
            </Grid>
        </Grid>
    );
};
export default MapView;
