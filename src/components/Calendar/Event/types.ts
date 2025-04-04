import { TOnEventClick } from "../types";
import { ColoredContainerProps } from "./ColoredContainer";

interface EventProps
    extends Omit<
        ColoredContainerProps,
        "ref" | "bgcolor" | "onClick" | "overlapCount"
    > {
    overlapCount?: number;
    onClick?: TOnEventClick;
}

export type { EventProps };
