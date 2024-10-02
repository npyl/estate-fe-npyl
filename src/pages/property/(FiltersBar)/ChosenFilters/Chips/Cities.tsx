import { useLazyGetMunicipalitiesQuery } from "@/services/location";
import { selectCities } from "@/slices/filters";
import Chip from "@mui/material/Chip";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ChipLabel from "./ChipLabel";
import { IGeoLocation } from "@/types/geolocation";

const Cities = () => {
    const { t, i18n } = useTranslation();

    const [getMunicips] = useLazyGetMunicipalitiesQuery();

    const areaIDs = useSelector(selectCities);

    const [names, setNames] = useState("");

    const getNames = async (
        promises: Promise<IGeoLocation[]>[],
        lng: string
    ) => {
        const res = await Promise.all(promises);

        const names = res
            .flat()
            .map(({ nameEN, nameGR }) => (lng === "en" ? nameEN : nameGR))
            .join(", ");

        console.log("GOT: ", names);

        setNames(names);
    };

    // re-call getNames() when areaIDs change
    useEffect(() => {
        const promises = areaIDs.map((i) => getMunicips(+i).unwrap());
        getNames(promises, i18n.language);
    }, [areaIDs, i18n.language]);

    return <Chip label={<ChipLabel title={t("Cities")} value={names} />} />;
};

export default Cities;
