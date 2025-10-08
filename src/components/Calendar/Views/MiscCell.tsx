import { FC } from "react";
import { TCalendarEvent } from "../types";
import CompactCalendarEvent from "@/components/Calendar/Event/Compact";
import Box from "@mui/material/Box";
import { CELL_HOUR_HEIGHT } from "@/constants/calendar";
import { SxProps, Theme } from "@mui/material";

const MISC_CELL_CLASSNAME = "PPCalendar-MiscCell";

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
        className={MISC_CELL_CLASSNAME}
        height={CELL_HOUR_HEIGHT}
        sx={BoxSx}
    >
        {events.map(getEvent)}
    </Box>
);

export { MISC_CELL_CLASSNAME };
export default MiscCell;
