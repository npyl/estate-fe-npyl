import { FC, useMemo } from "react";
import MenuItem from "@mui/material/MenuItem";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import { SxProps, Theme } from "@mui/material";

// Generate time slots from 7:00 AM to 10:00 PM in 15-minute increments as ISO strings
const generateTimeSlots = (startHour: number = 7, endHour: number = 22) => {
    const slots = [];

    // Use today's date for the ISO strings
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset to midnight

    for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            // Skip 10:00 PM with minutes > 0
            if (hour === endHour && minute > 0) continue;

            // Create a new date object for this time slot
            const date = new Date(today);
            date.setHours(hour, minute, 0, 0);

            slots.push(date.toISOString());
        }
    }

    return slots;
};

const formatTimeDisplay = (isoString: string): string => {
    const date = new Date(isoString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours < 12 ? "AM" : "PM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;

    // Format minutes with leading zero if needed
    const minuteFormat = minutes === 0 ? "00" : minutes;

    return `${hours}:${minuteFormat} ${period}`;
};

const getOption = (onClick: (d: string) => void) => (d: string) =>
    (
        <MenuItem key={d} onClick={() => onClick(d)}>
            {formatTimeDisplay(d)}
        </MenuItem>
    );

// ------------------------------------------------------------------------------

const PopperSx: SxProps<Theme> = { zIndex: 1500 };

const PaperSx: SxProps<Theme> = {
    width: "inherit",
    height: "300px",
    overflowY: "auto",
};

interface MenuProps {
    anchorEl: HTMLElement;
    onSelect: (d: string) => void;

    minTime?: number;
    maxTime?: number;
}

const Menu: FC<MenuProps> = ({ anchorEl, minTime, maxTime, onSelect }) => {
    const OPTIONS = useMemo(
        () => generateTimeSlots(minTime, maxTime),
        [minTime, maxTime]
    );
    return (
        <Popper open anchorEl={anchorEl} sx={PopperSx}>
            <Paper sx={PaperSx}>{OPTIONS.map(getOption(onSelect))}</Paper>
        </Popper>
    );
};

export default Menu;
