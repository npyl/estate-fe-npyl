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

import { useTranslation } from "react-i18next";
import { useGlobals } from "src/hooks/useGlobals";
import {useTheme} from "@mui/material/styles";

export default function FilterParentCategory() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const data = useGlobals();

    const theme = useTheme();

    const categories = useSelector(selectParentCategories);

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
        <FormControl sx={{ minWidth: "200px", maxWidth: "200px" }}>
            <InputLabel sx={{ textAlign:"center", transform: theme.palette.mode === "dark" ? "translate(14px, 8px)" : "translate(14px, 16px)"}}>{t("Parent Category")}</InputLabel>
            <Select
                multiple
                value={categories}
                onChange={handleChange}
                renderValue={(selected: string[]) => {
                    return selected
                        .map(
                            (key) =>
                                categoryEnums?.find((item) => item.key === key)
                                    ?.value
                        )
                        .filter(Boolean)
                        .join(", ");
                }}
                input={<OutlinedInput sx={{maxHeight:"38px", textAlign:"center"}} label={t("Parent Category")} />}
                MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
            >
                {categoryEnums!.map(({ key, value }) => {
                    return (
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
                    );
                })}
            </Select>
        </FormControl>
    );
}
