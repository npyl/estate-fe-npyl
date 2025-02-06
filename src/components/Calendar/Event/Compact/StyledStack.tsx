import { FC } from "react";
import Stack, { StackProps } from "@mui/material/Stack";
import { alpha, SxProps, Theme } from "@mui/material";
import getTypeColor from "../_shared/getTypeColor";
import { TCalendarEventType } from "../../types";
import { useCalendarColorById } from "@/services/calendar";

const getStackSx = (
    backgroundColor: string,
    borderColor: string
): SxProps<Theme> => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderRadius: "2px",

    borderLeft: "4px solid",
    borderColor,

    paddingLeft: (theme) => theme.spacing(0.5),
    paddingRight: (theme) => theme.spacing(0.5),

    marginLeft: (theme) => theme.spacing(0.5),
    marginRight: (theme) => theme.spacing(0.5),

    cursor: "pointer",

    backgroundColor: alpha(backgroundColor, 0.3),

    "&:hover": {
        boxShadow: (theme) => theme.shadows[10],
        backgroundColor,
    },
});

interface ColoredStackProps extends StackProps {
    type: TCalendarEventType;
    colorId: string;
}

const StyledStack: FC<ColoredStackProps> = ({ type, colorId, ...props }) => {
    const color = useCalendarColorById(colorId);
    const borderColor = getTypeColor(type);
    return <Stack sx={getStackSx(color, borderColor)} {...props} />;
};

export default StyledStack;
