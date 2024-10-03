import Stack from "@mui/material/Stack";
import { Children, ReactNode, useEffect, useMemo } from "react";
import { TwoDimentionsDndNoContextProps, TwoDimentionsDndNode } from "./types";
import React from "react";
import DroppableRow from "./DroppableRow";
import DraggableItem from "./DraggableItem";
import PlaceholderRow from "./PlaceholderRow";

const chunks = (children: ReactNode, size: number): ReactNode[][] => {
    const childrenArray = Children.toArray(children);
    return Array.from(
        { length: Math.ceil(childrenArray.length / size) },
        (_, i) => childrenArray.slice(i * size, i * size + size)
    );
};

const TwoDimentionsDndNoContext = ({
    columns,
    gap = 0.3,
    dndId,
    startIndex,
    preventDrag = true,
    draggableSx,
    children,
    ...props
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
        <Stack gap={gap} {...props}>
            {rows.length === 0 ? (
                <PlaceholderRow
                    dndId={dndId}
                    gap={gap}
                    startIndex={startIndex}
                    columns={columns}
                />
            ) : null}

            {rows.map((row, i) => (
                <DroppableRow
                    key={`${dndId}_${i}`}
                    dndId={dndId}
                    index={i}
                    gap={gap}
                >
                    {row.map((item, j) => (
                        <DraggableItem
                            key={`${dndId}_${i}_${j}`}
                            item={item as TwoDimentionsDndNode}
                            dndStartIndex={startIndex}
                            index={j}
                            dndId={dndId}
                            preventDrag={preventDrag}
                            columns={columns}
                            draggableSx={draggableSx}
                        />
                    ))}
                </DroppableRow>
            ))}
        </Stack>
    );
};

export default React.memo(TwoDimentionsDndNoContext);
