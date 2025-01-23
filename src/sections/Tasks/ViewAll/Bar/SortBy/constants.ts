import { TSortByOptions } from "@/sections/Filters/SortBy";
import { TranslationType } from "@/types/translation";

const getOptions = (t: TranslationType): TSortByOptions => [
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
        value: "DATE_NEW_FIRST",
        label: t("Date (new first)"),
        sorting: {
            sortBy: "createdAt",
            direction: "DESC",
        },
        icon: "mdi:clock-outline",
    },
    {
        value: "DATE_OLD_FIRST",
        label: t("Date (old first)"),
        sorting: {
            sortBy: "createdAt",
            direction: "ASC",
        },
        icon: "mdi:clock-outline",
    },
];

export { getOptions };
