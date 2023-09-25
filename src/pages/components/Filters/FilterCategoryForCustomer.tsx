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
import {
    selectParentCategories,
    setParentCategories,
} from "src/slices/customer/filters";

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
                {parentCategoryEnums!.map(({ key, value }) => {
                    return (
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
                    );
                })}
            </Select>
        </FormControl>
    );
}
