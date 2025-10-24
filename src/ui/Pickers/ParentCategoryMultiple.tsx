import { Checkbox, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGlobals } from "@/sections/useGlobals";
import Select, { SelectChangeEvent, SelectProps } from "@/components/Select";
import { FC, useCallback } from "react";
import { KeyValue } from "@/types/KeyValue";

// -------------------------------------------------------------------------------------

const getOption = (value?: string[]) => (o: KeyValue) => (
    <MenuItem key={`ParentCategory_${o.key}`} value={o.key}>
        <Checkbox checked={value?.includes(o.key)} />
        {o.value}
    </MenuItem>
);

// -------------------------------------------------------------------------------------

interface ParentCategoryMultiplePickerProps
    extends Omit<SelectProps, "value" | "onChange"> {
    value: string[];
    onChange: (s: string[]) => void;
}

const ParentCategoryMultiplePicker: FC<ParentCategoryMultiplePickerProps> = ({
    onChange: _onChange,
    value = [],
    ...props
}) => {
    const { t } = useTranslation();

    const data = useGlobals();
    const propertyEnums = data?.property;
    const parentCategoryEnums = propertyEnums?.parentCategory || [];

    const renderValue = useCallback(
        (selected: string[]) => {
            return selected
                .map(
                    (key) =>
                        parentCategoryEnums.find((item) => item.key === key)
                            ?.value
                )
                .filter(Boolean)
                .join(", ");
        },
        [parentCategoryEnums]
    );

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        _onChange(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    return (
        <Select
            multiple
            value={value}
            onChange={handleChange}
            formControlProps={{
                sx: { minWidth: "200px", maxWidth: "200px" },
            }}
            renderValue={renderValue}
            label={t("Parent Category")}
            MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
        >
            {parentCategoryEnums.map(getOption(value))}
        </Select>
    );
};

export type { ParentCategoryMultiplePickerProps };
export default ParentCategoryMultiplePicker;
