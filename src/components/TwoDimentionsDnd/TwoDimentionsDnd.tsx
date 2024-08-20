import { FC } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { TwoDimentionsDndNoContextProps } from "./types";
import TwoDimentionsDndNoContext from "./TwoDimentionsDndNoContext";

interface TwoDimentionsDndProps
    extends Omit<TwoDimentionsDndNoContextProps, "onDragEnd"> {
    onDragEnd: (results: DropResult) => void;
    notCenter?: boolean;
}

export const TwoDimentionsDnd: FC<TwoDimentionsDndProps> = ({
    columns = 1,
    gap = 3,
    onDragEnd,
    children,
    notCenter,
}) => (
    <DragDropContext onDragEnd={onDragEnd}>
        <TwoDimentionsDndNoContext
            columns={columns}
            gap={gap}
            notCenter={notCenter}
        >
            {children}
        </TwoDimentionsDndNoContext>
    </DragDropContext>
);
