import { IProperties, IPropertyResultResponse } from "@/types/properties";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import Entry, { EntryProps } from "../_shared/getEntry";

const WITH = (onOff: boolean, C: EntryProps[]) => (onOff ? C : []);

const getEntry = ({ children, ...props }: EntryProps) => (
    <Entry key={props.icon} {...props}>
        {children}
    </Entry>
);

const getENTRIES = (
    item: IPropertyResultResponse | IProperties,
    isLand: boolean
): EntryProps[] => {
    const { details, area, plotArea } = item || {};
    const bathrooms = details?.bathrooms;
    const bedrooms = details?.bedrooms;

    return [
        // land & non-land
        {
            children: plotArea || "-",
            icon: "las la-chart-area",
            adornment: "m²",
        },

        // land
        ...WITH(isLand, [
            {
                children: details?.setbackCoefficient || "-",
                icon: "la-divide",
            },
            {
                children: details?.frontage || item?.plotArea || "-",
                icon: "las la-expand-arrows-alt",
                adornment: "m²",
            },
        ]),

        // non land
        ...WITH(!isLand, [
            {
                children: area || "-",
                icon: "las la-expand-arrows-alt",
                adornment: "m²",
            },
            {
                children: bedrooms || item.bedrooms || "-",
                icon: "las la-bed",
            },
            {
                children: bathrooms || item.bathrooms || "-",
                icon: "las la-bath",
            },
        ]),
    ];
};

interface InfoProps {
    item: IPropertyResultResponse | IProperties;
}

const Info: FC<InfoProps> = ({ item }) => {
    const { parentCategory } = item;
    const isLand = parentCategory.key === "LAND";
    const ENTRIES = getENTRIES(item, isLand);
    return (
        <Stack spacing={2} direction="row" flexWrap="nowrap">
            {ENTRIES.map(getEntry)}
        </Stack>
    );
};

export default Info;
