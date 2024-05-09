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
];
