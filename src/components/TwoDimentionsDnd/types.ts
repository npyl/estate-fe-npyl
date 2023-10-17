export interface TwoDimentionsDndItem {
    id: number;
    value: any;
}

/*
 *  dndId:  To be used when we have multiple dnds under the same DragDropContext.
 *          Dragging a draggable of one dnd, may drag one of all dnds if they have same id.
 *          If a dndId is provided, each draggable's id is set as follows: {dndId}-item-{someId}
 *          Otherwise, item-{someId} is used
 */
export interface TwoDimentionsDndNoContextProps {
    items: TwoDimentionsDndItem[];
    columns: number;
    gap?: number;
    dndId?: number;
}

export const DroppableTypeItem = "ITEM";
