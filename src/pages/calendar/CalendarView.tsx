import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import timelinePlugin from "@fullcalendar/timeline";
//
import { useState, useRef, useMemo } from "react";
// next
import Head from "next/head";
// @mui
import { Button, Card, Container, Stack, Typography } from "@mui/material";

// sections
import { StyledCalendar, CalendarToolbar } from "@/components/Calendar";

// import ICalendarEvent2EventSourceInput from "./constants";
// import useSWR from "swr";
import { useAuth } from "@/hooks/use-auth";
import Iconify from "@/components/iconify";

// ----------------------------------------------------------------------

const view = "timeGridWeek";

export default function Events() {
    const { user } = useAuth();

    const calendarRef = useRef<FullCalendar>(null);

    const [date, setDate] = useState(new Date());

    const data = [];

    const handleClickDatePrev = () => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.prev();
            setDate(calendarApi.getDate());
        }
    };

    const handleClickDateNext = () => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.next();
            setDate(calendarApi.getDate());
        }
    };

    return (
        <>
            <Container>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                        mb: { xs: 3, md: 5 },
                    }}
                >
                    <Typography variant="h4">Calendar</Typography>
                    <Button
                        variant="contained"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                    >
                        New Event
                    </Button>
                </Stack>

                <Card>
                    <StyledCalendar>
                        <CalendarToolbar
                            onNextDate={handleClickDateNext}
                            onPrevDate={handleClickDatePrev}
                            date={date}
                            view={view}
                            onChangeView={() => {}}
                            onToday={() => {
                                const calendarEl = calendarRef.current;
                                if (calendarEl) {
                                    const calendarApi = calendarEl.getApi();
                                    calendarApi.today();
                                    setDate(calendarApi.getDate());
                                }
                            }}
                            onOpenFilters={() => {}}
                        />

                        <FullCalendar
                            weekends
                            editable
                            droppable
                            selectable
                            rerenderDelay={10}
                            allDayMaintainDuration
                            eventResizableFromStart
                            ref={calendarRef}
                            initialDate={date}
                            initialView={view}
                            dayMaxEventRows={3}
                            eventDisplay="block"
                            // events={dataFiltered}
                            headerToolbar={false}
                            // select={onSelectRange}
                            // eventClick={onClickEvent}
                            // height={smUp ? 720 : "auto"}
                            // eventDrop={(arg) => {
                            //     onDropEvent(arg, updateEvent);
                            // }}
                            // eventResize={(arg) => {
                            //     onResizeEvent(arg, updateEvent);
                            // }}
                            plugins={[
                                listPlugin,
                                dayGridPlugin,
                                timelinePlugin,
                                timeGridPlugin,
                                interactionPlugin,
                            ]}
                        />
                    </StyledCalendar>
                </Card>
            </Container>
        </>
    );
}
