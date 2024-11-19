import { StackProps } from "@mui/material/Stack";
import { TCalendarEvent } from "../types";

interface EventProps extends Omit<StackProps, "ref" | "onClick"> {
    event: TCalendarEvent;
    overlapCount?: number;
    onClick?: (e: TCalendarEvent) => void;
}

export type { EventProps };
