import FlipIcon from "@mui/icons-material/Flip";
import { Button, Grid, Stack } from "@mui/material";
import { useCallback, useState } from "react";
import Map, { IMapMarker } from "src/components/Map/Map";
import { DrawShape, StopDraw } from "src/components/Map/types";
import { encodeShape, convertShapeToPoints } from "src/components/Map/util";
import { useDebouncedCallback } from "use-debounce";
import PropertyCard, { PropertyCardH } from "@/components/Cards/PropertyCard";
import {
    useFilterPropertiesQuery,
    useGetPropertyCardByIdQuery,
    useGetPropertyLocationMarkersQuery,
} from "src/services/properties";
import { selectAll, setPoints, resetPoints } from "src/slices/filters";
import { useSelector } from "react-redux";
import useResponsive from "@/hooks/useResponsive";
import { IPropertyResultResponse } from "@/types/properties";
import Placeholder from "./Placeholder";
import useResponsiveOrientation from "./hook";
import Pagination, { usePagination } from "@/components/Pagination";
import { useDispatch } from "react-redux";
import { InfoWindowF, MarkerF } from "@react-google-maps/api";
import PropertyInfoWindow from "./PropertyInfoWindow";

interface Props {
    toggleOrientation: VoidFunction;
}

const FlipOrientationButton = ({ toggleOrientation }: Props) => {
    const belowLg = useResponsive("down", "lg");

    return !belowLg ? (
        <Stack direction="row" justifyContent="flex-end">
            <Button onClick={toggleOrientation} sx={{ width: 30 }}>
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

// ---------------------------------------------------------------------

interface MapViewProps {
    sortBy: string;
    direction: string;
}

const MapView = ({ sortBy, direction }: MapViewProps) => {
    const dispatch = useDispatch();

    const [activeMarker, setActiveMarker] = useState<number | undefined>(
        undefined
    );
    const [mainMarker, setMainMarker] = useState<IMapMarker>({
        lat: 38.246639,
        lng: 21.734573,
    });
    const [selectedMarker, setSelectedMarker] = useState<IMapMarker | null>(
        null
    );

    const pagination = usePagination();
    const belowSm = useResponsive("down", "sm");
    const belowLg = useResponsive("down", "lg");

    const pageSize = belowSm ? 5 : belowLg ? 10 : 25;

    const allFilters = useSelector(selectAll);

    const { data: properties, isLoading } = useFilterPropertiesQuery({
        filter: allFilters,
        page: pagination.page,
        pageSize,
        sortBy: sortBy,
        direction: direction,
    });

    const { data: markers } = useGetPropertyLocationMarkersQuery();
    // const {data: cards} = useGetPropertyCardByIdQuery(propertyId);

    // const handleMarkerHover = useCallback((index: number) => {
    //     setActiveMarker(index);
    // }, []);

    const handleMarkerLeave = useCallback(() => {
        setActiveMarker(undefined);
    }, []);

    const handleMarkerClick = useCallback(
        (marker: IMapMarker, index: number) => {
            setActiveMarker(index);
            setSelectedMarker(marker);
        },
        []
    );

    const handleDraw = (shape: DrawShape | StopDraw) =>
        dispatch(
            shape
                ? setPoints(convertShapeToPoints(encodeShape(shape)))
                : resetPoints()
        );

    const handleChange = useDebouncedCallback(
        (old: string, newEncodedShape: string) =>
            dispatch(setPoints(convertShapeToPoints(newEncodedShape))),
        150
    );

    const updateMainMarkerCoordinates = (lat: number, lng: number) => {
        setMainMarker({ lat, lng });
    };

    const handleSearchSelect = (_: any, lat: number, lng: number) => {
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
                {isLoading ? null : (
                    <Pagination
                        {...pagination}
                        pageSize={pageSize}
                        totalItems={properties?.totalElements ?? pageSize}
                        isLoading={isLoading}
                        Container={Grid}
                        ContainerProps={{
                            container: true,
                            py: 2,
                            spacing: 1,
                        }}
                    >
                        <PropertiesList
                            isLoading={isLoading}
                            filtered={properties?.content || []}
                            selectedMarker={selectedMarker}
                        />
                    </Pagination>
                )}
            </Grid>

            <Grid
                height={`calc(100vh - 136px)`}
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
                top="120px"
                right="0px"
            >
                <Map
                    mainMarker={mainMarker}
                    activeMarker={activeMarker}
                    setActiveMarker={setActiveMarker}
                    onMarkerClick={(marker) => {
                        setSelectedMarker(marker); // Set the clicked marker as the selected marker
                        const index = markers?.findIndex(
                            (m) => m.lat === marker.lat && m.lng === marker.lng
                        );
                        setActiveMarker(index); // Update the active marker state
                    }}
                    // search
                    drawing={true}
                    markers={markers}
                    onDraw={handleDraw}
                    onShapeChange={handleChange}
                    onSearchSelect={handleSearchSelect}
                >
                    {markers?.map((marker, index) => (
                        <MarkerF
                            key={`${marker.lat}-${marker.lng}-${marker.propertyId}`}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            onClick={() => {
                                setActiveMarker(index);
                                setSelectedMarker(marker);
                            }}
                            icon="/static/map/mapIcon.svg"
                        >
                            {activeMarker === index && (
                                <PropertyInfoWindow
                                    marker={marker}
                                    properties={properties?.content || []}
                                    setActiveMarker={setActiveMarker}
                                />
                            )}
                        </MarkerF>
                    ))}
                </Map>
            </Grid>
        </Grid>
    );
};

export default MapView;
