import { Checkbox, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGlobals } from "@/sections/useGlobals";
import Select, { SelectChangeEvent, SelectProps } from "@/components/Select";
import { FC, useCallback } from "react";

interface ParentCategoryPickerProps
    extends Omit<SelectProps, "value" | "onChange"> {
    value: string[];
    onChange: (s: string[]) => void;
}

const ParentCategoryPicker: FC<ParentCategoryPickerProps> = ({
    onChange: _onChange,
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
            value={props.value ?? []}
            onChange={handleChange}
            formControlProps={{
                sx: { minWidth: "200px", maxWidth: "200px" },
            }}
            renderValue={renderValue}
            label={t("Parent Category")}
            MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
        >
            {parentCategoryEnums.map(({ key, value }) => (
                <MenuItem key={key} value={key}>
                    <Checkbox
                        checked={
                            props.value &&
                            props.value.length > 0 &&
                            props.value.includes(key)
                        }
                    />
                    {value}
                </MenuItem>
            ))}
        </Select>
    );
};

export type { ParentCategoryPickerProps };
export default ParentCategoryPicker;
