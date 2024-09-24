import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { RHFSelect } from "src/components/hook-form";
import { KeyValue } from "src/types/KeyValue";
import { RHFSelectProps } from "./RHFSelect";

type SelectProps<T = string> = Omit<RHFSelectProps<T>, "children"> & {
    name: string;
    label: string;
    emptyValue?: any;
    options: KeyValue[];
};

const Select = ({ name, label, emptyValue, options }: SelectProps) => {
    const { t } = useTranslation();

    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel>{label}</InputLabel>
            <RHFSelect fullWidth name={name} label={label}>
                <MenuItem value={emptyValue || ""}>
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
