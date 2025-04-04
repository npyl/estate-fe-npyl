import { FC } from "react";
import { TCalendarEvent } from "../types";
import CompactCalendarEvent from "../Event/Compact";
import Box from "@mui/material/Box";
import { DAY_CELL_HEIGHT } from "@/constants/calendar";
import { SxProps, Theme } from "@mui/material";

const getEvent = (e: TCalendarEvent) => (
    <CompactCalendarEvent key={e.id} event={e} />
);

const BoxSx: SxProps<Theme> = {
    overflowX: "auto",
};

interface MiscCellProps {
    events: TCalendarEvent[];
}

const MiscCell: FC<MiscCellProps> = ({ events }) => (
    <Box
        py={1}
        className="PPCalendar-MiscCell"
        height={DAY_CELL_HEIGHT}
        sx={BoxSx}
    >
        {events.map(getEvent)}
    </Box>
);

export default MiscCell;
