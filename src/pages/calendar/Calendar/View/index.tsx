import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { TCalendarView } from "../types";
import { FC, useCallback, useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Box, SxProps, Theme } from "@mui/material";
import getBorderColor from "@/theme/borderColor";
import { TODAY } from "../constants";
import dynamic from "next/dynamic";

const DayView = dynamic(() => import("./Day"));
const WeekView = dynamic(() => import("./Week"));
const YearView = dynamic(() => import("./Year"));
const MonthView = dynamic(() => import("./Month"));

const ViewSx: SxProps<Theme> = {
    border: "1px solid",
    borderColor: (theme) => getBorderColor(theme),
    borderRadius: "8px",
};

const IconButtonSx = {
    borderRadius: "20px",
};

interface ViewProps {
    view: TCalendarView;
}

const View: FC<ViewProps> = ({ view }) => {
    const [date, setDate] = useState(TODAY);

    const gotoPrev = useCallback(
        () => setDate(new Date(date.setMonth(date.getMonth() - 1))),
        []
    );
    const gotoNext = useCallback(
        () => setDate(new Date(date.setMonth(date.getMonth() + 1))),
        []
    );
    const gotoToday = useCallback(() => setDate(TODAY), []);

    return (
        <>
            <div>
                <IconButton onClick={gotoPrev} sx={IconButtonSx}>
                    <ChevronLeft />
                </IconButton>
                <button onClick={gotoToday}>Today</button>
                <IconButton onClick={gotoNext} sx={IconButtonSx}>
                    <ChevronRight />
                </IconButton>
            </div>

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
