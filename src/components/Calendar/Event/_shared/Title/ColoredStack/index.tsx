import { FC } from "react";
import ForceVisible, { ForceVisibleProps } from "./ForceVisible";
import { TCalendarEventType } from "@/components/Calendar/types";
import getTypeColor from "../../getTypeColor";

interface ColoredStackProps extends ForceVisibleProps {
    type: TCalendarEventType;
}

const ColoredStack: FC<ColoredStackProps> = ({ type, ...props }) => {
    const borderColor = getTypeColor(type);
    return (
        <ForceVisible
            overflow="visible"
            borderLeft="4px solid"
            borderColor={borderColor}
            {...props}
        />
    );
};

export default ColoredStack;
