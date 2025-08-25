import { Checkbox, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGlobals } from "src/hooks/useGlobals";
import { useFiltersContext, useParentCategories } from "../../FiltersContext";
import Select, { SelectChangeEvent } from "@/components/Select";

export default function FilterParentCategory() {
    const { t } = useTranslation();
    const data = useGlobals();

    const categories = useParentCategories();
    const { setParentCategories } = useFiltersContext();

    const propertyEnums = data?.property;
    const categoryEnums = propertyEnums?.parentCategory || [];

    const handleChange = (event: SelectChangeEvent<typeof categories>) => {
        const {
            target: { value },
        } = event;
        setParentCategories(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    return (
        <Select
            multiple
            value={categories}
            onChange={handleChange}
            formControlProps={{
                sx: { minWidth: "200px", maxWidth: "200px" },
            }}
            renderValue={(selected: string[]) => {
                return selected
                    .map(
                        (key) =>
                            categoryEnums.find((item) => item.key === key)
                                ?.value
                    )
                    .filter(Boolean)
                    .join(", ");
            }}
            label={t("Parent Category")}
            MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
        >
            {categoryEnums.map(({ key, value }) => (
                <MenuItem key={key} value={key}>
                    <Checkbox
                        checked={
                            categories &&
                            categories.length > 0 &&
                            categories.indexOf(key) > -1
                        }
                    />
                    {value}
                </MenuItem>
            ))}
        </Select>
    );
}
