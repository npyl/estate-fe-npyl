import FlipIcon from "@mui/icons-material/Flip";
import { Button, Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Map, { IMapAddress, IMapMarker } from "src/components/Map/Map";
import { DrawShape, StopDraw } from "src/components/Map/types";
import { encodeShape, convertShapeToPoints } from "src/components/Map/util";
import { useDebouncedCallback } from "use-debounce";
import PropertyCard, { PropertyCardH } from "@/components/PropertyCard";
import {
    useFilterPropertiesMutation,
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
    const dispatch = useDispatch();

    const [filterProperties, { data: properties, isLoading }] =
        useFilterPropertiesMutation();

    const [activeMarker, setActiveMarker] = useState<number>();
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
    const { page } = pagination;

    const allFilters = useSelector(selectAll);

    useEffect(() => {
        filterProperties({
            filter: allFilters,
            page: page,
            pageSize,
            sortBy: "updatedAt",
            direction: "DESC",
        });
    }, [allFilters, page, pageSize]);

    // respective markers
    const { data: markers } = useGetPropertyLocationMarkersQuery();

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
                height={`calc(100vh - 86px)`}
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
