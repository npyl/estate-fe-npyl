import { ComponentProps, forwardRef } from "react";
import { Box, Stack } from "@mui/material";
import Title from "../_shared/Title";
import Description from "../_shared/Description";
import dynamic from "next/dynamic";
import { useCalendarColorById } from "@/services/calendar";
import WithLabelUpdate from "./WithLabelUpdate";
import WithGhost from "./WithGhost";
import EventsTarget from "./EventsTarget";
const People = dynamic(() => import("../_shared/People"));
const FullLogic = WithGhost(WithLabelUpdate(EventsTarget));

type OmitList = "bgcolor";
type FullLogicProps = ComponentProps<typeof FullLogic>;

interface MainProps extends Omit<FullLogicProps, OmitList> {
    isMinimumHeight: boolean;
}

const Main = forwardRef<HTMLDivElement, MainProps>(
    ({ isMinimumHeight, ...props }, ref) => {
        const { event } = props;

        const bgcolor = useCalendarColorById(event?.colorId);

        return (
            <FullLogic ref={ref} bgcolor={bgcolor} {...props}>
                <Title
                    title={event.title}
                    startDate={event.startDate}
                    endDate={event.endDate}
                    type={event.type}
                />

                {!isMinimumHeight ? (
                    <>
                        <Description content={event.description} />

                        <Box flexGrow={1} />

                        {event.type !== "TASK" ? (
                            <Stack p={1}>
                                <People p={event.people} />
                            </Stack>
                        ) : null}
                    </>
                ) : null}
            </FullLogic>
        );
    }
);

export default Main;
