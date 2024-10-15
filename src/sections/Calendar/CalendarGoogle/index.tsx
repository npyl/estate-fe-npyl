import Calendar from "@/components/Calendar";
import { useAuth } from "@/hooks/use-auth";
import { useGetAllEventsQuery } from "@/services/calendar";
import CalendarButtonGroup from "@/components/Calendar/ButtonGroup";
import Stack from "@mui/material/Stack";
import { ViewButtonGroupProps } from "@/components/BaseCalendar/types";
import { FC } from "react";
import IsAuthenticatedIndicator from "./IsAuthenticatedIndicator";

const CustomButtonGroup: FC<ViewButtonGroupProps> = (props) => (
    <Stack direction="row" spacing={1}>
        <IsAuthenticatedIndicator />
        <CalendarButtonGroup {...props} />
    </Stack>
);

const CalendarGoogle = () => {
    const { user } = useAuth();
    const { data } = useGetAllEventsQuery(user?.id!);

    return (
        <Calendar
            HeaderSlots={{
                ViewButtonGroup: CustomButtonGroup,
            }}
        />
    );
};

export default CalendarGoogle;
