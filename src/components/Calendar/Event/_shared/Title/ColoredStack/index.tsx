import { FC } from "react";
import ForceVisible, { ForceVisibleProps } from "./ForceVisible";
import { TCalendarEventType } from "@/components/Calendar/types";
import { useCalendarColorById } from "@/services/calendar";
import { alpha } from "@mui/material/styles";
import getTypeColor from "../../getTypeColor";

interface ColoredStackProps extends ForceVisibleProps {
    colorId: string;
    type: TCalendarEventType;
}

const ColoredStack: FC<ColoredStackProps> = ({ colorId, type, ...props }) => {
    const color = useCalendarColorById(colorId);
    const bgcolor = alpha(color, 0.4);
    const borderColor = getTypeColor(type);
    return (
        <ForceVisible
            overflow="visible"
            bgcolor={bgcolor}
            borderLeft="4px solid"
            borderColor={borderColor}
            {...props}
        />
    );
};

export default ColoredStack;
