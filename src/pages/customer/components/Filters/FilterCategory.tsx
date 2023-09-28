import {
    Box,
    Checkbox,
    FormControl,
    InputLabel,
    ListSubheader,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGlobals } from "src/hooks/useGlobals";
import {
    selectCategories,
    selectParentCategories,
    setCategories,
} from "src/slices/customer/filters";

import { useDispatch, useSelector } from "src/store";
import { KeyValue } from "src/types/KeyValue";

export default function FilterCategory() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const data = useGlobals();

    const propertyEnums = data?.property;

    const parentCategories = useSelector(selectParentCategories) || [];
    const subCategories = useSelector(selectCategories) || [];

    const subCategoriesMap: {
        [key: string]: KeyValue[];
    } = {
        RESIDENTIAL: propertyEnums?.residentialCategory ?? [],
        COMMERCIAL: propertyEnums?.commercialCategory ?? [],
        LAND: propertyEnums?.landCategory ?? [],
        OTHER: propertyEnums?.otherCategory ?? [],
    };

    if (!propertyEnums || parentCategories.length === 0) return null;

    const handleChange = (event: SelectChangeEvent<typeof subCategories>) => {
        const {
            target: { value },
        } = event;

        dispatch(
            setCategories(
                // On autofill we get a stringified value.
                typeof value === "string" ? value.split(",") : value
            )
        );
    };

    return (
        <FormControl sx={{ minWidth: "130px", maxWidth: "130px" }}>
            <InputLabel>{t("Category")}</InputLabel>
            <Select
                multiple
                value={subCategories}
                onChange={handleChange}
                renderValue={(selected) => selected.join(", ")}
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
