import { FC } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { TwoDimentionsDndNoContextProps } from "./types";
import { TwoDimentionsDndNoContext } from "./TwoDimentionsDndNoContext";

interface ParseItemResult {
    itemId: number;
    dndId?: number;
}

export const parseItemId = (str?: string): ParseItemResult => {
    if (!str) return { itemId: -1, dndId: undefined };

    // Regular expression to match either 'item-{i}', '{j}-item-{i}', or '{i}-item-{j}'
    const dualMatch = str.match(/(?:([0-9]+)-)?item-([0-9]+)/);
    if (!dualMatch) return { itemId: -1, dndId: undefined };

    const dndId =
        dualMatch[1] !== undefined ? parseInt(dualMatch[1], 10) : undefined;
    const itemId = parseInt(dualMatch[2], 10);

    return { itemId, dndId };
};

export const parseRowId = (str?: string) => {
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
