import {
    Checkbox,
    FormControl,
    InputLabel,
    ListSubheader,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useGlobals } from "@/hooks/useGlobals";
import { KeyValue } from "@/types/KeyValue";
import {
    useCategories,
    useFiltersContext,
    useParentCategories,
} from "../Context";

export default function FilterCategory() {
    const { t } = useTranslation();
    const data = useGlobals();

    const propertyEnums = data?.property;

    const { setCategories } = useFiltersContext();
    const parentCategories = useParentCategories() || [];
    const subCategories = useCategories() || [];

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

    const handleChange = (event: SelectChangeEvent<typeof subCategories>) => {
        const {
            target: { value },
        } = event;

        setCategories(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    const isDisabled = parentCategories.length === 0;

    return (
        <FormControl sx={{ minWidth: "220px" }}>
            <InputLabel>{t("Category")}</InputLabel>
            <Select
                multiple
                disabled={isDisabled}
                value={subCategories}
                onChange={handleChange}
                renderValue={(selected: string[]) => {
                    return selected
                        .map((key) => {
                            for (const parentCategory of parentCategories) {
                                const found = subCategoriesMap[
                                    parentCategory
                                ].find((item) => item.key === key);
                                if (found) {
                                    return t(found.value);
                                }
                            }
                            return null;
                        })
                        .filter(Boolean)
                        .join(", ");
                }}
                input={<OutlinedInput label={t("Category")} />}
                MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
            >
                {parentCategories.map((parentCategory) => [
                    <ListSubheader key={`header_${parentCategory}`}>
                        {parentCategory}
                    </ListSubheader>,
                    ...subCategoriesMap[parentCategory].map(
                        ({ key, value }) => (
                            <MenuItem
                                key={`${parentCategory}_${key}`}
                                value={key}
                            >
                                <Checkbox
                                    checked={subCategories.indexOf(key) > -1}
                                />
                                {t(value)}
                            </MenuItem>
                        )
                    ),
                ])}
            </Select>
        </FormControl>
    );
}
