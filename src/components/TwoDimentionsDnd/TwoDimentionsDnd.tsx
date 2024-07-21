import { FC } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { TwoDimentionsDndNoContextProps } from "./types";
import TwoDimentionsDndNoContext from "./TwoDimentionsDndNoContext";

interface TwoDimentionsDndProps extends TwoDimentionsDndNoContextProps {
    onDragEnd: (results: DropResult) => void;
}

export const TwoDimentionsDnd: FC<TwoDimentionsDndProps> = ({
    columns = 1,
    gap = 3,
    onDragEnd,
    children,
}) => (
    <DragDropContext onDragEnd={onDragEnd}>
        <TwoDimentionsDndNoContext columns={columns} gap={gap}>
            {children}
        </TwoDimentionsDndNoContext>
    </DragDropContext>
);
