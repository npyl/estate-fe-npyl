import { TOnEventClick } from "../types";
import { DraggableStackProps } from "./DraggableStack";

interface EventProps
    extends Omit<DraggableStackProps, "ref" | "onClick" | "overlapCount"> {
    overlapCount?: number;
    onClick?: TOnEventClick;
}

export type { EventProps };
