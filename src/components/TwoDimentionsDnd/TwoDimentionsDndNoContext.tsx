import { Grid, Stack } from "@mui/material";
import { useMemo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import {
    DroppableTypeItem,
    TwoDimentionsDndItem,
    TwoDimentionsDndNoContextProps,
} from "./types";

const chunks = (arr: TwoDimentionsDndItem[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    );

export const TwoDimentionsDndNoContext = ({
    items,
    columns,
    gap,
    dndId,
}: TwoDimentionsDndNoContextProps) => {
    const rows = useMemo(() => chunks(items, columns), [items, columns]);

    return (
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
                            <Grid container direction={"row"} spacing={gap}>
                                {row.map((item, j) => (
                                    <Grid
                                        item
                                        xs={12 / columns}
                                        key={`item-${item.id}`}
                                    >
                                        <Draggable
                                            draggableId={
                                                dndId !== undefined
                                                    ? `${dndId}-item-${item.id}`
                                                    : `item-${item.id}`
                                            }
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
                                    </Grid>
                                ))}
                            </Grid>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            ))}
        </Stack>
    );
};
