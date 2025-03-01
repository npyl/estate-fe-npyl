import {
    ToggleButton,
    ToggleButtonGroup,
    ToggleButtonGroupProps,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { IAgreementType } from "@/types/agreements";
import { FC } from "react";

type Option = { label: string; key: IAgreementType };

const OPTIONS: Option[] = [
    { label: "Basic", key: "BASIC" },
    { label: "Basic Exclusive", key: "BASIC_EXCLUSIVE" },
];

// ------------------------------------------------------------------------

const ButtonGroup: FC<ToggleButtonGroupProps> = (props) => {
    const { t } = useTranslation();

    return (
        <ToggleButtonGroup exclusive {...props}>
            {OPTIONS.map(({ label, key }) => (
                <ToggleButton key={key} value={key}>
                    {t(label)}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
};

export default ButtonGroup;
