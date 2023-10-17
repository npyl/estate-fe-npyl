export interface TwoDimentionsDndItem {
    id: number;
    value: any;
}

export interface TwoDimentionsDndNoContextProps {
    items: TwoDimentionsDndItem[];
    columns: number;
    gap?: number;
}

export const DroppableTypeItem = "ITEM";
