import { GridProps, StackProps, SxProps, Theme } from "@mui/material";
import { ReactElement, RefObject } from "react";

interface ChildProps {
    id: number | string; // INFO: this is the id referred to as "someId" below
    [key: string]: any;
}

type TwoDimentionsDndNode = ReactElement<ChildProps> | null;

type TRowProps = Omit<GridProps, "children" | "gap" | "ref">;

/*
 *  dndId:  To be used when we have multiple dnds under the same DragDropContext.
 *          Dragging a draggable of one dnd, may drag one of all dnds if they have same id.
 *          If a dndId is provided, each draggable's id is set as follows: {dndId}-item-{someId}
 *          Otherwise, item-{someId} is used
 *
 *          If dndId is not undefined:
 *              droppableId (and key):      {dndId}-row-{i}
 *              draggableId (and key):      {dndId}-item-{someId}
 *              IMPORTANT: draggable index: {startIndex + j}             (startIndex is the index the next dnd starts from, j is the column index)
 *
 *          Otherwise:
 *              droppableId (and key):      row-{i}
 *              draggableId (and key):      item-{someId}
 *              draggable index:            {j}
 */
interface TwoDimentionsDndNoContextProps extends Omit<StackProps, "children"> {
    columns: number;
    gap?: number;

    // Multiple Dnds
    dndId?: number;
    startIndex?: number;

    preventDrag?: boolean;
    children: TwoDimentionsDndNode | TwoDimentionsDndNode[];

    rowProps?: TRowProps;
    rowRef?: RefObject<HTMLDivElement>;

    draggableSx?: SxProps<Theme>;
    draggableProps?: Omit<GridProps, "item" | "sx" | "columns">;
}

export const DroppableTypeItem = "ITEM";

export type { TwoDimentionsDndNoContextProps, TwoDimentionsDndNode, TRowProps };
