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
import { useGlobals } from "src/hooks/useGlobals";
import {
    selectParentCategories,
    selectSubCategories,
    setSubCategories,
} from "src/slices/filters";
import { useDispatch, useSelector } from "src/store";
import { KeyValue } from "src/types/KeyValue";

export default function FilterCategory() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const data = useGlobals();

    const parentCategories = useSelector(selectParentCategories) || [];
    const subCategories = useSelector(selectSubCategories);
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

    const handleChange = (event: SelectChangeEvent<typeof subCategories>) => {
        const {
            target: { value },
        } = event;
        dispatch(
            setSubCategories(
                // On autofill we get a stringified value.
                typeof value === "string" ? value.split(",") : value
            )
        );
    };
    const isDisabled = parentCategories.length === 0;

    return (
        <FormControl sx={{ minWidth: "160px", maxWidth: "190px" }}>
            <InputLabel>{t("Category")}</InputLabel>
            <Select
                multiple
                disabled={isDisabled}
                value={subCategories}
                onChange={handleChange}
                renderValue={(selected: string[]) => {
                    return selected
                        .map(getSubCategoryValue)
                        .filter(Boolean) // Remove any undefined values
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
                                {value}
                            </MenuItem>
                        )
                    ),
                ])}
            </Select>
        </FormControl>
    );
}
