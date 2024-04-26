import { TranslationType } from "@/types/translation";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const getOptions = (t: TranslationType) => [
    { value: "default", label: t("Default Sorting") },
    {
        value: "Ascending_Price",
        label: t("Rising Price"),
    },
    {
        value: "Descending_Price",
        label: t("Falling Price"),
    },
    {
        value: "Ascending_Area",
        label: t("Rising Area"),
    },
    {
        value: "Descending_Area",
        label: t("Falling Area"),
    },
    {
        value: "Ascending_Popularity",
        label: t("Rising Popularity"),
    },
    {
        value: "Descending_Popularity",
        label: t("Falling Popularity"),
    },
];

export const useSortingOptions = () => {
    const { t } = useTranslation();
    const options = useMemo(() => getOptions(t), [t]);
    return options;
};
