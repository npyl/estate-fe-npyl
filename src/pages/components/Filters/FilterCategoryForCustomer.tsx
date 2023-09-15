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
import {
    selectParentCategories,
    setParentCategories,
} from "src/slices/filters";

import { useAllGlobalsQuery } from "src/services/global";
import { useTranslation } from "react-i18next";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
type FilterVariant = "property" | "customer";
interface FilterCategoryProps {
    variant: FilterVariant;
    parentCategories: string[];
    setParentCategories: ActionCreatorWithPayload<any, string>;
}
export default function CategoryForCustomerSelect(props: FilterCategoryProps) {
    const {
        variant = "customer",
        parentCategories,
        setParentCategories,
    } = props;
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const categories = useSelector(selectParentCategories);

    const { data } = useAllGlobalsQuery();
    const propertyEnums = data?.property;
    const categoryEnums = propertyEnums?.parentCategory;

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
                value={categories}
                onChange={handleChange}
                renderValue={(selected) => selected.join(", ")}
                input={<OutlinedInput label={t("Categories")} />}
                MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
            >
                {categoryEnums!.map((option) => {
                    return (
                        <MenuItem key={option} value={option}>
                            <Checkbox
                                checked={
                                    categories &&
                                    categories.length > 0 &&
                                    categories.indexOf(option) > -1
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
