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
import { useGlobals } from "src/hooks/useGlobals";
import { useTranslation } from "react-i18next";
import {
    selectParentCategories,
    setParentCategories,
} from "src/slices/customer/filters";
import { useTheme } from "@mui/material/styles";

export default function FilterParentCategory() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const data = useGlobals();
    const theme = useTheme();

    const parentCategories = useSelector(selectParentCategories);

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
            <InputLabel sx={{ textAlign:"center", transform: theme.palette.mode === "dark" ? "translate(14px, 8px)" : "translate(14px, 16px)"}}>{t("Parent Category")}</InputLabel>
            <Select
                multiple
                value={parentCategories}
                onChange={handleChange}
                renderValue={(selected: string[]) => {
                    return selected
                        .map(
                            (key) =>
                                parentCategoryEnums?.find(
                                    (item) => item.key === key
                                )?.value
                        )
                        .filter(Boolean)
                        .join(", ");
                }}
                input={<OutlinedInput sx={{maxHeight: "38px", textAlign:"center"}} label={t("Parent Category")} />}
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
