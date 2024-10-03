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
}

const MunicipalitiesSection: FC<SectionProps> = ({ parentID }) => {
    const { i18n } = useTranslation();
    const { data: regionsOptions } = useGetRegionsQuery();
    const { data: municipsOptions, isLoading } =
        useGetMunicipalitiesQuery(parentID);

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

const getMunicipalitiesSection = (areaID: string) => (
    <MunicipalitiesSection key={areaID} parentID={+areaID} />
);

// --------------------------------------------------------------------

const CitiesTab = () => {
    const regions = useSelector(selectRegions) || [];
    return regions?.map(getMunicipalitiesSection);
};

export default CitiesTab;
