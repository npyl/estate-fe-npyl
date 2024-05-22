import FlipIcon from "@mui/icons-material/Flip";
import { Button, Grid, Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Map, { IMapAddress, IMapMarker } from "src/components/Map/Map";
import { DrawShape, StopDraw } from "src/components/Map/types";
import {
    decodeShape,
    encodeShape,
    isPointInsideShapeData,
} from "src/components/Map/util";
import { useDebouncedCallback } from "use-debounce";
import PropertyCard, { PropertyCardH } from "@/components/PropertyCard";
import { useMapViewPropertiesMutation } from "src/services/properties";
import { selectAll } from "src/slices/filters";
import { useSelector } from "react-redux";
import useResponsive from "@/hooks/useResponsive";
import { IPropertyResultResponse } from "@/types/properties";
import Placeholder from "./Placeholder";
import useResponsiveOrientation from "./hook";

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

interface PropertiesListProps {
    isLoading: boolean;
    filtered: IPropertyResultResponse[];
    selectedMarker: IMapMarker | null;
}

const PropertiesList = ({
    isLoading,
    filtered,
    selectedMarker,
}: PropertiesListProps) => {
    const [orientation, toggleOrientation] = useResponsiveOrientation();

    return (
        <>
            <FlipOrientationButton toggleOrientation={toggleOrientation} />

            {!isLoading && filtered.length === 0 && <Placeholder />}

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
        </>
    );
};

const MapView = () => {
    const [filter, { data, isLoading }] = useMapViewPropertiesMutation({
        selectFromResult: ({ data, isLoading }) => ({
            data: data?.content || [],
            isLoading,
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
        <Grid container mt={1} spacing={1} order="revert">
            <Grid
                item
                xs={12}
                lg={6}
                order={{
                    xs: 2,
                    lg: 1,
                }}
            >
                <PropertiesList
                    isLoading={isLoading}
                    filtered={filtered}
                    selectedMarker={selectedMarker}
                />
            </Grid>

            <Grid
                height={`calc(100vh - 266px)`}
                item
                xs={12}
                lg={6}
                order={{
                    xs: 1,
                    lg: 2,
                }}
                position={{
                    xs: "inherit",
                    lg: "sticky",
                }}
                // For sticky:
                top="65px"
                right="0px"
            >
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
        </Grid>
    );
};
export default MapView;
