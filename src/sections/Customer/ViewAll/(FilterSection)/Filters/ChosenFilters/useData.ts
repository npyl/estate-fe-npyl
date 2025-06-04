import { TranslationType } from "@/types/translation";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getChangedFields } from "@/slices/customer/filters";
import { Tags } from "./types";

const getFilterTags = (t: TranslationType): Tags => ({
    status: {
        label: t("Status"),
    },
    labels: {
        label: t("Labels"),
    },
    leaser: {
        label: t("Leaser"),
    },
    seller: {
        label: t("Seller"),
    },
    buyer: {
        label: t("Buyer"),
    },
    lessor: {
        label: t("Lessor"),
    },
    minPrice: {
        label: t("Minimum Price"),
    },
    maxPrice: {
        label: t("Maximun Price"),
    },
    minArea: {
        label: t("Minimum Covered Area"),
    },
    maxArea: {
        label: t("Maximun Covered Area"),
    },
    managerId: {
        label: t("Managed By"),
    },

    parentCategories: {
        label: t("Parent Categories"),
    },
    categories: {
        label: t("Categories"),
    },
});

const getPairFilterTags = (t: TranslationType): Tags => ({
    minMaxPrice: {
        label: t("Price (€)"),
    },
    minMaxArea: {
        label: t("Area (m²)"),
    },
});

const useData = () => {
    const { t } = useTranslation();
    const filterTags = useMemo(() => getFilterTags(t), [t]);
    const pairFilterTags = useMemo(() => getPairFilterTags(t), [t]);
    const changedProps = useSelector(getChangedFields);
    return { filterTags, pairFilterTags, changedProps };
};

export default useData;
