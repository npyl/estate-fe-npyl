import getBorderColor from "@/theme/borderColor";
import { SxProps, Theme, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import { BaseCalendarDayViewProps } from "../types";

const HeaderSx: SxProps<Theme> = {
    borderBottom: "1px solid",
    borderColor: (theme) => getBorderColor(theme),
    padding: (theme) => theme.spacing(1),
    textAlign: "center",
};

const DayView: FC<BaseCalendarDayViewProps> = ({ date }) => (
    <Stack>
        <Typography sx={HeaderSx}>{date.toDateString()}</Typography>
        <Stack p={1} height="200px">
            ...
        </Stack>
    </Stack>
);

export default DayView;
