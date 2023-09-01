// import dayGridPlugin from "@fullcalendar/daygrid";
// import googleCalendarPlugin from "@fullcalendar/google-calendar";
// import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
// import listPlugin from "@fullcalendar/list";
// import FullCalendar from "@fullcalendar/react";
import React from "react";
// next
import Head from "next/head";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";

// ----------------------------------------------------------------------

EmailPage.getLayout = (page: React.ReactElement) => (
    <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function EmailPage() {
    // const [isOpen, setIsOpen] = useState(false);
    // const [modalContent, setModalContent] = useState();
    // const [modalTitle, setModalTitle] = useState();
    // const renderEventContent = (eventInfo) => {
    //     return (
    //         <>
    //             <div className={styles.fcContent}>
    //                 <div className={styles.eventTitle}>
    //                     {eventInfo.event.title}
    //                 </div>
    //                 <div className={styles.eventTime}>
    //                     {eventInfo.timeText} EST
    //                 </div>
    //             </div>
    //         </>
    //     );
    // };
    // const handleDateClick = (arg) => {
    //     arg.jsEvent.preventDefault();
    //     setIsOpen(true);
    //     setModalTitle(arg.event.title);
    //     setModalContent(arg.event.extendedProps.description);
    // };
    // const setting = {
    //     plugins: [
    //         dayGridPlugin,
    //         listPlugin,
    //         interactionPlugin,
    //         googleCalendarPlugin,
    //     ],
    //     //Main Key
    //     googleCalendarApiKey: "AIzaSyDKS2Z9aYCGH2TZ0GzCl406J15YrabaDKM",

    //     eventSources: [
    //         {
    //             googleCalendarId:
    //                 "31a7cjp8qn3pcst83gfb6t39do@group.calendar.google.com",
    //             className: styles.calEvents,
    //         },
    //     ],
    //     eventClick: handleDateClick,
    //     initialView: "dayGridMonth",
    //     headerToolbar: {
    //         left: "prev,next today",
    //         center: "title",
    //         right: "",
    //         // right: "dayGridMonth,listYear"
    //     },
    //     eventTimeFormat: {
    //         hour: "numeric",
    //         minute: "2-digit",
    //         meridiem: "short",
    //     },
    //     eventContent: renderEventContent,
    // };
    return (
        <>
            <Head>
                <title>Email</title>
            </Head>

            <div>{/* <FullCalendar {...setting} /> */}</div>
        </>
    );
}
