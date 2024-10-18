import { FC } from "react";
import { StackProps, SxProps, Theme, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { SpaceBetween } from "@/components/styled";
import Duration from "./Duration";

const ForceVisible: FC<StackProps> = (props) => (
    <SpaceBetween overflow="visible" {...props} />
);

const getTitleSx = (color: string): SxProps<Theme> => ({
    marginTop: (theme) => theme.spacing(1),
    padding: (theme) => theme.spacing(1),
    borderLeft: "4px solid",
    width: 1,
    backgroundColor: color[0] === "#" ? alpha(color, 0.3) : "transparent",
});

interface TitleProps {
    mini: boolean;
    title: string;
    color: string;
    startDate: string;
    endDate: string;
}

const Title: FC<TitleProps> = ({ title, mini, color, startDate, endDate }) => (
    <ForceVisible>
        <Typography variant="h6" noWrap sx={getTitleSx(color)}>
            {title}
        </Typography>

        {mini ? (
            <Duration
                start={startDate}
                end={endDate}
                position="absolute"
                top={-8}
                noWrap
                right="50%"
                sx={{
                    transform: "translateX(50%)",
                }}
            />
        ) : null}
    </ForceVisible>
);

export default Title;
