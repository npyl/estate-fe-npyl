import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { RHFSelect } from "@/components/hook-form";
import { KeyValue } from "@/types/KeyValue";
import { RHFSelectProps } from "@/components/hook-form/RHFSelect";
import { NOT_SELECTED_VALUE } from "@/constants/select";
import { getOptionTestId, NOT_SELECTED_TESTID } from "./constants";
import { TranslationType } from "@/types/translation";
import { FC } from "react";

const getOption =
    (t: TranslationType) =>
    ({ key, value }: KeyValue) => (
        <MenuItem data-testid={getOptionTestId(key)} key={key} value={key}>
            {t(value)}
        </MenuItem>
    );

type SelectProps<T = string> = Omit<RHFSelectProps<T>, "children"> & {
    name: string;
    label: string;
    options: KeyValue[];
};

const Select: FC<SelectProps> = ({ name, label, options, ...props }) => {
    const { t } = useTranslation();

    return (
        <RHFSelect fullWidth name={name} label={label} {...props}>
            <MenuItem
                data-testid={NOT_SELECTED_TESTID}
                value={NOT_SELECTED_VALUE}
            >
                {t("Not selected")}
            </MenuItem>
            {options.map(getOption(t))}
        </RHFSelect>
    );
};

export default Select;
