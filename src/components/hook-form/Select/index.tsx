import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { RHFSelect } from "@/components/hook-form";
import { KeyValue } from "@/types/KeyValue";
import { RHFSelectProps } from "@/components/hook-form/RHFSelect";
import { NOT_SELECTED_VALUE } from "@/constants/select";
import { getOptionTestId, NOT_SELECTED_TESTID } from "./constants";

type SelectProps<T = string> = Omit<RHFSelectProps<T>, "children"> & {
    name: string;
    label: string;
    options: KeyValue[];
};

const Select = ({ name, label, options, ...props }: SelectProps) => {
    const { t } = useTranslation();

    return (
        <RHFSelect fullWidth name={name} label={label} {...props}>
            <MenuItem
                data-testid={NOT_SELECTED_TESTID}
                value={NOT_SELECTED_VALUE}
            >
                {t("Not selected")}
            </MenuItem>
            {options.map(({ key, value }, i) => (
                <MenuItem
                    data-testid={getOptionTestId(key)}
                    key={i}
                    value={key}
                >
                    {t(value)}
                </MenuItem>
            ))}
        </RHFSelect>
    );
};

export default Select;
