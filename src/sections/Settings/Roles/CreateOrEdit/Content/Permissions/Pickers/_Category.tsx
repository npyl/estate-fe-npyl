import { Checkbox, ListSubheader, MenuItem } from "@mui/material";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useGlobals } from "@/sections/useGlobals";
import { KeyValue } from "src/types/KeyValue";
import Select, { SelectChangeEvent, SelectProps } from "@/components/Select";
import { TranslationType } from "@/types/translation";

// TODO: move into @/ui/Pickers
// Replace respective CategoryPicker to support:
//  - 1) single
//  - 2) multiple
//  - w/ or w/o checkbox

// ------------------------------------------------------------------------------

const getOption =
    (parentCategory: string, value: string[]) => (o: KeyValue) => (
        <MenuItem key={`${parentCategory}_${o.key}`} value={o.key}>
            <Checkbox checked={value.includes(o.key)} />
            {o.value}
        </MenuItem>
    );

// ------------------------------------------------------------------------------

const getSection =
    (t: TranslationType, subCategoriesMap: any, value: string[]) =>
    (parentCategory: string) => [
        <ListSubheader key={`header_${parentCategory}`}>
            {t(parentCategory)}
        </ListSubheader>,
        ...subCategoriesMap[parentCategory].map(
            getOption(parentCategory, value)
        ),
    ];

// ------------------------------------------------------------------------------

interface CategoryPickerProps extends Omit<SelectProps, "value" | "onChange"> {
    parentCategories: string[];

    value: string[];
    onChange: (s: string[]) => void;
}

const CategoryPicker: FC<CategoryPickerProps> = ({
    parentCategories = [],
    value = [],
    onChange: _onChange,
}) => {
    const { t } = useTranslation();

    const data = useGlobals();

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

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        _onChange(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };
    const isDisabled = parentCategories.length === 0;

    return (
        <Select
            multiple
            disabled={isDisabled}
            value={value}
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
            {parentCategories.map(getSection(t, subCategoriesMap, value))}
        </Select>
    );
};

export type { CategoryPickerProps };
export default CategoryPicker;
