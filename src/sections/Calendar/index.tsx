import CalendarGoogle from "@/components/CalendarGoogle";
import StyledHeader from "./Header";
import WithActions from "./WithActions";

import dynamic from "next/dynamic";

import { Fab } from "@mui/material";
import useDialog from "@/hooks/useDialog";

const CreateEventDialog = dynamic(() => import("./Event/Create"));

const CalendarGoogleDayView = dynamic(
    () => import("@/components/CalendarGoogle/Views/Day")
);
import CalendarGoogleWeekView from "@/components/CalendarGoogle/Views/Week";
const CalendarGoogleMonthView = dynamic(
    () => import("@/components/CalendarGoogle/Views/Month")
);
const CalendarGoogleYearView = dynamic(
    () => import("@/components/CalendarGoogle/Views/Year")
);

const Create = () => {
    const [isOpen, openDialog, closeDialog] = useDialog();

    return (
        <>
            {isOpen ? <CreateEventDialog onClose={closeDialog} /> : null}

            <Fab
                sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                }}
                onClick={openDialog}
            >
                create
            </Fab>
        </>
    );
};

const CalendarSection = () => (
    <>
        <CalendarGoogle
            ViewSlots={{
                DayView: WithActions(CalendarGoogleDayView),
                WeekView: WithActions(CalendarGoogleWeekView),
                MonthView: WithActions(CalendarGoogleMonthView),
                YearView: WithActions(CalendarGoogleYearView),
            }}
            slots={{
                Header: StyledHeader,
            }}
        />

        <Create />
    </>
);

export default CalendarSection;
