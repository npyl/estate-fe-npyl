import { TSortByOptions } from "@/components/Filters/SortBy";
import { TranslationType } from "@/types/translation";

export const getOptions = (t: TranslationType): TSortByOptions => [
    {
        value: "default",
        label: t("Default Sorting"),
        sorting: {
            sortBy: "updatedAt",
            direction: "DESC",
        },
    },
    {
        value: "Ascending_Price",
        label: t("Rising Price"),
        sorting: {
            sortBy: "price",
            direction: "ASC",
        },
    },
    {
        value: "Descending_Price",
        label: t("Falling Price"),
        sorting: {
            sortBy: "price",
            direction: "DESC",
        },
    },
    {
        value: "Ascending_Area",
        label: t("Rising Area"),
        sorting: {
            sortBy: "area",
            direction: "ASC",
        },
    },
    {
        value: "Descending_Area",
        label: t("Falling Area"),
        sorting: {
            sortBy: "area",
            direction: "DESC",
        },
    },
    {
        value: "Ascending_Popularity",
        label: t("Rising Popularity"),
        sorting: {
            sortBy: "visitors",
            direction: "ASC",
        },
    },
    {
        value: "Descending_Popularity",
        label: t("Falling Popularity"),
        sorting: {
            sortBy: "visitors",
            direction: "DESC",
        },
    },
];
