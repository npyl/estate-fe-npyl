import {
    Checkbox,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAllGlobalsQuery } from "src/services/global";
import {
    selectCategories,
    selectParentCategories,
    setCategories,
} from "src/slices/customer/filters";

import { useDispatch, useSelector } from "src/store";
import { IGlobalProperty } from "src/types/global";

export default function SubCategoryForCustomerSelect() {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { data } = useAllGlobalsQuery();

    const parentCategories = useSelector(selectParentCategories) || [];
    const subCategories = useSelector(selectCategories) || [];

    const propertyEnums = data?.property;
    if (!propertyEnums || parentCategories.length === 0) return null;

    const options = parentCategories.map((category) => {
        return propertyEnums![
            `${category.toLowerCase()}Category` as keyof IGlobalProperty
        ];
    });

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
                {options.flat(1)!.map((option: any) => {
                    return (
                        <MenuItem key={option} value={option}>
                            <Checkbox
                                checked={subCategories.indexOf(option) > -1}
                            />

                            {option}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}
