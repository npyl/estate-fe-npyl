import GoogleCalendarIcon from "@/assets/GoogleCalendar";
import Stack from "@mui/material/Stack";
import { FC } from "react";
interface AttachmentsProps {
    event: string;
}

const CalendarEvent: FC<AttachmentsProps> = ({ event }) => (
    <Stack direction="row" alignItems="center">
        {event !== "" ? <GoogleCalendarIcon sx={{ fontSize: 27 }} /> : null}
    </Stack>
);

export default CalendarEvent;
