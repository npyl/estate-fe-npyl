import {
    SxProps,
    Theme,
    ToggleButtonGroup,
    ToggleButtonGroupProps,
} from "@mui/material";
import { forwardRef, useCallback, useMemo } from "react";
import { TranslationType } from "@/types/translation";
import { useTranslation } from "react-i18next";
import { getTaskBgcolor, getTaskColor } from "./styled";
import ToggleButton from "@mui/material/ToggleButton";

// -----------------------------------------------------------------------

const getToggleButtonSx = (p: number): SxProps<Theme> => {
    const COLORS = {
        bgcolor: getTaskBgcolor(p),
        color: getTaskColor(p),
    };
    return {
        "&.Mui-selected": COLORS,
        "&.Mui-selected:hover": COLORS,
        textTransform: "unset",
    };
};

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

const PriorityGroup = forwardRef<HTMLDivElement, ToggleButtonGroupProps>(
    ({ onChange, ...props }, ref) => {
        const { t } = useTranslation();

        const OPTIONS = useMemo(() => getOPTIONS(t), [t]);

        const handleChange = useCallback(
            (e: any, v: any) => {
                if (v === null) return;
                onChange?.(e, v);
            },
            [onChange]
        );

        return (
            <ToggleButtonGroup
                ref={ref}
                exclusive
                size="small"
                onChange={handleChange}
                {...props}
            >
                {OPTIONS.map(getOption)}
            </ToggleButtonGroup>
        );
    }
);

export default PriorityGroup;
