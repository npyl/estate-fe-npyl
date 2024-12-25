import { useMemo } from "react";
import { KeyValue } from "src/types/KeyValue";
import { Select } from "src/components/hook-form";
import { useWatch } from "react-hook-form";
import useEnums from "./useEnums";
import { useTranslation } from "react-i18next";

const CategorySelect = () => {
    const { t } = useTranslation();

    const { enums } = useEnums();

    const parentCategory = useWatch({ name: "parentCategory" }) || "";

    const subCategoriesMap: {
        [key: string]: KeyValue[];
    } = useMemo(
        () => ({
            RESIDENTIAL: enums?.residentialCategory || [],
            COMMERCIAL: enums?.commercialCategory || [],
            LAND: enums?.landCategory || [],
            OTHER: enums?.otherCategory || [],
        }),
        [enums]
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
