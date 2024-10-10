import { Button, IconButton, IconButtonProps } from "@mui/material";
import BaseCalendar from "../BaseCalendar";
import { FC } from "react";

const IconButtonSx = {
    borderRadius: "20px",
};

const CalendarIconButton: FC<IconButtonProps> = (props) => (
    <IconButton sx={IconButtonSx} {...props} />
);

const Calendar = () => {
    return (
        <BaseCalendar
            HeaderSlots={{
                PreviousButton: CalendarIconButton,
                NextButton: CalendarIconButton,
                TodayButton: Button,
            }}
        />
    );
};

export default Calendar;
