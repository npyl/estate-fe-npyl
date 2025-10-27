import { Checkbox, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGlobals } from "@/sections/useGlobals";
import Select, { SelectChangeEvent, SelectProps } from "@/components/Select";
import { FC } from "react";
import { KeyValue } from "@/types/KeyValue";

// ------------------------------------------------------------------------------

const getOption = (value?: string[]) => (o: KeyValue) => (
    <MenuItem key={o.key} value={o.key}>
        <Checkbox checked={value?.includes(o.key)} />
        {o.value}
    </MenuItem>
);

// ------------------------------------------------------------------------------

interface StateMultiplePickerProps
    extends Omit<SelectProps, "value" | "onChange"> {
    value: string[];
    onChange: (s: string[]) => void;
}

const StateMultiplePicker: FC<StateMultiplePickerProps> = ({
    value = [],
    onChange: _onChange,
    ...props
}) => {
    const { t } = useTranslation();

    const data = useGlobals();

    const stateEnum = data?.property?.state || [];

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;

        _onChange(value as any);
    };

    return (
        <Select
            multiple
            value={value}
            onChange={handleChange}
            label={t("State")}
            formControlProps={{ sx: { width: "130px", maxWidth: "200px" } }}
            renderValue={(selected: string[]) => {
                return selected
                    .map(
                        (key) =>
                            stateEnum.find((item) => item.key === key)?.value
                    )
                    .filter(Boolean) // Remove any undefined values
                    .join(", ");
            }}
            MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
        >
            {stateEnum.map(getOption(value))}
        </Select>
    );
};

export type { StateMultiplePickerProps };
export default StateMultiplePicker;
