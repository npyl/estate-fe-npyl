import { Paper, styled } from "@mui/material";
import { FC } from "react";
import React from "react";
import { BaseCalendarDayViewProps } from "@/components/BaseCalendar/types";
import Numbering from "@/components/Calendar/Views/Numbering";
import CalendarGoogle from "@/components/CalendarGoogle";
import IsAuthenticatedIndicator from "@/components/CalendarGoogle/ButtonGroup/IsAuthenticatedIndicator";
import CalendarGoogleDayView from "@/components/CalendarGoogle/Views/Day";

const PaperSx = {
    borderRadius: "15px",
};

// ------------------------------------------------------------------------

const CustomButtonGroup = ({}: any) => <IsAuthenticatedIndicator />;

// ------------------------------------------------------------------------

const StyledNumbering = styled(Numbering)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const StyledDayView = styled(CalendarGoogleDayView)(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.neutral?.[800],

    height: "300px",
    borderBottomLeftRadius: "15px",
    borderBottomRightRadius: "15px",
}));

const ThemedDayView: FC<BaseCalendarDayViewProps> = (props) => {
    return <StyledDayView {...props} Numbering={StyledNumbering} />;
};

// ------------------------------------------------------------------------

const SimpleCalendar = () => (
    <Paper sx={PaperSx}>
        <CalendarGoogle
            initialView="day"
            ViewSlots={{
                DayView: ThemedDayView,
            }}
            HeaderSlots={{
                ViewButtonGroup: CustomButtonGroup,
            }}
        />
    </Paper>
);

export default React.memo(SimpleCalendar);
