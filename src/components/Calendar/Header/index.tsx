import { BaseCalendarHeaderProps } from "@/components/BaseCalendar/types";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import dynamic from "next/dynamic";
import StyledBaseHeader from "./style";
import { renderValue } from "./util";
import { TODAY } from "@/components/BaseCalendar/constants";
import Divider from "@mui/material/Divider";
import HighlightTypography from "../HighlightTypography";
const TodayButton = dynamic(() => import("./TodayButton"));

const CalendarHeader: FC<BaseCalendarHeaderProps> = ({
    children,
    ...props
}) => {
    const value = renderValue(props.view, props.date);

    const isToday = TODAY.toDateString() === props.date.toDateString();

    const shouldHighlight = props.view === "day" && isToday;

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
                <HighlightTypography
                    highlight={shouldHighlight}
                    fontSize="2rem"
                    fontWeight="bold"
                    width="fit-content"
                    borderRadius="100%"
                    px={1}
                    py={0.1}
                >
                    {value.main}
                </HighlightTypography>

                <span style={{ fontSize: "1rem" }}>{value.sub}</span>

                {!isToday ? (
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
