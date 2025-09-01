import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { KeyValue } from "@/types/KeyValue";
import { Select } from "src/components/hook-form";
import { useWatch } from "react-hook-form";
import { useGlobals } from "@/sections/useGlobals";

interface Props {
    name: string;
}

const RHFCategorySelect: FC<Props> = ({ name }) => {
    const { t } = useTranslation();

    const propertyEnums = useGlobals()?.property;

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
            isEnum
            disabled={!parentCategory}
            label={t("Category")}
            name={name}
            options={categories}
        />
    );
};

export default RHFCategorySelect;
