import { FC } from "react";
import { SxProps, Theme, Typography, TypographyProps } from "@mui/material";

const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
};

const DurationSx: SxProps<Theme> = {
    width: "fit-content",
    borderRadius: "15px",
    backgroundColor: (theme) =>
        theme.palette.mode === "light" ? "success.light" : "success.dark",
    color: (theme) => (theme.palette.mode === "light" ? "white" : "white"),
    paddingLeft: (theme) => theme.spacing(1),
    paddingRight: (theme) => theme.spacing(1),
};

interface DurationProps extends TypographyProps {
    start: string;
    end: string;
}

const Duration: FC<DurationProps> = ({ start, end, sx, ...props }) => {
    const startTime = formatTime(start);
    const endTime = formatTime(end);

    const text = `${startTime} - ${endTime}`;

    return (
        <Typography sx={{ ...DurationSx, ...sx }} {...props}>
            {text}
        </Typography>
    );
};

export default Duration;
