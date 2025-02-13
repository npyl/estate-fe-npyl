import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { KeyValue } from "@/types/KeyValue";
import { Select } from "src/components/hook-form";
import { useWatch } from "react-hook-form";
import useEnums from "./useEnums";

const CategorySelect = () => {
    const { t } = useTranslation();

    const { propertyEnums } = useEnums();

    const parentCategory = useWatch({ name: "parentCategory" }) || "";

    const subCategoriesMap: {
        [key: string]: KeyValue[];
    } = useMemo(
        () => ({
            RESIDENTIAL: propertyEnums?.residentialCategory || [],
            COMMERCIAL: propertyEnums?.commercialCategory || [],
            LAND: propertyEnums?.landCategory || [],
            OTHER: propertyEnums?.otherCategory || [],
        }),
        [propertyEnums]
    );

    const categories = useMemo(
        () => subCategoriesMap[parentCategory!] || [],
        [subCategoriesMap, parentCategory]
    );

    return (
        <Select
            disabled={!parentCategory}
            label={t("Category")}
            name="category"
            options={categories}
        />
    );
};

export default CategorySelect;
