import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Iconify from "src/components/iconify";
import React from "react";
import { useResponsive } from "src/components/Calendar/use-responsive";
import usePopover from "src/components/Calendar/use-popover";
import LinearProgress from "@mui/material/LinearProgress";

const VIEW_OPTIONS = [
    {
        value: "dayGridMonth",
        label: "Month",
        icon: "mingcute:calendar-month-line",
    },
    {
        value: "timeGridWeek",
        label: "Week",
        icon: "mingcute:calendar-week-line",
    },
    { value: "timeGridDay", label: "Day", icon: "mingcute:calendar-day-line" },
    {
        value: "listWeek",
        label: "Agenda",
        icon: "fluent:calendar-agenda-24-regular",
    },
] as const;

type Props = {
    date: Date;
    view: string;
    onNextDate: VoidFunction;
    onPrevDate: VoidFunction;
    onToday: VoidFunction;
    onChangeView: (newView: string) => void;
    onOpenFilters: VoidFunction;
    loading: boolean;
};

export default function CalendarToolbar({
    date,
    view,
    loading,
    onNextDate,
    onPrevDate,
    onToday,
    onChangeView,
    onOpenFilters,
}: Props) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const smUp = useResponsive("up", "sm");

    const popover = usePopover();

    const selectedItem = VIEW_OPTIONS.filter((item) => item.value === view)[0];

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ p: 2.5, pr: 2, position: "relative" }}
            spacing={2}
        >
            {smUp && (
                <div>
                    <Button
                        size="small"
                        color="inherit"
                        onClick={handleClick}
                        startIcon={<Iconify icon={selectedItem.icon} />}
                        endIcon={
                            <Iconify
                                icon="eva:arrow-ios-downward-fill"
                                sx={{ ml: -0.5 }}
                            />
                        }
                    >
                        {selectedItem.label}
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {VIEW_OPTIONS.map((option) => (
                            <MenuItem
                                key={option.value}
                                onClick={() => {
                                    onChangeView(option.value);
                                    handleClose();
                                }}
                            >
                                {option.label}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
            )}

            <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton onClick={onPrevDate}>
                    <Iconify icon="eva:arrow-ios-back-fill" />
                </IconButton>

                <Typography variant="h6">{date.toDateString()}</Typography>

                <IconButton onClick={onNextDate}>
                    <Iconify icon="eva:arrow-ios-forward-fill" />
                </IconButton>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
                <Button
                    size="small"
                    color="error"
                    variant="contained"
                    onClick={onToday}
                >
                    Today
                </Button>

                <IconButton onClick={onOpenFilters}>
                    <Iconify icon="ic:round-filter-list" />
                </IconButton>

                {loading && (
                    <LinearProgress
                        color="inherit"
                        sx={{
                            height: 2,
                            width: 1,
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                        }}
                    />
                )}
            </Stack>
        </Stack>
    );
}
