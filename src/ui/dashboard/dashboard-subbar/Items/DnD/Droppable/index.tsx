import { FC } from "react";
import { Droppable } from "@hello-pangea/dnd";
import DiscreetHorizontalScrollbar, {
    DiscreetHorizontalScrollbarProps,
} from "./DiscreteHorizontalScrollbar";

const DroppableContainer: FC<DiscreetHorizontalScrollbarProps> = ({
    children,
    ...props
}) => (
    <Droppable droppableId="subbar-tabs" direction="horizontal">
        {(provided) => (
            <DiscreetHorizontalScrollbar
                ref={provided.innerRef}
                spacing={0.5}
                flexWrap="nowrap"
                whiteSpace="nowrap"
                {...provided.droppableProps}
                {...props}
            >
                {children}
                {provided.placeholder}
            </DiscreetHorizontalScrollbar>
        )}
    </Droppable>
);

export default DroppableContainer;
