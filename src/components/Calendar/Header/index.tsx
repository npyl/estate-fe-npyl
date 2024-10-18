import { BaseCalendarHeaderProps } from "@/components/BaseCalendar/types";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import dynamic from "next/dynamic";
import StyledBaseHeader from "./style";
import { renderValue } from "./util";
import { TODAY } from "@/components/BaseCalendar/constants";
import { Divider } from "@mui/material";
const TodayButton = dynamic(() => import("./TodayButton"));

const CalendarHeader: FC<BaseCalendarHeaderProps> = ({
    children,
    ...props
}) => {
    const value = renderValue(props.view, props.date);
    const isOtherDay = TODAY.toDateString() !== props.date.toDateString();

    return (
        <StyledBaseHeader {...props}>
            <Stack
                position="absolute"
                top="50%"
                left="50%"
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                    transform: "translate(-50%, -50%)",
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

                {isOtherDay ? (
                    <Stack direction="row">
                        <Divider
                            orientation="vertical"
                            sx={{ height: "inherit", mx: 1 }}
                        />

                        <TodayButton onClick={props.onDateChange} />
                    </Stack>
                ) : null}
            </Stack>
        </StyledBaseHeader>
    );
};

export default CalendarHeader;
