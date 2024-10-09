import { TCalendarView } from "./types";
import { FC } from "react";
import { Box, SxProps, Theme } from "@mui/material";
import getBorderColor from "@/theme/borderColor";
import dynamic from "next/dynamic";

const DayView = dynamic(() => import("./View/Day"));
const WeekView = dynamic(() => import("./View/Week"));
const YearView = dynamic(() => import("./View/Year"));
import MonthView from "./View/Month";

const ViewSx: SxProps<Theme> = {
    border: "1px solid",
    borderColor: (theme) => getBorderColor(theme),
    borderRadius: "8px",
};

interface ViewProps {
    view: TCalendarView;
    date: Date;
}

const View: FC<ViewProps> = ({ view, date }) => (
    <>
        <Box sx={ViewSx}>
            {view === "day" ? <DayView date={date} /> : null}
            {view === "week" ? <WeekView date={date} /> : null}
            {view === "month" ? <MonthView date={date} /> : null}
            {view === "year" ? <YearView date={date} /> : null}
        </Box>
    </>
);

export default View;
