import {
    SxProps,
    Theme,
    ToggleButtonGroup,
    ToggleButtonGroupProps,
} from "@mui/material";
import { FC, forwardRef, useCallback, useMemo, MouseEvent } from "react";
import { TranslationType } from "@/types/translation";
import { useTranslation } from "react-i18next";
import { getTaskBgcolor, getTaskColor } from "./styled";
import ToggleButton, { ToggleButtonProps } from "@mui/material/ToggleButton";
import ClearIcon from "@mui/icons-material/Clear";

// -----------------------------------------------------------------------

const ClearButton: FC<Omit<ToggleButtonProps, "value">> = ({
    onClick,
    ...props
}) => {
    // INFO: prevent onChange because we do not want this -1 value written to our state
    const handleClear = useCallback(
        (e: MouseEvent<HTMLElement>, v: any) => {
            e.preventDefault();
            onClick?.(e, v);
        },
        [onClick]
    );
    return (
        <ToggleButton value={-1} onClick={handleClear} {...props}>
            <ClearIcon />
        </ToggleButton>
    );
};

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

interface PriorityGroupProps extends ToggleButtonGroupProps {
    onClear?: VoidFunction;
}

const PriorityGroup = forwardRef<HTMLDivElement, PriorityGroupProps>(
    ({ onClear, onChange, ...props }, ref) => {
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

                {/* Clear */}
                {onClear && props.value !== undefined ? (
                    <ClearButton onClick={onClear} />
                ) : null}
            </ToggleButtonGroup>
        );
    }
);

export default PriorityGroup;
