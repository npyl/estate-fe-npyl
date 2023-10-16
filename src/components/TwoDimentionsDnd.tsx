import { Box, Stack } from "@mui/material";
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
    gap?: number;
    onDragEnd: (results: DropResult) => void;
}

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

const chunks = (arr: TwoDimentionsDndItem[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    );

export const DroppableTypeItem = "ITEM";

export const TwoDimentionsDnd: FC<TwoDimentionsDndProps> = ({
    items,
    columns = 1,
    gap = 3,
    onDragEnd,
}) => {
    const rows = useMemo(() => chunks(items, columns), [items, columns]);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Stack direction={"column"} gap={gap}>
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
                                <Stack direction={"row"} gap={gap}>
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

                                    {/* Placeholder */}
                                    {Array.from(
                                        {
                                            length: columns - row.length,
                                        },
                                        (v, i) => (
                                            <Box
                                                key={i}
                                                width={"100%"}
                                                height={"100%"}
                                            />
                                        )
                                    )}
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
