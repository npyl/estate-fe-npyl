import { useLazyGetMunicipalitiesQuery } from "@/services/location";
import { selectCities, selectRegions } from "@/slices/filters";
import Chip from "@mui/material/Chip";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ChipLabel from "./ChipLabel";
import { IGeoLocation } from "@/types/geolocation";

const getNames = async (
    promises: Promise<IGeoLocation[]>[],
    cityIDs: string[],
    lng: string
) => {
    try {
        const allCities = (await Promise.all(promises)).flat();
        const filteredCities = allCities.filter(({ areaID }) =>
            cityIDs.includes(areaID.toString())
        );
        const names = filteredCities
            .map(({ nameEN, nameGR }) => (lng === "en" ? nameEN : nameGR))
            .join(", ");

        return names;
    } catch (ex) {
        return "";
    }
};

const Cities = () => {
    const { t, i18n } = useTranslation();
    const [getMunicips] = useLazyGetMunicipalitiesQuery();

    const regionIDs = useSelector(selectRegions) || [];
    const cityIDs = useSelector(selectCities) || [];

    const [names, setNames] = useState("");

    useEffect(() => {
        const promises = regionIDs.map((id) => getMunicips(+id).unwrap());
        getNames(promises, cityIDs, i18n.language).then(setNames);
    }, [regionIDs, cityIDs, i18n.language]);

    return <Chip label={<ChipLabel title={t("Cities")} value={names} />} />;
};

export default Cities;
