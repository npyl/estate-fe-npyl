import {
    SxProps,
    Theme,
    ToggleButtonGroup,
    ToggleButtonGroupProps,
} from "@mui/material";
import { FC, useMemo } from "react";
import { TranslationType } from "@/types/translation";
import { useTranslation } from "react-i18next";
import { getTaskBgcolor, getTaskColor } from "./styled";
import ToggleButton from "@mui/material/ToggleButton";

// -----------------------------------------------------------------------

const getToggleButtonSx = (p: number): SxProps<Theme> => ({
    bgcolor: getTaskBgcolor(p),
    color: getTaskColor(p),
    textTransform: "unset",
});

// -----------------------------------------------------------------------

interface Option {
    key: number;
    label: string;
}

const getOPTIONS = (t: TranslationType): Option[] => [
    { key: 0, label: t("Low") },
    { key: 1, label: t("Medium") },
    { key: 2, label: t("High") },
];

// -------------------------------------------------------------

const getOption = ({ key, label }: Option) => (
    <ToggleButton key={key} value={key} sx={getToggleButtonSx(key)}>
        {label}
    </ToggleButton>
);

// -------------------------------------------------------------

const PriorityGroup: FC<ToggleButtonGroupProps> = (props) => {
    const { t } = useTranslation();

    const OPTIONS = useMemo(() => getOPTIONS(t), [t]);

    return (
        <ToggleButtonGroup exclusive size="small" {...props}>
            {OPTIONS.map(getOption)}
        </ToggleButtonGroup>
    );
};

export default PriorityGroup;
