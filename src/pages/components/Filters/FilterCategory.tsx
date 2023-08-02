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

export default function CategorySelect() {
    const dispatch = useDispatch();
    const categories = useSelector(selectParentCategories);

    const { data } = useAllGlobalsQuery();
    const propertyEnums = data?.property;
    const categoryEnums = propertyEnums?.parentCategory;

    if (!data) return null;

    const handleChange = (event: SelectChangeEvent<typeof categories>) => {
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
        <FormControl sx={{ minWidth: "130px" }}>
            <InputLabel id="demo-simple-select-label">Categories</InputLabel>
            <Select
                multiple
                labelId="demo-simple-select-label"
                value={categories}
                onChange={handleChange}
                renderValue={(selected) => selected.join(", ")}
                input={<OutlinedInput label="Κατηγορίες" />}
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
