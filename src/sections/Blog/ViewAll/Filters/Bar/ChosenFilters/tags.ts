import { TranslationType } from "@/types/translation";
import { TTags } from "./types";

const getFilterTags = (t: TranslationType): TTags => ({
    search: {
        label: t("Search"),
    },
    published: {
        label: t("State"),
    },
    sites: {
        label: t("Public Sites"),
    },
    users: {
        label: t("Users"),
    },
});

export { getFilterTags };
