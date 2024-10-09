import { TCalendarView } from "../types";
import { FC, useState } from "react";
import { Box, SxProps, Theme } from "@mui/material";
import getBorderColor from "@/theme/borderColor";
import { TODAY } from "../constants";
import dynamic from "next/dynamic";
import Header from "../Header";

const DayView = dynamic(() => import("./Day"));
const WeekView = dynamic(() => import("./Week"));
const YearView = dynamic(() => import("./Year"));
import MonthView from "./Month";

const ViewSx: SxProps<Theme> = {
    border: "1px solid",
    borderColor: (theme) => getBorderColor(theme),
    borderRadius: "8px",
};

interface ViewProps {
    view: TCalendarView;
}

const View: FC<ViewProps> = ({ view }) => {
    const [date, setDate] = useState(TODAY);

    return (
        <>
            <Header date={date} onDateChange={setDate} />

            <Box sx={ViewSx}>
                {view === "day" ? <DayView date={date} /> : null}
                {view === "week" ? <WeekView date={date} /> : null}
                {view === "month" ? <MonthView date={date} /> : null}
                {view === "year" ? <YearView date={date} /> : null}
            </Box>
        </>
    );
};

export default View;
