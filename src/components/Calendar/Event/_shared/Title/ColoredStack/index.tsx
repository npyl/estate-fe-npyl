import { FC, useMemo } from "react";
import ForceVisible, { ForceVisibleProps } from "./ForceVisible";
import { TCalendarEventType } from "@/components/Calendar/types";
import { useGetColorsQuery } from "@/services/calendar";
import { useAuth } from "@/hooks/use-auth";
import { alpha } from "@mui/material/styles";
import getTypeColor from "../../getTypeColor";
import { primary } from "@/theme/light-theme-options";

const useColorById = (colorId: string) => {
    const { user } = useAuth();
    const { data } = useGetColorsQuery(user?.id!);
    const bgcolor = useMemo(
        () => data?.find(({ id }) => id === colorId)?.color,
        [data, colorId]
    );
    return bgcolor || primary.main;
};

interface ColoredStackProps extends ForceVisibleProps {
    colorId: string;
    type: TCalendarEventType;
}

const ColoredStack: FC<ColoredStackProps> = ({ colorId, type, ...props }) => {
    const color = useColorById(colorId);
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
