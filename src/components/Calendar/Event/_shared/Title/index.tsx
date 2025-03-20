import { FC } from "react";
import { SxProps, Theme, Typography } from "@mui/material";
import Duration from "../Duration";
import { TCalendarEventType } from "@/components/Calendar/types";
import ColoredStack from "./ColoredStack";

// --------------------------------------------------------

const TitleSx: SxProps<Theme> = {
    marginTop: (theme) => theme.spacing(1),
    px: 1,
    width: 1,
    minHeight: "45px",
    justifyContent: "center",
    overflowX: "hidden",
};

interface TitleProps {
    title: string;
    // ...
    startDate: string;
    endDate: string;
    // ...

    type: TCalendarEventType;
}

const Title: FC<TitleProps> = ({ title, type, startDate, endDate }) => (
    <ColoredStack type={type} sx={TitleSx}>
        <Typography variant="h6" noWrap>
            {title}
        </Typography>

        <Duration
            className="PPEvent-Duration"
            variant="body2"
            start={startDate}
            end={endDate}
            width={1}
            noWrap
            sx={{
                pl: 0,
            }}
        />
    </ColoredStack>
);

export default Title;
