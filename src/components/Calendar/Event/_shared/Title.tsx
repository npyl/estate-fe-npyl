import { FC } from "react";
import { StackProps, SxProps, Theme, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { SpaceBetween } from "@/components/styled";

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
    title: string;
    color: string;
}

const Title: FC<TitleProps> = ({ title, color }) => (
    <ForceVisible>
        <Typography variant="h6" noWrap sx={getTitleSx(color)}>
            {title}
        </Typography>
    </ForceVisible>
);

export default Title;
