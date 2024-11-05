import { SxProps, Theme } from "@mui/material";
import { useMemo } from "react";
import { TranslationType } from "@/types/translation";
import { useTranslation } from "react-i18next";
import { getBgcolor, getColor } from "../../styled";
import RHFToggleButtonGroup from "@/components/hook-form/RHFToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

// -----------------------------------------------------------------------

const getToggleButtonSx = (p: number): SxProps<Theme> => ({
    bgcolor: getBgcolor(p),
    color: getColor(p),
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

const Priority = () => {
    const { t } = useTranslation();

    const OPTIONS = useMemo(() => getOPTIONS(t), [t]);

    return (
        <RHFToggleButtonGroup name="priority" exclusive size="small">
            {OPTIONS.map(getOption)}
        </RHFToggleButtonGroup>
    );
};

export default Priority;
