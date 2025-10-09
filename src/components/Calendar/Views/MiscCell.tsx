import { FC } from "react";
import { TCalendarEvent, TOnEventClick } from "../types";
import CompactCalendarEvent from "@/components/Calendar/Event/Compact";
import Box from "@mui/material/Box";
import { CELL_HOUR_HEIGHT } from "@/constants/calendar";
import { SxProps, Theme } from "@mui/material";

const MISC_CELL_CLASSNAME = "PPCalendar-MiscCell";

const getEvent = (onEventClick?: TOnEventClick) => (e: TCalendarEvent) => (
    <CompactCalendarEvent key={e.id} event={e} onEventClick={onEventClick} />
);

const BoxSx: SxProps<Theme> = {
    overflowY: "auto",
};

interface MiscCellProps {
    events: TCalendarEvent[];
    onEventClick?: TOnEventClick;
}

const MiscCell: FC<MiscCellProps> = ({ events, onEventClick }) => (
    <Box
        py={1}
        className={MISC_CELL_CLASSNAME}
        height={CELL_HOUR_HEIGHT}
        sx={BoxSx}
    >
        {events.map(getEvent(onEventClick))}
    </Box>
);

export { MISC_CELL_CLASSNAME };
export default MiscCell;
