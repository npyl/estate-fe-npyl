import { CalendarMouseEvent } from "../types";
import { DraggableStackProps } from "./DraggableStack";

interface EventProps
    extends Omit<DraggableStackProps, "ref" | "onClick" | "overlapCount"> {
    overlapCount?: number;
    onClick?: (e: CalendarMouseEvent) => void;
}

export type { EventProps };
