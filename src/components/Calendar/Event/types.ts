import { TCalendarEvent } from "../types";
import { DraggableStackProps } from "./DraggableStack";

interface EventProps extends Omit<DraggableStackProps, "ref" | "onClick"> {
    overlapCount?: number;
    onClick?: (e: TCalendarEvent) => void;
}

export type { EventProps };
