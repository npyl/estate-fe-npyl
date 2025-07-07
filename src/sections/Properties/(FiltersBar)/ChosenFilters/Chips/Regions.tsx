import { useGetRegionsQuery } from "@/services/location";
import { IGeoLocation } from "@/types/geolocation";
import Chip from "@mui/material/Chip";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import ChipLabel from "@/ui/Filters/ChipLabel";
import {
    useFiltersContext,
    useRegions,
} from "@/sections/Properties/FiltersContext";

const idToName = (all: IGeoLocation[], lng: string) => (id: string) => {
    const got = all.find(({ areaID }) => areaID === +id);
    return (lng === "en" ? got?.nameEN : got?.nameGR) || "";
};

const Regions = () => {
    const { t, i18n } = useTranslation();

    const { data: regions } = useGetRegionsQuery();
    const areaIDs = useRegions();

    const names = useMemo(
        () => areaIDs.map(idToName(regions || [], i18n.language)).join(", "),
        [i18n.language, areaIDs, regions]
    );

    const { resetRegions } = useFiltersContext();

    return (
        <Chip
            label={<ChipLabel title={t("Regions")} value={names} />}
            onDelete={resetRegions}
        />
    );
};

export default Regions;
