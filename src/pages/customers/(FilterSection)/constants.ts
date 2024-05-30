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
        icon: "",
    },

    {
        value: "LAST_ENTRY",
        label: t("Last entry"),
        sorting: {
            sortBy: "createdAt",
            direction: "DESC",
        },
        icon: "",
    },
    {
        value: "PRICE_DESC",
        label: t("Price (expensive first)"),
        sorting: {
            sortBy: "budget",
            direction: "DESC",
        },
        icon: "",
    },
    {
        value: "PRICE_ASC",
        label: t("Price (cheap first)"),
        sorting: {
            sortBy: "budget",
            direction: "ASC",
        },
        icon: "",
    },
    {
        value: "RATING_DESC",
        label: t("Rating (highest first)"),
        sorting: {
            sortBy: "rating",
            direction: "DESC",
        },
        icon: "",
    },
];
