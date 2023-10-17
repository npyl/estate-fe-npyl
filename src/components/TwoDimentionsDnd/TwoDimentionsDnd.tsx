import { FC } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { TwoDimentionsDndNoContextProps } from "./types";
import { TwoDimentionsDndNoContext } from "./TwoDimentionsDndNoContext";

export const itemId = (str?: string) => {
    if (!str) return null;
    const match = str.match(/item-(\d+)/);
    return match ? parseInt(match[1], 10) : null;
};
export const rowId = (str?: string) => {
    if (!str) return null;
    const match = str.match(/row-(\d+)/);
    return match ? parseInt(match[1], 10) : null;
};

interface TwoDimentionsDndProps extends TwoDimentionsDndNoContextProps {
    onDragEnd: (results: DropResult) => void;
}

export const TwoDimentionsDnd: FC<TwoDimentionsDndProps> = ({
    items,
    columns = 1,
    gap = 3,
    onDragEnd,
}) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <TwoDimentionsDndNoContext
                items={items}
                columns={columns}
                gap={gap}
            />
        </DragDropContext>
    );
};
