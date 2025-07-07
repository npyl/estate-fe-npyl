import { TSortByOptions } from "@/ui/Filters/SortBy";
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
        value: "FIRST_NAME_ASC",
        label: t("FIRST_NAME_ASC"),
        sorting: {
            sortBy: "firstName",
            direction: "ASC",
        },
        icon: "mdi:sort-alphabetical-ascending",
    },
    {
        value: "FIRST_NAME_DESC",
        label: t("FIRST_NAME_DESC"),
        sorting: {
            sortBy: "firstName",
            direction: "DESC",
        },
        icon: "mdi:sort-alphabetical-descending",
    },

    {
        value: "LAST_NAME_ASC",
        label: t("LAST_NAME_ASC"),
        sorting: {
            sortBy: "lastName",
            direction: "ASC",
        },
        icon: "mdi:sort-alphabetical-ascending",
    },
    {
        value: "LAST_NAME_DESC",
        label: t("LAST_NAME_DESC"),
        sorting: {
            sortBy: "lastName",
            direction: "DESC",
        },
        icon: "mdi:sort-alphabetical-descending",
    },

    {
        value: "LAST_ENTRY",
        label: t("Last entry"),
        sorting: {
            sortBy: "createdAt",
            direction: "DESC",
        },
        icon: "mdi:clock-outline",
    },
    {
        value: "PRICE_DESC",
        label: t("Price (expensive first)"),
        sorting: {
            sortBy: "budget",
            direction: "DESC",
        },
        icon: "ant-design:euro-outlined",
    },
    {
        value: "PRICE_ASC",
        label: t("Price (cheap first)"),
        sorting: {
            sortBy: "budget",
            direction: "ASC",
        },
        icon: "ant-design:euro-outlined",
    },
    {
        value: "RATING_DESC",
        label: t("Rating (highest first)"),
        sorting: {
            sortBy: "rating",
            direction: "DESC",
        },
        icon: "teenyicons:star-outline",
    },
];
