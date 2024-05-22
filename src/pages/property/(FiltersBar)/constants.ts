import { TSortByOptions } from "@/components/Filters/SortBy";
import { TranslationType } from "@/types/translation";

export const getOptions = (t: TranslationType): TSortByOptions => [
    {
        value: "default",
        label: t("Last update"),
        sorting: {
            sortBy: "updatedAt",
            direction: "DESC",
        },
        icon: "mdi:clock-outline",
    },
    {
        value: "Ascending_Price",
        label: t("Price (cheap first)"),
        sorting: {
            sortBy: "price",
            direction: "ASC",
        },
        icon: "ant-design:euro-outlined",
    },
    {
        value: "Descending_Price",
        label: t("Price (expensive first)"),
        sorting: {
            sortBy: "price",
            direction: "DESC",
        },
        icon: "ant-design:euro-outlined",
    },
    {
        value: "REGISTRATION",
        label: t("Registration"),
        sorting: {
            sortBy: "createdAt",
            direction: "DESC",
        },
        icon: "mdi:clock-outline",
    },
    {
        value: "Descending_Popularity",
        label: t("Popular (highest first)"),
        sorting: {
            sortBy: "visitors",
            direction: "DESC",
        },
        icon: "teenyicons:star-outline",
    },
    {
        value: "DATE_NEW_FIRST",
        label: t("Date (new first)"),
        sorting: {
            sortBy: "yearOfConstruction",
            direction: "DESC",
        },
        icon: "mdi:clock-outline",
    },
    {
        value: "DATE_OLD_FIRST",
        label: t("Date (old first)"),
        sorting: {
            sortBy: "yearOfConstruction",
            direction: "ASC",
        },
        icon: "mdi:clock-outline",
    },
    {
        value: "Descending_Area",
        label: t("Area (highest first)"),
        sorting: {
            sortBy: "area",
            direction: "DESC",
        },
        icon: "icon-park-outline:sort",
    },
    {
        value: "Ascending_Area",
        label: t("Area (lowest first)"),
        sorting: {
            sortBy: "area",
            direction: "ASC",
        },
        icon: "icon-park-outline:sort",
    },
    {
        value: "PLOT_AREA_DESC",
        label: t("Land area (highest first)"),
        sorting: {
            sortBy: "plotArea",
            direction: "DESC",
        },
        icon: "icon-park-outline:sort",
    },
];
