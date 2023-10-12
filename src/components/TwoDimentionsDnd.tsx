import { Stack } from "@mui/material";
import { FC, useMemo } from "react";
import {
    DragDropContext,
    Draggable,
    DropResult,
    Droppable,
} from "react-beautiful-dnd";

export interface TwoDimentionsDndItem {
    id: number;
    value: any;
}

interface TwoDimentionsDndProps {
    items: TwoDimentionsDndItem[];
    columns: number;
    onDragEnd: (results: DropResult) => void;
}

const chunks = (arr: TwoDimentionsDndItem[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    );

export const DroppableTypeItem = "ITEM";

export const TwoDimentionsDnd: FC<TwoDimentionsDndProps> = ({
    items,
    columns = 1,
    onDragEnd,
}) => {
    const rows = useMemo(() => chunks(items, columns), [items, columns]);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Stack direction={"column"} gap={3}>
                {rows.map((row, i) => (
                    <Droppable
                        droppableId={`row-${i}`}
                        type={DroppableTypeItem}
                        key={i}
                        direction="horizontal"
                    >
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <Stack direction={"row"} gap={3}>
                                    {row.map((item, j) => (
                                        <Draggable
                                            draggableId={`item-${item.id}`}
                                            key={`item-${item.id}`}
                                            index={j}
                                        >
                                            {(provided) => (
                                                <div
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                >
                                                    {item.value}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                </Stack>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </Stack>
        </DragDropContext>
    );
};
