import getTypeColor from "@/components/Calendar/Event/_shared/getTypeColor";
import { TCalendarEventType } from "@/components/Calendar/types";
import { TranslationType } from "@/types/translation";
import { SxProps, Theme } from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { FC, PropsWithChildren, useCallback } from "react";
import { useTranslation } from "react-i18next";

// ------------------------------------------------------------------

interface BulletProps extends BoxProps {
    type: TCalendarEventType;
}

const Bullet: FC<BulletProps> = ({ type, ...props }) => (
    <Box bgcolor={getTypeColor(type)} borderRadius="100%" p={0.7} {...props} />
);

// ------------------------------------------------------------------

interface Option {
    type: TCalendarEventType;
    label: string;
}

const OPTIONS: Option[] = [
    { type: "TASK", label: "=Task=" },
    { type: "MEETING", label: "=Meeting=" },
    { type: "TOUR_INPERSON", label: "=Tour_in_person=" },
    { type: "TOUR_ONLINE", label: "=Tour_on_line=" },
];

const getOption =
    (t: TranslationType) =>
    ({ type, label }: Option) =>
        (
            <ToggleButton key={type} value={type}>
                <Bullet type={type} />
                <Typography ml={1}>{t(label)}</Typography>
            </ToggleButton>
        );

// ------------------------------------------------------------------

const SelectSx: SxProps<Theme> = {
    textWrap: "nowrap",
    "& .MuiToggleButton-root": {
        textTransform: "unset",
    },
};

interface Props<T extends string = TCalendarEventType>
    extends PropsWithChildren {
    type: T;
    onChange: (t: T) => void;
}

const TypeSelect = <T extends string>({
    type,
    onChange,
    children,
}: Props<T>) => {
    const { t } = useTranslation();

    const handleChange = useCallback(
        (_: any, value: T | null) => {
            if (!value) return;
            onChange(value);
        },
        [onChange]
    );

    return (
        <ToggleButtonGroup
            exclusive
            size="small"
            value={type}
            onChange={handleChange}
            sx={SelectSx}
        >
            {children}
            {OPTIONS.map(getOption(t))}
        </ToggleButtonGroup>
    );
};

export default TypeSelect;
