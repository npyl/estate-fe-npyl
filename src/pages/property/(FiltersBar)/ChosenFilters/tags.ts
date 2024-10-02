import { TranslationType } from "@/types/translation";
import { TTags } from "./types";

const getFilterTags = (t: TranslationType): TTags => ({
    regions: {
        label: t("Regions"),
    },
    cities: {
        label: t("Cities"),
    },
    filterName: {
        label: t("Filter Name"),
    },
    code: {
        label: t("Code"),
    },
    minPrice: {
        label: t("Minimum Price"),
    },
    maxPrice: {
        label: t("Maximum Price"),
    },
    minArea: {
        label: t("Minimum Area"),
    },
    maxArea: {
        label: t("Maximum Area"),
    },
    minBedrooms: {
        label: t("Minimum Number of Bedrooms"),
    },
    maxBedrooms: {
        label: t("Maximum Number of Bedrooms"),
    },
    minFloor: {
        label: t("Minimum Floor"),
    },
    maxFloor: {
        label: t("Maximum Floor"),
    },
    minConstructionYear: {
        label: t("Minimum Constuction Year"),
    },
    maxConstructionYear: {
        label: t("Maximum Construction Year"),
    },
    heatingType: {
        label: t("Heating Type"),
    },
    frameType: {
        label: t("Frame Type"),
    },
    furnished: {
        label: t("Furnished"),
    },
    managerId: {
        label: t("Manager"),
    },
    states: {
        label: t("State"),
    },
    parentCategories: {
        label: t("Category"),
    },
    categories: {
        label: t("Subcategory"),
    },
    labels: {
        label: t("Labels"),
    },
    active: {
        label: t("Active"),
    },
});

const getPairFilterTags = (t: TranslationType): TTags => ({
    minMaxPrice: {
        label: t("Price (€)"),
    },
    minMaxArea: {
        label: t("Area (m²)"),
    },
    minMaxBedrooms: {
        label: t("Bedrooms"),
    },
    minMaxFloor: {
        label: t("Floor"),
    },
    minMaxConstructionYear: {
        label: t("Construction Year"),
    },
});

export { getFilterTags, getPairFilterTags };
