import {
    Checkbox,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { useAllGlobalsQuery } from "src/services/global";
import { useTranslation } from "react-i18next";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import {
    selectParentCategories,
    setParentCategories,
} from "src/slices/customer/filters";
type FilterVariant = "property" | "customer";
interface FilterCategoryProps {
    variant: FilterVariant;
    parentCategories: string[];
    setParentCategories: ActionCreatorWithPayload<any, string>;
}
export default function CategoryForCustomerSelect() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const parentCategories = useSelector(selectParentCategories);

    const { data } = useAllGlobalsQuery();

    const propertyEnums = data?.property;
    const parentCategoryEnums = propertyEnums?.parentCategory;

    if (!data) return null;

    const handleChange = (
        event: SelectChangeEvent<typeof parentCategories>
    ) => {
        const {
            target: { value },
        } = event;
        dispatch(
            setParentCategories(
                // On autofill we get a stringified value.
                typeof value === "string" ? value.split(",") : value
            )
        );
    };

    return (
        <FormControl sx={{ minWidth: "130px", maxWidth: "130px" }}>
            <InputLabel id="demo-simple-select-label">
                {t("Categories")}
            </InputLabel>
            <Select
                multiple
                labelId="demo-simple-select-label"
                value={parentCategories}
                onChange={handleChange}
                renderValue={(selected) => selected.join(", ")}
                input={<OutlinedInput label={t("Categories")} />}
                MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
            >
                {parentCategoryEnums!.map((option) => {
                    return (
                        <MenuItem key={option} value={option}>
                            <Checkbox
                                checked={
                                    parentCategories &&
                                    parentCategories.length > 0 &&
                                    parentCategories.indexOf(option) > -1
                                }
                            />

                            {option}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}
