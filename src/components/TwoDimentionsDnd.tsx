import { Stack } from "@mui/material";
import { FC, useMemo } from "react";
import {
    DragDropContext,
    Draggable,
    DropResult,
    Droppable,
} from "react-beautiful-dnd";

interface TwoDimentionsDndProps {
    items: any[];
    columns: number;
    onDragEnd: (results: DropResult) => void;
}

const chunks = (arr: any[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    );

const DroppableTypeItem = "ITEM";

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
                                            draggableId={`r${i}-c${j}`}
                                            key={j}
                                            index={(i + 1) * (j + 1)} // ?
                                        >
                                            {(provided) => (
                                                <div
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                >
                                                    {item}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                </Stack>
                            </div>
                        )}
                    </Droppable>
                ))}
            </Stack>
        </DragDropContext>
    );
};
