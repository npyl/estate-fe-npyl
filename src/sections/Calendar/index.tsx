import CalendarGoogle from "@/components/CalendarGoogle";
import Stack from "@mui/material/Stack";
import IsAuthenticatedIndicator from "./IsAuthenticatedIndicator";

const CalendarSection = () => (
    <>
        <Stack direction="row" justifyContent="flex-end">
            <IsAuthenticatedIndicator />
        </Stack>
        <CalendarGoogle />
    </>
);

export default CalendarSection;
