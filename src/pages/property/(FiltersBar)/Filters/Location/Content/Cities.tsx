import {
    useGetMunicipalitiesQuery,
    useGetRegionsQuery,
} from "@/services/location";
import { useSelector } from "react-redux";
import { selectCities, selectRegions, setCities } from "@/slices/filters";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import { IGeoLocation } from "@/types/geolocation";
import CustomMenuItem from "./CustomMenuItem";
import Skeleton from "./Skeleton";
import { useDispatch } from "react-redux";
import React from "react";
import withSearch from "./withSearch";

// --------------------------------------------------------------------

const MunicipOption: FC<IGeoLocation> = (o) => {
    const dispatch = useDispatch();

    const cities = useSelector(selectCities);

    const handleClick = (areaID: number) => {
        const newValues = cities.includes(areaID.toString())
            ? cities.filter((id) => id !== areaID.toString())
            : [...cities, areaID.toString()];
        dispatch(setCities(newValues));
    };

    return (
        <CustomMenuItem
            key={o.areaID}
            checked={cities.indexOf(o.areaID.toString()) > -1}
            onClick={handleClick}
            {...o}
        />
    );
};

const getMunicipOption = (g: IGeoLocation) => (
    <MunicipOption key={g.areaID} {...g} />
);

// --------------------------------------------------------------------

interface SectionProps {
    parentID: number;
    search: string;
}

const MunicipalitiesSection: FC<SectionProps> = ({ parentID, search }) => {
    const { i18n } = useTranslation();
    const { data: regionsOptions } = useGetRegionsQuery();
    const { data, isLoading } = useGetMunicipalitiesQuery(parentID);

    const municipsOptions = useMemo(
        () => data?.filter(withSearch(search)),
        [data, search]
    );

    const title = useMemo(() => {
        const o = regionsOptions?.find(({ areaID }) => areaID === parentID);
        return i18n.language === "en" ? o?.nameEN : o?.nameGR;
    }, [i18n.language, regionsOptions]);

    return (
        <>
            <Typography px={3} color="textSecondary">
                {title}
            </Typography>
            {municipsOptions?.map(getMunicipOption)}

            {/* Skeletons */}
            {isLoading ? <Skeleton /> : null}
        </>
    );
};

const getMunicipalitiesSection = (search: string) => (areaID: string) =>
    <MunicipalitiesSection key={areaID} parentID={+areaID} search={search} />;

// --------------------------------------------------------------------

interface Props {
    search: string;
}

const CitiesTab: FC<Props> = ({ search }) => {
    const regions = useSelector(selectRegions) || [];
    return regions?.map(getMunicipalitiesSection(search));
};

export default React.memo(CitiesTab);
