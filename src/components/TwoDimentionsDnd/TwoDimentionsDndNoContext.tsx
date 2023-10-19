import { Grid, Stack } from "@mui/material";
import { useEffect, useMemo } from "react";
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
    startIndex,
}: TwoDimentionsDndNoContextProps) => {
    const rows = useMemo(() => chunks(items, columns), [items, columns]);

    useEffect(() => {
        if (dndId !== undefined && dndId < 1)
            throw new Error(
                "TwoDimentionsDnd: dndIds must be greater than 1, and unique!"
            );

        if (dndId !== undefined && startIndex === undefined)
            throw new Error("TwoDimentionsDnd: you need to pass startIndex");
    }, []);

    return (
        <Stack direction={"column"} gap={gap}>
            {rows.map((row, i) => (
                <Droppable
                    droppableId={
                        dndId !== undefined ? `${dndId}-row-${i}` : `row-${i}`
                    }
                    type={DroppableTypeItem}
                    key={dndId !== undefined ? `${dndId}-row-${i}` : `row-${i}`}
                    direction="horizontal"
                >
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <Grid container direction={"row"} spacing={gap}>
                                {row.map((item, j) => (
                                    <Grid item xs={12 / columns} key={j}>
                                        <Draggable
                                            draggableId={
                                                dndId !== undefined
                                                    ? `${dndId}-item-${item.id}`
                                                    : `item-${item.id}`
                                            }
                                            key={
                                                dndId !== undefined
                                                    ? `${dndId}-item-${item.id}`
                                                    : `item-${item.id}`
                                            }
                                            index={
                                                startIndex !== undefined &&
                                                dndId !== undefined
                                                    ? startIndex + dndId * j
                                                    : j
                                            }
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
