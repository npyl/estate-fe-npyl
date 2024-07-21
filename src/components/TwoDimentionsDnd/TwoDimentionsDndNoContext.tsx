import { Grid, Stack } from "@mui/material";
import { Children, isValidElement, ReactNode, useEffect, useMemo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { DroppableTypeItem, TwoDimentionsDndNoContextProps } from "./types";
import React from "react";

const chunks = (children: ReactNode, size: number): ReactNode[][] => {
    const childrenArray = Children.toArray(children);
    return Array.from(
        { length: Math.ceil(childrenArray.length / size) },
        (_, i) => childrenArray.slice(i * size, i * size + size)
    );
};

const getNodeId = (node: ReactNode): any => {
    // Check if the node is a valid React element
    if (!isValidElement(node)) return;

    const props = node.props as { id?: number | string };

    // Check if the id exists and is of the correct type
    if (
        props.id !== undefined &&
        (typeof props.id === "number" || typeof props.id === "string")
    ) {
        return props.id;
    }

    // Return null if the id wasn't found or wasn't of the correct type
    return null;
};

// Get draggable's Id
const getId = (dndId: number | undefined, item: ReactNode) =>
    dndId !== undefined
        ? `${dndId}-item-${getNodeId(item)}`
        : `item-${getNodeId(item)}`;

const TwoDimentionsDndNoContext = ({
    columns,
    gap,
    dndId,
    startIndex,
    preventDrag = false,
    children,
}: TwoDimentionsDndNoContextProps) => {
    const rows = useMemo(() => chunks(children, columns), [children, columns]);

    useEffect(() => {
        if (dndId !== undefined && dndId < 1)
            throw new Error(
                "TwoDimentionsDnd: dndIds must be greater than 1, and unique!"
            );

        if (dndId !== undefined && startIndex === undefined)
            throw new Error("TwoDimentionsDnd: you need to pass startIndex");
    }, []);

    return (
        <Stack gap={gap}>
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
                                            draggableId={getId(dndId, item)}
                                            key={getId(dndId, item)}
                                            index={
                                                startIndex !== undefined &&
                                                dndId !== undefined
                                                    ? startIndex + dndId * j
                                                    : j
                                            }
                                            isDragDisabled={preventDrag}
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

export default React.memo(TwoDimentionsDndNoContext);
