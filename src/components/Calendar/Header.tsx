import BaseHeader from "@/components/BaseCalendar/Header";
import {
    BaseCalendarHeaderProps,
    TCalendarView,
} from "@/components/BaseCalendar/types";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { FC } from "react";

const StyledBaseHeader = styled(BaseHeader)(({ theme }) => ({
    position: "relative",
    padding: theme.spacing(1),
    zIndex: 4,
    backgroundColor: theme.palette.background.default,
}));

const renderValue = (
    view: TCalendarView,
    date: Date
): { main: string; sub: string } => {
    switch (view) {
        case "day":
            return {
                main: date.getDate().toString(),
                sub: date.toLocaleDateString("en-US", { weekday: "short" }),
            };
        case "week":
            const startOfWeek = new Date(date);
            startOfWeek.setDate(date.getDate() - date.getDay());
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);

            // If we are on the same month, show only that month
            if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
                return {
                    main: `${startOfWeek.toLocaleDateString("en-US", {
                        month: "short",
                    })}`,
                    sub: endOfWeek.getFullYear().toString(),
                };
            }

            // Otherwise show range in the form Oct - Nov
            return {
                main: `${startOfWeek.toLocaleDateString("en-US", {
                    month: "short",
                })} - ${endOfWeek.toLocaleDateString("en-US", {
                    month: "short",
                })}`,
                sub: endOfWeek.getFullYear().toString(),
            };
        case "month":
            return {
                main: date.toLocaleDateString("en-US", { month: "long" }),
                sub: date.getFullYear().toString(),
            };
        case "year":
            return {
                main: date.getFullYear().toString(),
                sub: "",
            };
    }
};

const CalendarHeader: FC<BaseCalendarHeaderProps> = ({
    children,
    ...props
}) => {
    const value = renderValue(props.view, props.date);

    return (
        <StyledBaseHeader {...props}>
            <Stack
                position="absolute"
                top="50%"
                left="50%"
                direction="row"
                alignItems="center"
                sx={{
                    transform: "translate(-50%, -50%)",
                    gap: "8px",
                }}
            >
                <span
                    style={{
                        fontSize: props.view === "day" ? "2.5rem" : "1.5rem",
                        fontWeight: "bold",
                    }}
                >
                    {value.main}
                </span>
                {value.sub && (
                    <span style={{ fontSize: "1rem" }}>{value.sub}</span>
                )}
            </Stack>
        </StyledBaseHeader>
    );
};

export default CalendarHeader;
