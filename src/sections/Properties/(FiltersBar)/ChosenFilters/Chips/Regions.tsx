import { useGetRegionsQuery } from "@/services/location";
import { resetRegions, selectRegions } from "@/slices/filters";
import { IGeoLocation } from "@/types/geolocation";
import Chip from "@mui/material/Chip";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ChipLabel from "./ChipLabel";
import { useDispatch } from "react-redux";

const idToName = (all: IGeoLocation[], lng: string) => (id: string) => {
    const got = all.find(({ areaID }) => areaID === +id);
    return (lng === "en" ? got?.nameEN : got?.nameGR) || "";
};

const Regions = () => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const { data: regions } = useGetRegionsQuery();
    const areaIDs = useSelector(selectRegions);

    const names = useMemo(
        () => areaIDs.map(idToName(regions || [], i18n.language)).join(", "),
        [i18n.language, areaIDs, regions]
    );

    const handleClear = () => dispatch(resetRegions());

    return (
        <Chip
            label={<ChipLabel title={t("Regions")} value={names} />}
            onDelete={handleClear}
        />
    );
};

export default Regions;
