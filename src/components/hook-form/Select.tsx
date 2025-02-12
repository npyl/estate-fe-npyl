import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { RHFSelect } from "src/components/hook-form";
import { KeyValue } from "src/types/KeyValue";
import { RHFSelectProps } from "./RHFSelect";

const NOT_SELECTED_VALUE = "";

type SelectProps<T = string> = Omit<RHFSelectProps<T>, "children"> & {
    name: string;
    label: string;
    options: KeyValue[];
};

const Select = ({ name, label, options, ...props }: SelectProps) => {
    const { t } = useTranslation();

    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel>{label}</InputLabel>
            <RHFSelect fullWidth name={name} label={label} {...props}>
                <MenuItem value={NOT_SELECTED_VALUE}>
                    {t("Not selected")}
                </MenuItem>
                {options.map(({ key, value }, i) => (
                    <MenuItem key={i} value={key}>
                        {t(value)}
                    </MenuItem>
                ))}
            </RHFSelect>
        </FormControl>
    );
};

export default Select;
