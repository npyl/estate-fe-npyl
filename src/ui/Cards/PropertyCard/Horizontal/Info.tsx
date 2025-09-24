import { IProperties, IPropertyResultResponse } from "@/types/properties";
import { Stack } from "@mui/material";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TranslationType } from "@/types/translation";
import getEntry, { EntryProps } from "../_shared/getEntry";

const getENTRIES = (
    item: IPropertyResultResponse | IProperties,
    t: TranslationType
): EntryProps[] => {
    const { details, area, plotArea } = item || {};
    const bathrooms = details?.bathrooms;
    const bedrooms = details?.bedrooms;

    return [
        {
            children: bedrooms || "-",
            icon: "las la-bed",
            adornment: t<string>("beds"),
        },
        {
            children: bathrooms || "-",
            icon: "las la-bath",
            adornment: t<string>("baths"),
        },
        {
            children: area || "-",
            icon: "las la-expand-arrows-alt",
            adornment: "m²",
        },

        {
            children: plotArea || "-",
            icon: "las la-chart-area",
            adornment: "m²",
        },
    ];
};

interface InfoProps {
    item: IPropertyResultResponse | IProperties;
}

const Info: FC<InfoProps> = ({ item }) => {
    const { t } = useTranslation();
    const ENTRIES = useMemo(() => getENTRIES(item, t), [t, item]);
    return (
        <Stack spacing={2.5} direction="row" mt={1} flexWrap="wrap">
            {ENTRIES.map(getEntry)}
        </Stack>
    );
};

export default Info;
