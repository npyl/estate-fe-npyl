import { SpaceBetween } from "@/components/styled";
import { Box, Grid, Typography } from "@mui/material";
import {
    FC,
    Suspense,
    lazy,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import MunicipSelectDemands from "./MunicipSelectDemands";
import NeighbourSelectDemands from "./NeighbourSelectDemands";
import RegionSelectDemands from "./RegionSelectDemands";
import Map, { IMapAddress, IMapMarker } from "src/components/Map/Map";
import { DrawShape, ShapeData, StopDraw } from "src/components/Map/types";
import { decodeShape, encodeShape } from "src/components/Map/util";
import {
    useLazyGetClosestQuery,
    useLazyGetHierarchyByAreaIdQuery,
} from "src/services/location";
import { IDemandFiltersPOST, IDemandPOST } from "src/types/demand";
import { useDebouncedCallback } from "use-debounce";
import AutoCenter from "./auto";
const NextShapeCenter = lazy(() => import("./center"));

enum ZOOM_LEVELS {
    REGION = 10,
    MUNICIP = 13,
    NEIGHB = 16,
}

interface Props {
    index: number;
    onGetDemandName: (k: keyof IDemandPOST) => any;
    onGetDemandFilterName: (k: keyof IDemandFiltersPOST) => any;
}

const AreaOfPreference: FC<Props> = ({
    index,
    onGetDemandName,
    onGetDemandFilterName,
}) => {
    const { watch, setValue } = useFormContext();
    const { t } = useTranslation();

    const { regionsName, citiesName, complexesName, shapesName } = useMemo(
        () => ({
            regionsName: onGetDemandFilterName("regions"),
            citiesName: onGetDemandFilterName("cities"),
            complexesName: onGetDemandFilterName("complexes"),
            shapesName: onGetDemandName("shapes"),
        }),
        [onGetDemandName, onGetDemandFilterName]
    );

    const regions = (watch(regionsName) as string[]) || [];
    const cities = (watch(citiesName) as string[]) || [];
    const complexes = (watch(complexesName) as string[]) || [];
    const shapes = (watch(shapesName) as string[]) || [];

    // Initialize state from watched values to hold the actual valies of Regions , Municipalities and Neighbourhoods
    const [selectedRegions, setSelectedRegions] = useState<string[]>(regions);
    const [selectedMunicipalities, setSelectedMunicipalities] =
        useState<string[]>(cities);
    const [selectedNeighbours, setSelectedNeighbours] =
        useState<string[]>(complexes);

    useEffect(() => {
        setSelectedRegions(regions);
    }, [regions]);

    useEffect(() => {
        setSelectedMunicipalities(cities);
    }, [cities]);

    useEffect(() => {
        setSelectedNeighbours(complexes);
    }, [complexes]);

    // current demand's decoded shapes
    const shapeData = useMemo(
        () =>
            shapes
                .map(decodeShape)
                .filter((decoded) => !!decoded) as ShapeData[],
        [shapes]
    );

    const [getClosestQuery] = useLazyGetClosestQuery();
    const [getHierarchy] = useLazyGetHierarchyByAreaIdQuery();

    const [zoom, setZoom] = useState<number>(ZOOM_LEVELS.REGION);

    const [mainMarker, setMainMarker] = useState({
        lat: 37.98381,
        lng: 23.727539,
    });

    const getClosest = useCallback(
        async (lat: number, lng: number) => {
            const { data: closest } = await getClosestQuery({
                latitude: lat,
                longitude: lng,
            });

            if (!closest) return;

            // update slice
            if (closest.level === 2) {
                setZoom(ZOOM_LEVELS.MUNICIP);

                setValue(regionsName, [closest.parentID.toString()]);
                setValue(citiesName, [closest.areaID.toString()]);
            } else if (closest.level === 3) {
                setZoom(ZOOM_LEVELS.NEIGHB);

                const neighbId = closest.areaID;
                const municipId = closest.parentID;

                setValue(complexesName, [neighbId.toString()]);
                setValue(citiesName, [municipId.toString()]);

                // For region
                getHierarchy(municipId)
                    .unwrap()
                    .then((municipHierarchy) => {
                        const regionId = municipHierarchy.parentID;
                        if (!regionId) return;

                        setValue(regionsName, [regionId.toString()]);
                    })
                    .catch((reason) => console.log("getHierarchy: ", reason));
            }
        },
        [regionsName, citiesName, complexesName]
    );

    const handleDraw = (s: DrawShape | StopDraw) => {
        if (!s) setValue(shapesName, []); // clear
        else {
            const encoded = encodeShape(s);
            setValue(shapesName, [...watch(shapesName), encoded]); // add
        }
    };
    const handleShapeChange = useDebouncedCallback(
        useCallback(
            (encodedOldShape: string, encodedNewShape: string) => {
                const updatedShapes = shapes.map((shapeString) =>
                    shapeString === encodedOldShape
                        ? encodedNewShape
                        : shapeString
                );

                setValue(shapesName, updatedShapes);
            },
            [shapesName, shapes]
        ),
        100
    );

    const updateMainMarkerCoordinates = useCallback(
        (lat: number, lng: number) => setMainMarker({ lat, lng }),
        []
    );

    //
    // Map
    //
    const handleMapClick = (lat: number, lng: number) => {
        if (!lat || !lng) return;

        getClosest(lat, lng);
        updateMainMarkerCoordinates(lat, lng);
    };
    const handleMarkerDragEnd = (
        marker: IMapMarker,
        newLat: number,
        newLng: number
    ) => {
        if (!marker || marker !== mainMarker) return; // we only care about mainMarker drag

        getClosest(newLat, newLng);
        updateMainMarkerCoordinates(newLat, newLng);
    };
    const handleSearchSelect = (
        address: IMapAddress,
        lat: number,
        lng: number
    ) => {
        if (!lat || !lng) return;

        getClosest(lat, lng);
        updateMainMarkerCoordinates(lat, lng);
    };

    const handleRegionChange = useCallback(
        (regions: string[]) => {
            setSelectedRegions(regions);
            setValue(regionsName, regions); // Update form value
        },
        [regionsName]
    );

    const handleMunicipChange = useCallback(
        (municipCodes: string[], lat?: number, lng?: number) => {
            if (lat && lng) {
                updateMainMarkerCoordinates(lat, lng);
                setZoom(ZOOM_LEVELS.MUNICIP);
            }

            // update form value
            setSelectedMunicipalities(municipCodes);
            setValue(citiesName, municipCodes);
        },
        [citiesName]
    );

    const handleNeighbourChange = useCallback(
        (neighbourCodes: string[], lat?: number, lng?: number) => {
            if (lat && lng) {
                updateMainMarkerCoordinates(lat, lng);
                setZoom(ZOOM_LEVELS.NEIGHB);
            }

            // update form value
            setSelectedNeighbours(neighbourCodes);
            setValue(complexesName, neighbourCodes);
        },
        [complexesName]
    );

    const regionCode = useMemo(
        () => selectedRegions.join(","),
        [selectedRegions]
    );
    const municipCodes = useMemo(
        () => selectedMunicipalities,
        [selectedMunicipalities]
    );
    const neighbourCodes = useMemo(
        () => selectedNeighbours,
        [selectedNeighbours]
    );

    return (
        <>
            <SpaceBetween py={1} alignItems="center">
                <Typography variant="h6">{t("Area of Preference")}</Typography>

                {/* For many shapes center */}
                {shapeData.length > 1 ? (
                    <Suspense>
                        <NextShapeCenter
                            shapes={shapeData}
                            onChange={setMainMarker}
                        />
                    </Suspense>
                ) : null}
            </SpaceBetween>

            {shapeData.length > 0 ? (
                <AutoCenter shape={shapeData[0]} onCenter={setMainMarker} />
            ) : null}

            <Box>
                <Box height={`calc(100vh - 266px)`} width={1}>
                    <Map
                        key={index}
                        zoom={zoom}
                        search
                        multipleShapes
                        mainMarker={mainMarker}
                        shapes={shapeData}
                        onDraw={handleDraw}
                        onShapeChange={handleShapeChange}
                        onDragEnd={handleMarkerDragEnd}
                        onClick={handleMapClick}
                        onSearchSelect={handleSearchSelect}
                    />
                </Box>
            </Box>

            <Grid container spacing={2} p={1}>
                <Grid item xs={4}>
                    <RegionSelectDemands
                        selectedRegions={selectedRegions}
                        onChange={handleRegionChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <MunicipSelectDemands
                        regionCodes={selectedRegions}
                        municipCodes={municipCodes || []}
                        onChange={handleMunicipChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <NeighbourSelectDemands
                        municipCodes={selectedMunicipalities}
                        neighbourCodes={neighbourCodes || []}
                        onChange={handleNeighbourChange}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default AreaOfPreference;
