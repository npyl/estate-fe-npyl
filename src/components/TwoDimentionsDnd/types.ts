export interface TwoDimentionsDndItem {
    id: number;
    value: any;
}

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
export interface TwoDimentionsDndNoContextProps {
    items: TwoDimentionsDndItem[];
    columns: number;
    gap?: number;

    // Multiple Dnds
    dndId?: number;
    startIndex?: number;
}

export const DroppableTypeItem = "ITEM";
