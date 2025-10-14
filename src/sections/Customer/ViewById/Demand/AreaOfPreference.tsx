import { Box } from "@mui/material";
import { FC, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Map from "@/components/Map";
import { useGetMunicipalitiesQuery } from "@/services/location";
import { IDemand } from "@/types/demand";
import toNumberSafe from "@/utils/toNumberSafe";
import ViewLocationMini from "./ViewLocationMini";
import { getShapeCenter } from "@/components/Map/util";
import Panel from "@/components/Panel";

interface AreaOfPreferenceProps {
    demand?: IDemand;
}

const AreaOfPreferenceDemands: FC<AreaOfPreferenceProps> = ({ demand }) => {
    const { t } = useTranslation();

    const demandFilters = useMemo(
        () => demand?.filters || null,
        [demand?.filters]
    );

    const shapes = demand?.shapeList;

    const shapeData0 = useMemo(() => shapes?.[0], [shapes?.[0]]);

    const regions = useMemo(
        () => demandFilters?.regions || [],
        [demandFilters?.regions]
    );
    const cities = useMemo(
        () => demandFilters?.cities || [],
        [demandFilters?.cities]
    );
    const complexes = useMemo(
        () => demandFilters?.complexes || [],
        [demandFilters?.complexes]
    );

    const iRegion0 = toNumberSafe(regions[0]);

    const { data: municips } = useGetMunicipalitiesQuery(iRegion0, {
        skip: iRegion0 !== -1,
    });

    const onReady = useCallback(
        (map: google.maps.Map) => {
            if (!map) return;

            if (shapeData0) {
                // Center the map to the first point in the shape
                const center = getShapeCenter(shapeData0);
                if (!center) return;

                const { lat, lng } = center;

                map.setCenter(new google.maps.LatLng(lat, lng));
            } else {
                if (!cities[0]) return;
                const city = municips?.filter(
                    (m) => m.areaID === +cities[0]
                )[0];

                map.setCenter(
                    new google.maps.LatLng(city?.latitude!, city?.longitude)
                );

                map.setZoom(12);
            }
        },
        [shapeData0]
    );

    return (
        <Panel
            label={t("Area of Preference")}
            paperSx={{ p: 0 }}
            childrenSx={{ p: 0 }}
        >
            <ViewLocationMini
                regionCodes={regions}
                cityCodes={cities}
                complexCodes={complexes}
            />
            <Box height={`calc(100vh - 266px)`} width={1}>
                <Map
                    zoom={12}
                    drawing={false}
                    shapes={shapes}
                    onReady={onReady}
                />
            </Box>
        </Panel>
    );
};

export default AreaOfPreferenceDemands;
