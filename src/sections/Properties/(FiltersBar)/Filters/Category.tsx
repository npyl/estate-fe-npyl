import { Checkbox, ListSubheader, MenuItem } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useGlobals } from "@/sections/useGlobals";
import { KeyValue } from "src/types/KeyValue";
import {
    useFiltersContext,
    useParentCategories,
    useSubCategories,
} from "../../FiltersContext";
import Select, { SelectChangeEvent } from "@/components/Select";

export default function FilterCategory() {
    const { t } = useTranslation();

    const data = useGlobals();

    const parentCategories = useParentCategories() || [];
    const subCategories = useSubCategories() || [];
    const propertyEnums = data?.property;

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

    const getSubCategoryValue = (key: string) => {
        for (let parentCategory of parentCategories) {
            const found = subCategoriesMap[parentCategory].find(
                (item) => item.key === key
            );
            if (found) return found.value;
        }
    };

    const { setSubCategories } = useFiltersContext();
    const handleChange = (event: SelectChangeEvent<typeof subCategories>) => {
        const {
            target: { value },
        } = event;
        setSubCategories(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };
    const isDisabled = parentCategories.length === 0;

    return (
        <Select
            multiple
            disabled={isDisabled}
            value={subCategories}
            onChange={handleChange}
            formControlProps={{
                sx: { minWidth: "160px", maxWidth: "190px" },
            }}
            renderValue={(selected: string[]) => {
                return selected
                    .map(getSubCategoryValue)
                    .filter(Boolean) // Remove any undefined values
                    .join(", ");
            }}
            label={t("Category")}
            MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
        >
            {parentCategories.map((parentCategory) => [
                <ListSubheader key={`header_${parentCategory}`}>
                    {t(parentCategory)}
                </ListSubheader>,
                ...subCategoriesMap[parentCategory].map(({ key, value }) => (
                    <MenuItem key={`${parentCategory}_${key}`} value={key}>
                        <Checkbox checked={subCategories.indexOf(key) > -1} />
                        {value}
                    </MenuItem>
                )),
            ])}
        </Select>
    );
}
