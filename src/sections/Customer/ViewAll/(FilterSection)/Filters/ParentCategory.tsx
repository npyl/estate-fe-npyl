import { Checkbox, MenuItem } from "@mui/material";
import { useGlobals } from "src/hooks/useGlobals";
import { useTranslation } from "react-i18next";
import { useFiltersContext, useParentCategories } from "../Context";
import Select, { SelectChangeEvent } from "@/components/Select";
import { useCallback } from "react";

export default function FilterParentCategory() {
    const { t } = useTranslation();
    const data = useGlobals();

    const { setParentCategories } = useFiltersContext();
    const parentCategories = useParentCategories();

    const propertyEnums = data?.property;
    const parentCategoryEnums = propertyEnums?.parentCategory;

    const handleChange = (
        event: SelectChangeEvent<typeof parentCategories>
    ) => {
        const {
            target: { value },
        } = event;
        setParentCategories(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    const renderValue = useCallback(
        (selected: string[]) => {
            return selected
                .map(
                    (key) =>
                        parentCategoryEnums?.find((item) => item.key === key)
                            ?.value
                )
                .filter(Boolean)
                .join(", ");
        },
        [parentCategoryEnums]
    );

    return (
        <Select
            multiple
            value={parentCategories}
            label={t("Parent Category")}
            formControlProps={{
                sx: { minWidth: "225px", maxWidth: "225px" },
            }}
            onChange={handleChange}
            renderValue={renderValue}
            MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
        >
            {parentCategoryEnums?.map(({ key, value }) => (
                <MenuItem key={key} value={key}>
                    <Checkbox
                        checked={
                            parentCategories &&
                            parentCategories.length > 0 &&
                            parentCategories.indexOf(key) > -1
                        }
                    />
                    {value}
                </MenuItem>
            ))}
        </Select>
    );
}
