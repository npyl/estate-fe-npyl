import { FC } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { TwoDimentionsDndNoContextProps } from "./types";
import TwoDimentionsDndNoContext from "./TwoDimentionsDndNoContext";

interface TwoDimentionsDndProps
    extends Omit<TwoDimentionsDndNoContextProps, "onDragEnd"> {
    onDragEnd: (results: DropResult) => void;
}

export const TwoDimentionsDnd: FC<TwoDimentionsDndProps> = ({
    columns = 1,
    gap = 3,
    onDragEnd,
    // ...
    rowRef,
    rowProps,
    draggableSx,
    draggableProps,
    // ...
    children,
    // ...
    ...props
}) => (
    <DragDropContext onDragEnd={onDragEnd}>
        <TwoDimentionsDndNoContext
            columns={columns}
            gap={gap}
            draggableSx={draggableSx}
            draggableProps={draggableProps}
            rowProps={rowProps}
            rowRef={rowRef}
            {...props}
        >
            {children}
        </TwoDimentionsDndNoContext>
    </DragDropContext>
);
