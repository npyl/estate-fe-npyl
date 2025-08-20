import { FC, MouseEvent, useCallback } from "react";
import { Box, SxProps, Theme, Tooltip } from "@mui/material";
import { TCalendarEvent, TCalendarEventType, TOnEventClick } from "../types";
import { Z_INDEX } from "@/constants/calendar";
import getTypeColor from "./_shared/getTypeColor";
import { LF } from "./constants";

// ------------------------------------------------------------------------------------

/**
 * convert mui theme's spacing()'s result to number (in pixels); supports the result being already in pixels, in rem (untested) or em (untested)
 *  It does this inside try-catch to prevent crashes for conditions we have not thought about
 * @param value value coming from mui theme's spacing() method
 * @returns the parsed value or 0
 */
const convertToPixels = (value: string | number): number => {
    try {
        if (typeof value === "number") return value;

        const numValue = parseFloat(value);
        if (isNaN(numValue)) return 0;

        if (value.endsWith("px")) return numValue; // take it as is...
        if (value.endsWith("rem")) return numValue * 16; // Assuming 1rem = 16px
        if (value.endsWith("em")) return numValue * 16; // Assuming 1em = 16px

        return numValue; // Default to number if no unit
    } catch (ex) {
        console.error(ex);
        return 0;
    }
};

const PADDING_FACTOR = 2;

const getBulletContainerSx = (c: number = 0, t: number = 0): SxProps<Theme> => {
    const zIndex = Z_INDEX.EVENT + c;

    const marginLeft = ({ spacing }: Theme) => {
        const spacingPx = convertToPixels(spacing(PADDING_FACTOR));
        return `${1 + c * LF - spacingPx}px`;
    };

    const top = ({ spacing }: Theme) => {
        const spacingPx = convertToPixels(spacing(PADDING_FACTOR));
        return `${t - spacingPx}px`;
    };

    return {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        position: "absolute",
        top,

        p: PADDING_FACTOR,

        marginLeft,
        zIndex,

        cursor: "pointer",
    };
};

// ------------------------------------------------------------------------------------

interface BulletProps {
    id: string;
    event: TCalendarEvent;
    title: string;
    type: TCalendarEventType;
    overlapCount?: number;
    top?: number;
    onEventClick?: TOnEventClick;
}

const Bullet: FC<BulletProps> = ({
    id,
    event,
    title,
    type,
    overlapCount,
    top,
    onEventClick,
}) => {
    const handleClick = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            onEventClick?.(e, event);
        },
        [onEventClick, event]
    );

    return (
        <Tooltip id={id} title={title} onClick={handleClick}>
            <Box sx={getBulletContainerSx(overlapCount, top)}>
                <Box
                    bgcolor={getTypeColor(type)}
                    width={15}
                    height={15}
                    borderRadius="100%"
                />
            </Box>
        </Tooltip>
    );
};

export default Bullet;
