import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { RHFSelect } from "src/components/hook-form";
import { KeyValue } from "src/types/KeyValue";

interface SelectProps {
    name: string;
    label: string;
    withEmptyOption?: boolean;
    emptyValue?: any;
    options: KeyValue[];
}

const Select = ({
    name,
    label,
    withEmptyOption = false,
    emptyValue,
    options,
}: SelectProps) => {
    const { t } = useTranslation();

    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel>{label}</InputLabel>
            <RHFSelect fullWidth name={name} label={label}>
                <MenuItem value={undefined}>{t("Not selected")}</MenuItem>
                {options.map(({ key, value }, i) => (
                    <MenuItem key={i} value={key}>
                        {value}
                    </MenuItem>
                ))}
            </RHFSelect>
        </FormControl>
    );
};

export default Select;
