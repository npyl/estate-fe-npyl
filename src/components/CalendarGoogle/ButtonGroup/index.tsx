import CalendarButtonGroup from "@/components/Calendar/ButtonGroup";
import Stack from "@mui/material/Stack";
import { ViewButtonGroupProps } from "@/components/BaseCalendar/types";
import { FC } from "react";
import IsAuthenticatedIndicator from "@/sections/Google/WorkspaceIndicator/IsAuthenticatedIndicator";

const CalendarGoogleButtonGroup: FC<ViewButtonGroupProps> = (props) => (
    <Stack direction="row" spacing={1}>
        <IsAuthenticatedIndicator />
        <CalendarButtonGroup {...props} />
    </Stack>
);

export default CalendarGoogleButtonGroup;
