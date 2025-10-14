import { Popover as MuiPopover, SxProps, Theme } from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import YearIcon from "./YearIcon";
import { ComponentType, FC, useCallback, useMemo } from "react";
import { TCalendarView } from "@/components/BaseCalendar/types";
import { TranslationType } from "@/types/translation";
import { useTranslation } from "react-i18next";

// -----------------------------------------------------------------------

const ToggleButtonSx: SxProps<Theme> = {
    border: 0,
    display: "flex",
    flexDirection: "row",
    gap: (theme) => theme.spacing(1),
    justifyContent: "unset",
    textTransform: "unset",
};

// -----------------------------------------------------------------------

interface Option {
    key: string;
    label: string;
    Icon: ComponentType;
}

const getOPTIONS = (t: TranslationType): Option[] => [
    { key: "week", label: t("Week"), Icon: DateRangeIcon },
    { key: "month", label: t("Month"), Icon: CalendarMonthIcon },
    { key: "year", label: t("Year"), Icon: YearIcon },
];

// -------------------------------------------------------------

const getOption = ({ key, label, Icon }: Option) => (
    <ToggleButton key={key} value={key} sx={ToggleButtonSx}>
        <Icon /> {label}
    </ToggleButton>
);

// -------------------------------------------------------------

interface PopoverProps {
    anchorEl: HTMLElement;
    view: TCalendarView;
    onViewChange: (v: TCalendarView) => void;
    onClose: VoidFunction;
}

const Popover: FC<PopoverProps> = ({
    anchorEl,
    view,
    onViewChange,
    onClose,
}) => {
    const { t } = useTranslation();

    const OPTIONS = useMemo(() => getOPTIONS(t), [t]);

    const handleViewChange = useCallback(
        (_: any, v: TCalendarView) => v && onViewChange(v),
        [onViewChange]
    );

    return (
        <MuiPopover
            open
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: "right",
                vertical: "bottom",
            }}
            transformOrigin={{
                horizontal: "center",
                vertical: "top",
            }}
            onClose={onClose}
        >
            <ToggleButtonGroup
                exclusive
                orientation="vertical"
                value={view}
                onChange={handleViewChange}
            >
                {OPTIONS.map(getOption)}
            </ToggleButtonGroup>
        </MuiPopover>
    );
};

export default Popover;
