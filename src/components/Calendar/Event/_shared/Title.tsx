import { FC } from "react";
import { Stack, StackProps, SxProps, Theme, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Duration from "./Duration";

const ForceVisible: FC<StackProps> = (props) => (
    <Stack overflow="visible" {...props} />
);

const getTitleSx = (color: string): SxProps<Theme> => ({
    marginTop: (theme) => theme.spacing(1),
    px: 1,
    width: 1,
    backgroundColor: color[0] === "#" ? alpha(color, 0.3) : "transparent",
});

interface TitleProps {
    title: string;
    color: string;
    startDate: string;
    endDate: string;
}

const Title: FC<TitleProps> = ({ title, color, startDate, endDate }) => (
    <ForceVisible sx={getTitleSx(color)}>
        <Typography variant="h6" noWrap>
            {title}
        </Typography>

        <Duration
            className="PPEvent-Duration"
            variant="body2"
            start={startDate}
            end={endDate}
            width={1}
            sx={{
                pl: 0,
            }}
        />
    </ForceVisible>
);

export default Title;
